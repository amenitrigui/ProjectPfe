import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";

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
import { setOuvrireDrawerMenu } from "../../app/interface_slices/uiSlice";


const UtilisateurForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector((state) => state.uiStates.ouvrireMenuDrawer);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };
  useEffect(() => {
    dispatch(getListeCodesPosteaux());
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
    dispatch(getListeCodesSecteur());
    dispatch(getListeCodeRegions());
  }, []);

  useEffect((valeur) => {
    dispatch(getUtilisateurParCode(valeur));
  }, []);

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);

  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  const listeUtilisateur =useSelector((state)=>state.UtilisateurInfo.listeUtilisateur);
  const listeCodesRegion = useSelector(
    (state) => state.ClientCrud.listeCodesRegion
  );
  // state pour désactiver/activer les champs lors de changement de modes editables (ajout/modification)
  // vers le mode de consultation respectivement
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );

  // Sélection du booléen pour détecter si l'insertion est faite depuis le formulaire de devis
  const insertionDepuisDevisForm = useSelector(
    (state) => state.ClientCrud.insertionDepuisDevisForm
  );

  // liste de client
  const listeToutCodesClients = useSelector(
    (state) => state.ClientCrud.listeToutCodesClients
  );
  const listeToutCodesPosteaux = useSelector(
    (state) => state.ClientCrud.listeToutCodesPosteaux
  );
  const listeCodesSecteur = useSelector(
    (state) => state.ClientCrud.listeCodesSecteur
  );

  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
const handleCodeUtilisateur= (codeuser)=>
{
  dispatch(getUtilisateurParCode(codeuser))
}
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
              <img
                src="assets/imgs/customer01.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <img
                    src="assets/imgs/customer01.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaUser className="mr-3" /> My Profile
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaCog className="mr-3" /> Settings
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer relative">
                    <FaCreditCard className="mr-3" /> Billing
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      4
                    </span>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <FaSignOutAlt className="mr-3" /> Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="details">
          <div className="recentCustomers gap-y-0.5" style={{"width": "90vw"}}>
            <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(48, 60, 123)",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                className="text-3xl"
              >
                Fiche Utilisateur
              </h2>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Utilisateur
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  list="listeCodesUtilisateur"
                  value={infosUtilisateur.code || ""}
                  onChange={() => handleCodeUtilisateur()}
                  disabled={activerChampsForm}
                  maxLength={8}
                />
                  {/*<datalist id="listeCodesUtilisateur">
                  {listeUtilisateur.length > 0 ? (
                    listeUtilisateur.map((utilisateur, indice) => (
                      <option key={indice} value={utilisateur.code}>
                        {utilisateur.code}  
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun client trouvé</option>
                  )}
                </datalist>  */}
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Type Utilisateur
                </label>
                <select
                  className="border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                >
                  <option value={clientInfos.typecli || ""}>LOCAL</option>
                </select>
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Nom Utilisateur
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.cin || ""}
             //     onChange={(e) => handleCinChange(e, "cin")}
                  disabled={!activerChampsForm}
                  maxLength={8}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                className="font-bold mb-1"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Numéro vol
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={clientInfos.rsoc || ""}
                //onChange={(e) => handleChangeAlphaphetique(e, "rsoc")}
                disabled={!activerChampsForm}
              />
            </div>
            <div className="flex flex-col w-full mb-5">
              <label
                className="font-bold mb-1"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Email
              </label>
              <input
                type="email"
                className="border border-gray-300 rounded-md p-2"
                value={clientInfos.adresse || ""}
                //onChange={(e) => handleChangeAlphaNumerique(e, "adresse")}
                disabled={!activerChampsForm}
              />
            </div>
            <div className="flex flex-col w-full gap-0">
              <label
                className="font-bold mb-1"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Code Directeur
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={clientInfos.activite || ""}
               // onChange={(e) => handleChangeAlphaphetique(e, "activite")}
                disabled={!activerChampsForm}
              />
            </div>

            <div className="flex flex-col w-full gap-0">
              <label
                className="font-bold mb-1"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Nom Directeur
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={clientInfos.activite || ""}
            //    onChange={(e) => handleChangeAlphaphetique(e, "activite")}
                disabled={!activerChampsForm}
              />
            </div>
          </div>
        </div>
        {/* 2eme whada */}
        <div className="details">
          <div className="recentCustomers" style={{"width": "90vw"}}>
            <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-col w-full">
                {/* Ligne pour "Creation" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Creation
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    value={
                      clientInfos.usera ||
                      infosUtilisateur.codeuser + " // " + infosUtilisateur.nom
                    }
                //    onChange={(e) => handleChange(e, "usera")}
                    disabled
                  />
                </div>

                {/* Ligne pour "Modification" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Modification
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    value={clientInfos.userm || ""}
                 //   onChange={(e) => handleChange(e, "userm")}
                    disabled
                  />
                </div>

                {/* Ligne pour "Date Maj" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date Maj
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    value={clientInfos.datemaj || ""}
                  //  onChange={(e) => handleChange(e, "datemaj")}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="block font-bold text-center"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  commentaire
                </label>

                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  cols={33}
                  rows={7}
                  value={clientInfos.Commentaire || ""}
              //    onChange={(e) => handleChange(e, "Commentaire")}
                  disabled={!activerChampsForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
};

export default UtilisateurForm;
