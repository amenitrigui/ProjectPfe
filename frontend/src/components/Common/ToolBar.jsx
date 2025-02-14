import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ? icons
import {
  faFolderPlus,
  faEdit,
  faTrashAlt,
  faSearch,
  faArrowLeft,
  faArrowRight,
  faList,
  faSignOutAlt,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { PrinterIcon } from "@heroicons/react/20/solid";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ToolBar() {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false)
  return (
    <nav className=" w-full h-[110px] border-b border-gray-700 flex items-center px-6 mt-6">
      <div className="flex space-x-4">
        <>
          <button
            type="button"
            onClick={console.log("addLigne")}
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faFolderPlus}
              className="text-blue-600 text-3xl"
            />
            <span className="text-sm font-semibold text-gray-700">
              Nouveaux
            </span>
          </button>
          <div className="border-r border-gray-300 h-8"></div>

          <button
            type="button"
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
            onClick={console.log("handleeditligneDevis")}
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="text-yellow-600 text-3xl"
            />
            <span className="text-sm font-semibold text-gray-700">
              Modifier
            </span>
          </button>
          <div className="border-r border-gray-300 h-8"></div>
          <div>
            <button
              type="button"
              onClick={() => {setIsDeleting(true)}}
              className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="text-red-600 text-3xl"
              />
              <span className="text-sm font-semibold text-gray-700">
                Supprimer
              </span>
            </button>
            {/* Confirmer Suppression avec arrière plan flou */}
            {isDeleting && <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">               
              <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
                <p className="text-xl font-semibold mb-4">
                  Voulez-vous vraiment supprimer ce devis ?
                </p>
                <div className="flex justify-around">
                  <button
                    onClick={console.log(
                      "removedevis();setShowConfirmModal(false);"
                    )}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => {setIsDeleting(false)}}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Non
                  </button>
                </div>
              </div> 
            </div> }
          </div>
          <div className="border-r border-gray-300 h-8"></div>
          {/* Button Recherche */}
          <button
            onClick={console.log("handleSearchClick")}
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-blue-600 text-3xl"
            />
            <span className="text-sm font-semibold text-gray-700">
              Rechercher
            </span>
          </button>
          
          {/* Navigation, next Previous 
          <button
            type="button"
            className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
            onClick={console.log("handleDevisNavigation(-1)")}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-3xl" />
          </button>

          <button
            type="button"
            className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
            onClick={console.log("handleDevisNavigation")}
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
          </button> */}
          {/* Liste de Devis / clients */}
          {/* <button
            type="button"
            onClick={console.log("navigate to /DevisList")}
            className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faList} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Liste
            </span>
          </button> */}
          {/* Naviger vers le dashboard */}
          {/* <button
            type="button"
            onClick={console.log("navigate to dashboard")}
            className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Quitter
            </span>
          </button> */}
        </>
        <>
            {/*Annuler Mode Insertion */}
          {/* <button
            type="button"
            onClick={console.log("cancel")}
            className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Annuler
            </span>
          </button> */}
          <div className="border-r border-gray-300 h-8"></div>
          {/*Valider Mode Insertion */}
          {/* <button
            type="button"
            onClick={console.log("validateNewMode")}
            className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faCheck} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Valider
            </span>
          </button> */}
        </>
        <>
        {/*Annuler Mode Edition */}
          {/* <button
            type="button"
            onClick={console.log("cancelEditMode")}
            className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Annuler
            </span>
          </button> */}
          <div className="border-r border-gray-300 h-8"></div>
            {/*Valider Mode Edition */}
          {/* <button
            type="button"
            onClick={console.log("handleUpdateDevis")}
            className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faCheck} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Valider
            </span>
          </button> */}
        </>
      </div>
      <div className="flex justify-center space-x-8 flex-grow"></div>
      {/* Boutton d'impréssion */}
      <div className="ml-auto flex items-center space-x-4">
        <button
          type="submit"
          className="flex items-center text-white px-4 py-2 rounded-md border p-2 hover:bg-gray-100"
        >
          <PrinterIcon className="h-6 w-6 text-black mr-2" />
          <span className="text-black font-semibold">Édition</span>
        </button>
      </div>
    </nav>
  );
}

export default ToolBar;
