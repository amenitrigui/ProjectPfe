import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ToolBar from "../Common/ToolBar";
import {
  getDerniereCodeUtilisateur,
  getListeCodesUtilisateur,
  getUtilisateurParCode,
  setInfosUtilisateur,
  setInfosUtilisateurEntiere,
  uploadImageUtilisateur,
} from "../../app/utilisateur_slices/utilisateurSlice";
import SideBar from "../Common/SideBar";

import { setAfficherRecherchePopup } from "../../app/interface_slices/interfaceSlice";
import {
  setUtilisateur_SuperviseurInfos,
  setutilisateurConnecte,
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
  const derniereCodeUtilisateur = useSelector(
    (state) => state.utilisateurSlice.derniereCodeUtilisateur
  );
  const infosUtilisateur = useSelector(
    (state) => state.utilisateurSlice.infosUtilisateur
  );
  const infosUtilisateursup = useSelector(
    (state) => state.utilisateurSystemSlice.infosUtilisateursup
  );
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && infosUtilisateur.codeuser) {
      dispatch(
        uploadImageUtilisateur({
          codeuser: infosUtilisateur.codeuser,
          imageFile: file,
        })
      );
    }
  };
  // * state pour désactiver/activer les champs lors de changement de modes editables (ajout/modification)
  // * vers le mode de consultation respectivement
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );
  const listeCodesUtilisateur = useSelector(
    (state) => state.utilisateurSlice.listeCodesUtilisateur
  );
  // * pour initialiser les valeur d'objet infosUtilisateur
  useEffect(() => {
    dispatch(getListeCodesUtilisateur());
  }, []);
  useEffect(() => {
    if (utilisateurConnecte.type.toLowerCase() === "utilisateur") {
      dispatch(setInfosUtilisateurEntiere(utilisateurConnecte));
    }
    if (
      utilisateurConnecte.type.toLowerCase() === "superviseur" &&
      !infosUtilisateur.codeuser &&
      listeCodesUtilisateur.length > 0 &&
      toolbarMode != "ajout" &&
      toolbarMode != "modification"
    ) {
      dispatch(
        setInfosUtilisateur({
          colonne: "codeuser",
          valeur:
            listeCodesUtilisateur[listeCodesUtilisateur.length - 1].codeuser,
        })
      );
    }
  }, [
    utilisateurConnecte.type,
    infosUtilisateur.codeuser,
    listeCodesUtilisateur,
    toolbarMode,
  ]);
  useEffect(() => {
    // * le deuxième test, infosUtilisateur.codeuser === "" est pour éviter
    // * une cercle infini d'appèls de cet effet
    if (derniereCodeUtilisateur.codeuser && infosUtilisateur.codeuser === "") {
      dispatch(
        setInfosUtilisateur({
          colonne: "codeuser",
          valeur: derniereCodeUtilisateur.codeuser,
        })
      );
    }
  }, [derniereCodeUtilisateur.codeuser]);

  useEffect(() => {
    if (
      infosUtilisateur.codeuser &&
      infosUtilisateur.codeuser != "" &&
      toolbarMode != "ajout" &&
      toolbarMode != "modification"
    ) {
      dispatch(getUtilisateurParCode(infosUtilisateur.codeuser));
    }
  }, [infosUtilisateur.codeuser]);
  const handleCodeUtilisateur = (codeuser) => {
    dispatch(getUtilisateurParCode(codeuser));
  };

  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true));
  };
  const hundlechange = (colonne, valeur) => {
    dispatch(
      setUtilisateur_SuperviseurInfos({ colonne: colonne, valeur: valeur })
    );
    dispatch(setInfosUtilisateur({ colonne, valeur }));
  };
  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""} bg-base-100`}>
        <ToolBar />
        <div className="details">
          <div className="recentCustomers bg-base-100" style={{ width: "90vw" }}>
            <fieldset className="border border-gray-300 p-4 rounded-lg">
              <legend className="px-2 text-lg font-semibold text-blue-900">
                Fiche Utilisateur
              </legend>

              <div className="flex gap-4">
                {/* Colonne gauche - Champs existants */}
                <div className="flex-1">
                  <div className="flex flex-nowrap gap-4">
                    <div className="flex flex-col w-1/3">
                      <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                        Code Utilisateur
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        readOnly
                        value={
                          infosUtilisateur.codeuser
                            ? infosUtilisateur.codeuser
                            : ""
                        }
                        onChange={(e) =>
                          hundlechange("codeuser", e.target.value)
                        }
                        onClick={() => afficherRecherchePopup()}
                        disabled={
                          utilisateurConnecte.type.toLowerCase() !==
                          "superviseur"
                        }
                        maxLength={8}
                      />
                    </div>

                    <div className="flex flex-col w-2/3 ">
                      <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                        Nom Utilisateur
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        value={infosUtilisateur.nom ? infosUtilisateur.nom : ""}
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
                      value={
                        infosUtilisateur.email ? infosUtilisateur.email : ""
                      }
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
                      value={
                        infosUtilisateur.directeur
                          ? infosUtilisateur.directeur
                          : ""
                      }
                      onChange={(e) =>
                        hundlechange("directeur", e.target.value)
                      }
                      disabled={
                        !activerChampsForm ||
                        utilisateurConnecte.type.toLowerCase() === "utilisateur"
                      }
                    />
                  </div>

                  <div className="flex flex-col flex-nowrap">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      Type
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      value={infosUtilisateur.type ? infosUtilisateur.type : ""}
                      onChange={(e) => hundlechange("type", e.target.value)}
                      disabled={
                        !activerChampsForm ||
                        utilisateurConnecte.type.toLowerCase() === "utilisateur"
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      className="border border-gray-300 rounded-md p-2"
                      value={
                        infosUtilisateur.motpasse
                          ? infosUtilisateur.motpasse
                          : ""
                      }
                      onChange={(e) => hundlechange("motpasse", e.target.value)}
                      disabled={!activerChampsForm}
                    />
                  </div>
                  {/* <div className="flex flex-col">
                    <label className="font-bold mb-1 text-[rgb(48,60,123)]">
                      Image
                    </label>

                    {infosUtilisateur.image ? (
                      <img
                        src={utilisateurConnecte.image}
                        alt="Photo Profile"
                        className="border border-gray-300 rounded-md p-2 mb-2"
                        style={{ maxWidth: "150px" }} // Ajuste la taille de l'image si nécessaire
                      />
                    ) : (
                      <p>Aucune image disponible</p> // Si aucune image n'est disponible
                    )}
                    <input
                      type="file"
                      className="border border-gray-300 rounded-md p-2"
                      // disabled={!activerChampsForm}
                      onChange={handleImageUpload}
                      accept="image/*" // Pour n'accepter que les images
                    />
                  </div> */}
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
