import React from "react";
import {
  FaFileInvoice,
  FaUser,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setInsertionDepuisDevisForm } from "../../app/client_slices/clientSlice";
import { useNavigate } from "react-router-dom";

function DevisForm() {
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );
  const dispatch = useDispatch();
  const navi=useNavigate();
    const insertionDepuisDevisForm=useSelector((state)=>state.ClientCrud.insertionDepuisDevisForm)

  const handleAjoutClientRedirect=()=>
  {
    
    dispatch(setInsertionDepuisDevisForm(true));

    navi("/ClientList")
 
  }
  console.log(activerChampsForm);
  return (
    <>
    
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
    
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaFileInvoice className="text-blue-500" />
          <span>Identifiants Devis</span>
        </h3>
        <label className="block font-medium">N° Devis :</label>
        <select
          className="select select-bordered w-full max-w-xs"
          disabled={activerChampsForm}
        >
          <option>2456456</option>
        </select>

        <label className="block font-medium">Point de vente :</label>
        <select
          className="select select-bordered w-full max-w-xs"
          disabled={!activerChampsForm}
        >
          <option>SIEGE LOCAL</option>
          <option>SIEGE DISTANT</option>
        </select>
      </div>

      {/* Information Client */}
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaUser className="text-green-500" />
          <span>Information Client</span>
          <button
            className="btn btn-outline btn-accent"
            onClick={() => 
              handleAjoutClientRedirect()
            }
          >
            {" "}
            <i className="fas fa-plus-circle"></i>
          </button>
        </h3>
        <label className="block font-medium">Code Client :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Raison Sociale :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Adresse :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Code Postal :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Email :</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Téléphone :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />
      </div>

      {/* Détails Devis */}
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaClipboardList className="text-purple-500" />
          <span>Détails Devis</span>
        </h3>
        <label className="block font-medium">Date :</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Transport :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">À l'attention de :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Délai de livraison :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />
      </div>

      {/* Informations de l'Utilisateur */}
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaUsers className="text-red-500" />
          <span>Informations de l'Utilisateur</span>
        </h3>

        <label className="block font-medium">Vendeur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">RSREP :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Code Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium">Désignation Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />

        <label className="block font-medium mt-4">Commentaire :</label>
        <textarea
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        ></textarea>

        <label className="block font-medium mt-4">Affaire :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={!activerChampsForm}
        />
      </div>
    </>
  );
}

export default DevisForm;
