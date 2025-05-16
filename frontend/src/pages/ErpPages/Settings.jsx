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
import { getListeCodesUtilisateur } from "../../app/utilisateur_slices/utilisateurSlice";
import {
  getModuleParamettreParUtilisateur,
  setParametresAcceesUtilisateur,
  modifierModuleParamettreParUtilisateur,
} from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";
import { useState } from "react";

function Settings() {
  const dispatch = useDispatch();
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const theme = useSelector((state) => state.interfaceSlice.theme);

  // * spécifier qu'on est dans le route de paramètres
  // * lors de la démontage de ce composant, l'etat est mise à false
  useEffect(() => {
    dispatch(setIsParametresRoute(true));

    return () => {
      dispatch(setIsParametresRoute(false));
    };
  }, [dispatch]);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Sauvegarder les paramètres
  const handleSave = () => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
    // Sauvegarder d'autres paramètres ici si nécessaire
    console.log("Paramètres sauvegardés !");
  };
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const listeCodesUtilisateur = useSelector(
    (state) => state.utilisateurSlice.listeCodesUtilisateur
  );
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [module, setModule] = useState("");

  useEffect(() => {
    console.log(codeUtilisateur);
    console.log(module);
    if (codeUtilisateur != "" && module != "") {
      dispatch(
        getModuleParamettreParUtilisateur({
          codeuser: codeUtilisateur,
          modulepr: "Fichier de base",
          module: module,
        })
      );
    }
  }, [codeUtilisateur, module]);

  useEffect(() => {
    if (utilisateurConnecte.type.toLowerCase() == "superviseur") {
      dispatch(getListeCodesUtilisateur());
    }
  }, []);

  useEffect(() => {
    if (listeCodesUtilisateur.length > 0) {
      setCodeUtilisateur(listeCodesUtilisateur[0].codeuser);
      setModule("article");
    }
  }, [listeCodesUtilisateur]);

  const paramettresAccesUtilisateur = useSelector(
    (state) => state.utilisateurSystemSlice.paramettresAccesUtilisateur
  );
  const modifierParametresAcces = () => {
    dispatch(
      modifierModuleParamettreParUtilisateur({
        codeuser: codeUtilisateur,
        modulepr: "Fichier de base",
        module,
        paramettreModifier: paramettresAccesUtilisateur,
      })
    );
  };

  return (
    <div className="container ">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""} bg-base-100`}>
        <ToolBar />
        <div className="details">
          {/* paramètres visibles pour les superviseurs */}
          {utilisateurConnecte.type.toLowerCase() == "superviseur" && (
            <div className="recentOrders flex flex-row flex-nowrap gap-4">
              <div className="flex-1 bg-base-100">
                <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-700">
                    Paramètres
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="select w-full">
                      <span className="label block mb-2 text-gray-600">
                        User
                      </span>
                      <select
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={(e) => {
                          setCodeUtilisateur(e.target.value);
                        }}
                        value={codeUtilisateur}
                      >
                        {listeCodesUtilisateur &&
                        listeCodesUtilisateur.length > 0
                          ? listeCodesUtilisateur.map(
                              (codeutilisateur, indice) => {
                                return (
                                  <option key={indice}>
                                    {codeutilisateur.codeuser}
                                  </option>
                                );
                              }
                            )
                          : ""}
                      </select>
                    </label>

                    <label className="select w-full">
                      <span className="label block mb-2 text-gray-600">
                        Fiche
                      </span>
                      <select
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={(e) => {
                          setModule(e.target.value);
                        }}
                        value={module}
                      >
                        <option>article</option>
                        <option>clients</option>
                        <option>utilisateur</option>
                      </select>
                    </label>

                    <div className="overflow-x-auto col-span-2">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>Accès</th>
                            <th>Ecriture</th>
                            <th>Ajout</th>
                            <th>Mise A jour</th>
                            <th>Suppression</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 w-1/2"
                                value={
                                  paramettresAccesUtilisateur.accee
                                    ? paramettresAccesUtilisateur.accee
                                    : ""
                                }
                                onChange={(e) => {
                                  dispatch(
                                    setParametresAcceesUtilisateur({
                                      colonne: "accee",
                                      valeur: "",
                                    })
                                  );
                                  if (
                                    e.target.value == "1" ||
                                    e.target.value == "0"
                                  ) {
                                    dispatch(
                                      setParametresAcceesUtilisateur({
                                        colonne: "accee",
                                        valeur: e.target.value,
                                      })
                                    );
                                  }
                                }}
                                minLength={1}
                                maxLength={1}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 w-1/2"
                                value={
                                  paramettresAccesUtilisateur.ecriture
                                    ? paramettresAccesUtilisateur.ecriture
                                    : ""
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value == "1" ||
                                    e.target.value == "0"
                                  ) {
                                    dispatch(
                                      setParametresAcceesUtilisateur({
                                        colonne: "ecriture",
                                        valeur: e.target.value,
                                      })
                                    );
                                  }
                                }}
                                minLength={1}
                                maxLength={1}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md w-1/2 p-2"
                                value={
                                  paramettresAccesUtilisateur.ajouter
                                    ? paramettresAccesUtilisateur.ajouter
                                    : ""
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value == "1" ||
                                    e.target.value == "0"
                                  ) {
                                    dispatch(
                                      setParametresAcceesUtilisateur({
                                        colonne: "ajouter",
                                        valeur: e.target.value,
                                      })
                                    );
                                  }
                                }}
                                minLength={1}
                                maxLength={1}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md w-1/2 p-2"
                                value={
                                  paramettresAccesUtilisateur.modifier
                                    ? paramettresAccesUtilisateur.modifier
                                    : ""
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value == "1" ||
                                    e.target.value == "0"
                                  ) {
                                    {
                                      dispatch(
                                        setParametresAcceesUtilisateur({
                                          colonne: "modifier",
                                          valeur: e.target.value,
                                        })
                                      );
                                    }
                                  }
                                }}
                                minLength={1}
                                maxLength={1}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md w-1/2 p-2"
                                value={
                                  paramettresAccesUtilisateur.supprimer
                                    ? paramettresAccesUtilisateur.supprimer
                                    : ""
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value == "1" ||
                                    e.target.value == "0"
                                  ) {
                                    dispatch(
                                      setParametresAcceesUtilisateur({
                                        colonne: "supprimer",
                                        valeur: e.target.value,
                                      })
                                    );
                                  }
                                }}
                                minLength={1}
                                maxLength={1}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => {
                        modifierParametresAcces();
                      }}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="recentOrders flex flex-row flex-nowrap gap-4">
            <div className="flex-1 bg-base-100">
              <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
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
                    onChange={(e) => {
                      dispatch(setTheme(e.target.checked ? "dark" : "light"));
                    }}
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
