import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
import Alert from "./Alert";

function ToolBar(props) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false)
  const dbName = localStorage.getItem("selectedDatabase");
  const token = localStorage.getItem("token");
  console.log(props.clientInfos);
  
  // * ajout d'un client
  const handleAjout = async () => {
    
    fetch(`${process.env.REACT_APP_API_URL}/api/${props.targetTable}/${dbName}/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.clientInfos)
    })
      .then(response => response.json())  // Parse the JSON response
      .then(data => {
        console.log(data.message);  // Accessing the success message
      })
      .catch((error) => {
        console.error('Error:', error.message);  // Logging the error message
      });

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/${props.targetTable}/${dbName}/List`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.setClientList(response.data.result);
      props.setShowAlert(true);
      props.setMessage("Client Ajouté Avec Succès")
      props.setOperationEffectue(true);
  }
  
  return (
    <nav className=" w-full h-[110px] border-b border-gray-700 flex items-center px-6 mt-6">
      <div className="flex space-x-4">
        <>
          <button
            type="button"
            onClick={() => handleAjout()}
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
          {/* Naviger vers le dashboard */}
          {/* <button
            type="button"
            className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-3xl" />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Quitter
            </span>
          </button> */}
        </>
      </div>
    </nav>
  );
}

export default ToolBar;
