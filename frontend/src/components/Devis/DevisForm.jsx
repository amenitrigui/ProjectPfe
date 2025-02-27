import React from "react";
import { FaFileInvoice, FaUser, FaClipboardList, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FiHome, FiLogOut, FiShoppingCart, FiUser, FiBox, FiSettings, FiTruck } from 'react-icons/fi';

function DevisForm() {
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
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          
        />

        <label className="block font-medium">Point de vente :</label>
        <input className="w-full border border-gray-300 rounded-md p-2" />
      </div>

      {/* Information Client */}
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaUser className="text-green-500" />
          <span>Information Client</span>
          <button className="btn btn-outline btn-accent" onClick={()=>window.location.href='/ClientList'}> <i className="fas fa-plus-circle"></i></button>
        </h3>
        <label className="block font-medium">Code Client :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
         
        />

        <label className="block font-medium">Raison Sociale :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          
        />

        <label className="block font-medium">Adresse :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Code Postal :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Email :</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Téléphone :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
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
        />

       

        <label className="block font-medium">Transport :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">À l'attention de :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Délai de livraison :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
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
        />

        <label className="block font-medium">RSREP :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Code Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium">Désignation Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium mt-4">Commentaire :</label>
        <textarea
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2"
        ></textarea>

        <label className="block font-medium mt-4">Affaire :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </>
  );
}

export default DevisForm;