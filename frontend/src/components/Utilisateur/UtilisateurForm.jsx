import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ToolBar from "../Common/ToolBar";
import { getUtilisateurParCode } from "../../app/utilisateur_slices/utilisateurSlice";
import SideBar from "../Common/SideBar";
import {  setAfficherRecherchePopup } from "../../app/interface_slices/interfaceSlice";
import {
  getDerniereCodeUtilisateur,
  setUtilisateur_SuperviseurInfos,
 
} from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";

const UtilisateurForm = () => {
  const location = useLocation();
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const dispatch = useDispatch();
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const Utilisateur_SuperviseurInfos = useSelector(
    (state) => state.utilisateurSystemSlice.Utilisateur_SuperviseurInfos
  );
  const derniereCodeUtilisateur = useSelector(
    (state) => state.utilisateurSystemSlice.derniereCodeUtilisateur
  );
  const listeUtilisateur = useSelector(
    (state) => state.utilisateurSlice.listeUtilisateur
  );
  
  // state pour désactiver/activer les champs lors de changement de modes editables (ajout/modification)
  // vers le mode de consultation respectivement
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );


  useEffect(() => {
    dispatch(getDerniereCodeUtilisateur());

  
  }, []);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const handleCodeUtilisateur = (codeuser) => {
    dispatch(getUtilisateurParCode(codeuser));
  };
 
  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true))
  }
  const hundlechange = (colonne, valeur) => {
    dispatch(
      setUtilisateur_SuperviseurInfos({ colonne: colonne, valeur: valeur })
    );
  };
  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>

        <ToolBar />
        <div className="details">
          <div className="recentCustomers" style={{ width: "90vw" }}>
            <fieldset className="border border-gray-300 p-4 rounded-lg">
              <legend className="px-2 text-lg font-semibold text-blue-900">
                Fiche Utilisateur
              </legend>

              <div className="flex gap-4">
                {/* Colonne gauche - Champs existants */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col w-1/3">
                      <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                        Code Utilisateur
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        value={
                          toolbarMode == "ajout"
                            ? derniereCodeUtilisateur.codeuser
                            : Utilisateur_SuperviseurInfos.codeuser
                        }
                        onChange={(e) =>
                          hundlechange("codeuser", e.target.value)
                        }
                        onClick = {() => afficherRecherchePopup()}

                        disabled={utilisateurConnecte.type.toLowerCase() !== "superviseur"}
                        maxLength={8}
                      />
                    </div>

                    <div className="flex flex-col w-1/2 ">
                      <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                        Nom Utilisateur
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        value={Utilisateur_SuperviseurInfos.nom || ""}
                        onChange={(e) => hundlechange("nom", e.target.value)}
                        disabled={!activerChampsForm}
                        maxLength={8}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border border-gray-300 rounded-md p-2"
                      value={Utilisateur_SuperviseurInfos.email || ""}
                      onChange={(e) => hundlechange("email", e.target.value)}
                      disabled={!activerChampsForm}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      Code Directeur
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      value={Utilisateur_SuperviseurInfos.directeur || ""}
                      onChange={(e) =>
                        hundlechange("directeur", e.target.value)
                      }
                      disabled={!activerChampsForm}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      Nom Directeur
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      value={Utilisateur_SuperviseurInfos.type || ""}
                      onChange={(e) => hundlechange("type", e.target.value)}
                      disabled={!activerChampsForm}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      MotPasse
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      value={Utilisateur_SuperviseurInfos.motpasse || ""}
                      onChange={(e) => hundlechange("motpasse", e.target.value)}
                      disabled={!activerChampsForm}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
};

export default UtilisateurForm;
