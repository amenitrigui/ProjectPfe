import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencil,
  faPrint,
  faTrash,
  faSearch,
  faArrowLeft,
  faArrowRight,
  faList,
  faSignOutAlt,
  faTimes,
  faFolderPlus,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  ajouterClient,
  getListeClient,
  majClient
} from "../../app/client_slices/clientSlice";
import {
  setAfficherAlertModal,
  setMessageAlertModal,
  setAlertMessage,
  setClearAppele,
  setActiverChampsForm,
} from "../../app/interface_slices/uiSlice";
import { AjouterDevis } from "../../app/devis_slices/devisSlice";

function ToolBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const toolbarTable = useSelector((state) => state.uiStates.toolbarTable);

  // * ajout d'un client/devi
  const handleAjout = async () => {
      if(toolbarTable == "client") {
        dispatch(ajouterClient());
        dispatch(getListeClient());
        dispatch(setAlertMessage("Ajouté avec succès"));
        dispatch(setClearAppele(true));
      }
      if(toolbarTable == "devis") {
        console.log("ajouter un devis");
        dispatch(AjouterDevis());
        dispatch(setActiverChampsForm(true))
      }
  };

  // * méthode pour mettre à jour un client/devis
  const handleupdate = async () => {

    dispatch(majClient());
    dispatch(getListeClient());
  };

  // * afficher la fenetre de confirmation
  // * pour supprimer un ou plusieurs clients/devis
  const afficherModel = async () => {
    dispatch(setMessageAlertModal("Etes vouz sur de suprimer ce(s) client(s)?"));
    dispatch(setAfficherAlertModal(true));
  };

  const validerNouvMode = () => {
    console.log("Mode validé");
  };

  const annulerNouvMode = () => {
    console.log("Mode annulé");
  };

  return (
    <>
      <nav className="w-full h-[110px] border-b border-gray-700 flex items-center px-6 mt-6">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAjout}
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faFolderPlus} className="text-blue-600 text-3xl" />
            <span className="text-sm font-semibold text-gray-700">Nouveaux</span>
          </button>
          <div className="border-r border-gray-300 h-8"></div>

          <button
            type="button"
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
            onClick={() => handleupdate()}
          >
            <FontAwesomeIcon icon={faEdit} className="text-yellow-600 text-3xl" />
            <span className="text-sm font-semibold text-gray-700">Modifier</span>
          </button>
          <div className="border-r border-gray-300 h-8"></div>

          <button
            type="button"
            onClick={afficherModel}
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="text-red-600 text-3xl" />
            <span className="text-sm font-semibold text-gray-700">Supprimer</span>
          </button>

          {isDeleting && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
                <p className="text-xl font-semibold mb-4">
                  Voulez-vous vraiment supprimer ce devis ?
                </p>
                <div className="flex justify-around">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md">Oui</button>
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Non
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-r border-gray-300 h-8"></div>

          <button className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faSearch} className="text-blue-600 text-3xl" />
            <span className="text-sm font-semibold text-gray-700">Rechercher</span>
          </button>

          <button className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faArrowLeft} className="text-3xl" />
          </button>

          <button className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/DevisList")}
            className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faList} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Liste</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/Dashboard")}
            className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Quitter</span>
          </button>
        </div>
      </nav>

      <h2 className="text-black font-bold italic text-3xl">Devis / Facture Proforma</h2>
    </>
  );
}

export default ToolBar;
