import React, { useEffect } from "react";
import SideBar from "../../components/Common/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setOuvrireDrawerMenu, setTheme } from "../../app/interface_slices/interfaceSlice";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Settings() {
  const dispatch = useDispatch();
  const ouvrireMenuDrawer = useSelector((state) => state.interfaceSlice.ouvrireMenuDrawer);
  const theme = useSelector((state) => state.interfaceSlice.theme);

  // Vérifier le thème stocké au chargement de la page
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };

  // Sauvegarder les paramètres
  const handleSave = () => {
    localStorage.setItem("theme", theme);
    // Sauvegarder d'autres paramètres ici si nécessaire
    console.log("Paramètres sauvegardés !");
  };

  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <button
          type="button"
          className="flex flex-col items-center w-16 sm:w-20 p-2 mr-3 rounded-lg transition-all duration-200"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl mb-1" />
          <span className="text-[10px] sm:text-xs">Menu</span>
        </button>
        <div className="details">
          <div className="recentOrders flex flex-row flex-nowrap gap-4">
            <div className="flex-1">
              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Paramètres</h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Notifications par email</span>
                    </label>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Langue</span>
                    </label>
                    <select className="select select-bordered">
                      <option>Français</option>
                      <option>Anglais</option>
                      <option>Arabe</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Mode compact</span>
                    </label>
                    <input type="checkbox" className="toggle toggle-accent" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Thème sombre</span>
                  </label>
                  <input
                    type="checkbox"
                    className="toggle toggle-grey"
                    checked={theme === "dark"}
                    onChange={(e) =>
                      dispatch(setTheme(e.target.checked ? "dark" : "light"))
                    }
                  />
                </div>

                <div className="mt-8">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
