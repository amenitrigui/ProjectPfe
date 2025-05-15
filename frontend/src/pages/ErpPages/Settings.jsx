import React, { useEffect } from "react";
import SideBar from "../../components/Common/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setIsParametresRoute,
  setOuvrireDrawerMenu,
  setTheme,
} from "../../app/interface_slices/interfaceSlice";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ToolBar from "../../components/Common/ToolBar";

function Settings() {
  const dispatch = useDispatch();
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const theme = useSelector((state) => state.interfaceSlice.theme);

  // Vérifier le thème stocké au chargement de la page
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsParametresRoute(true));

    return () => {
      dispatch(setIsParametresRoute(false));
    };
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
        <ToolBar />
        <div className="details">
          <div className="recentOrders flex flex-row flex-nowrap gap-4">
  <div className="flex-1">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Paramètres</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="select w-full">
          <span className="label block mb-2 text-gray-600">User</span>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option>Personal</option>
            <option>Business</option>
          </select>
        </label>

        <label className="select w-full">
          <span className="label block mb-2 text-gray-600">Fiche</span>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option>Personal</option>
            <option>Business</option>
          </select>
        </label>

        <div className="overflow-x-auto col-span-2">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Lecture</th>
                <th>Ajout</th>
                <th>Mise A jour</th>
                <th>Suppression</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>Delete</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>Delete</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <button className="btn btn-primary w-full" onClick={handleSave}>
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</div>

          <div className="recentOrders flex flex-row flex-nowrap gap-4">
            <div className="flex-1">
              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">
                  Paramètres
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Notifications par email
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked
                    />
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
