import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaCreditCard,
  FaSignOutAlt,
  FaRegUserCircle,
} from "react-icons/fa";

import {
  getNombreTotalDevis,
  getTotalChiffres,
} from "../../app/devis_slices/devisSlice";

import {
  getListeCodesPosteaux,
  getListeCodesSecteur,
  getListeCodeRegions,
} from "../../app/client_slices/clientSlice";

import ToolBar from "../Common/ToolBar";
import { getUtilisateurParCode } from "../../app/utilisateur_slices/utilisateurSlice";
import SideBar from "../Common/SideBar";
import {  setAfficherRecherchePopup, setOuvrireDrawerMenu } from "../../app/interface_slices/interfaceSlice";
import {
  getDerniereCodeUtilisateur,
  setUtilisateur_SuperviseurInfos,
 
} from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";

const UtilisateurForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
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
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <ToolBar></ToolBar>

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <FaRegUserCircle className="mr-3 text-3xl" />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <FaRegUserCircle className="mr-3 text-3xl" />
                  <div>
                    <p className="font-semibold">{utilisateurConnecte.nom}</p>
                    <p className="text-sm text-gray-500">
                      {utilisateurConnecte.type}
                    </p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Link
                      to="/UtilisateurFormTout"
                      className="flex items-center w-full"
                    >
                      <FaUser className="mr-3" /> My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Link to="/Settings" className="flex items-center w-full">
                      <FaCog className="mr-3" /> Settings
                    </Link>
                  </li>

                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <Link to="/" className="flex items-center w-full">
                      <FaSignOutAlt className="mr-3" /> Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

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

                        disabled={activerChampsForm}
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

                {/* Colonne droite - Informations de création/modification */}
                {/* <div className="flex-1 max-w-[700px]">
                  <div className="card rounded-box p-4 space-y-6 bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <label className="font-medium w-1/3 text-left block text-[rgb(48,60,123)]">
                        Creation
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 flex-1"
                        value={
                          Utilisateur_SuperviseurInfos.codeuser +
                          " // " +
                          Utilisateur_SuperviseurInfos.nom
                        }
                        disabled
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="font-medium w-1/3 text-left block text-[rgb(48,60,123)]">
                        Modification
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 flex-1"
                        value={clientInfos.userm || ""}
                        disabled
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="font-medium w-1/3 text-left block text-[rgb(48,60,123)]">
                        Date Maj
                      </label>
                      <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2 flex-1"
                        value={clientInfos.datemaj || ""}
                        disabled
                      />
                    </div>
                  </div>
                </div> */}
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
