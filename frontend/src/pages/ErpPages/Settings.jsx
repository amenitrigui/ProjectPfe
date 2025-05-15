import React, { useEffect } from "react";
import SideBar from "../../components/Common/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setIsParametresRoute, setOuvrireDrawerMenu, setTheme } from "../../app/interface_slices/interfaceSlice";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ToolBar from "../../components/Common/ToolBar";

function Settings() {
  const dispatch = useDispatch();
  const ouvrireMenuDrawer = useSelector((state) => state.interfaceSlice.ouvrireMenuDrawer);
  const theme = useSelector((state) => state.interfaceSlice.theme);
  
  // * spécifier qu'on est dans le route de paramètres
  // * lors de la démontage de ce composant, l'etat est mise à false
  useEffect(() => {
    dispatch(setIsParametresRoute(true));
    
    return () => {
      dispatch(setIsParametresRoute(false));
    }
  },[dispatch])
  
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme",theme)
  },[theme])

  // Sauvegarder les paramètres
  const handleSave = () => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme)
    // Sauvegarder d'autres paramètres ici si nécessaire
    console.log("Paramètres sauvegardés !");
  };

  const modifierParametresAcces = () => {
    dispatch(modifierParametresAcces())
  }

  return (
    <div className="container ">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""} bg-base-100`}>
        <ToolBar />
        <div className="details">
          {/* paramètres visibles pour les superviseurs */}
          <div className="recentOrders flex flex-row flex-nowrap gap-4">
            <div className="flex-1 bg-base-100">
              <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
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
                    onChange={(e) =>{
                      dispatch(setTheme(e.target.checked ? "dark" : "light"))                      
                      }
                    }
                  />
                </div>

                <div className="mt-8">
                  <button className="btn btn-primary" onClick={modifierParametresAcces}>
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Paramètres visibles pour toutes les utilisteurs */}
          <div className="recentOrders flex flex-row flex-nowrap gap-4">
            <div className="flex-1 bg-base-100">
              <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
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
                    onChange={(e) =>{
                      dispatch(setTheme(e.target.checked ? "dark" : "light"))                      
                      }
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
