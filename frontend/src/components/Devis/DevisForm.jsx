import React from "react";
import { FaFileInvoice, FaUser, FaClipboardList, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

function DevisForm() {
  const activerChampsForm = useSelector((state) => state.uiStates.activerChampsForm);
  console.log(activerChampsForm);
  return (
    <>
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaFileInvoice className="text-blue-500" />
          <span>Identifiants Devis</span>
        </h3>
        <label className="block font-medium">N° Devis :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Point de vente :</label>
        <input className="w-full border border-gray-300 rounded-md p-2" readOnly={true}/>
      </div>

      {/* Information Client */}
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaUser className="text-green-500" />
          <span>Information Client</span>
        </h3>
        <label className="block font-medium">Code Client :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Raison Sociale :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Adresse :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Code Postal :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Email :</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Téléphone :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
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
          readOnly={true}
        />

        <label className="block font-medium">Pièce Liée :</label>
        <input
          type="file"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Transport :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">À l'attention de :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Délai de livraison :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
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
          readOnly={true}
        />

        <label className="block font-medium">RSREP :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Code Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium">Désignation Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />

        <label className="block font-medium mt-4">Commentaire :</label>
        <textarea
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        ></textarea>

        <label className="block font-medium mt-4">Affaire :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          readOnly={true}
        />
      </div>
    </>
  );
}

export default DevisForm;