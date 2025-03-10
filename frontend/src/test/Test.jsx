import React from "react";
import Test1 from "./Test1";
import { useState } from "react";
import {
  FaFileInvoice,
  FaUser,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

function Test(props) {
  return (
    <div className="flex w-full">
      <div className="card bg-base-300 rounded-box grid h-auto p-4 w-1/4">
        <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <FaUser className="text-blue-500" />

            <span>Identifiants Devis</span>
          </h3>
          <label className="block font-medium">N° Devis :</label>
          <select
            className="select select-bordered w-full max-w-xs"
            // disabled={activerChampsForm}
            // onChange={(e) => handleSelectDevis(e)}
          >
            {/* {devisInfos.NUMBL == "" && (
                <option value={devisInfos.NUMBL}>
                  Veuillez sélectionner un devis
                </option>
              )}
              {devisInfos.NUMBL && (
                <option value={devisInfos.NUMBL}>{devisInfos.NUMBL}</option>
              )}
              {listeNUMBL.map((codeDevis) => (
                <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
                  {codeDevis.NUMBL}
                </option>
              ))} */}
          </select>

          <label className="block font-medium">Point de vente :</label>
          <select
            className="select select-bordered w-full max-w-xs"
            // disabled={!activerChampsForm}
          >
            {/* {listePointsVente.map((pointVente) => (
                <option key={pointVente.libpv} value={pointVente.libpv}>
                  {pointVente.libpv}
                </option>
              ))} */}
          </select>
        </div>
      </div>
      {/* <div className="divider divider-horizontal"></div> */}
      <div className="card bg-base-300 rounded-box grid h-auto p-4  w-1/4">
        <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <FaUser className="text-green-500" />
            <span>Information Client</span>
            <button
              className="btn btn-outline btn-accent"
              // onClick={() => handleAjoutClientRedirect()}
            >
              <i className="fas fa-plus-circle"></i>
            </button>
          </h3>
          <label className="block font-medium">Code Client :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
            // defaultValue={devisInfos.CODECLI} // Assurez-vous d'avoir cet état dans votre composant
            // onChange={(e) =>
            //   setDevisInfo({ collone: "CODECLI", valeur: e.target.value })
            // } // Mettez à jour l'état
          />

          <label className="block font-medium">Raison Sociale :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
            // defaultValue={devisInfos.RSCLI} // Assurez-vous d'avoir cet état dans votre composant
            // onChange={(e) =>
            //   setDevisInfo({ collone: "RSCLI", valeur: e.target.value })
            // } // Mettez à jour l'état
          />

          <label className="block font-medium">Adresse :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
            // defaultValue={devisInfos.ADRCLI} // Assurez-vous d'avoir cet état dans votre composant
            // onChange={(e) =>
            //   setDevisInfo({ collone: "ADRCLI", valeur: e.target.value })
            // } // Mettez à jour l'état
          />

          <label className="block font-medium">Code Postal :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
            // defaultValue={devisInfos.cp} // Assurez-vous d'avoir cet état dans votre composant
            // onChange={(e) =>
            //   setDevisInfo({ collone: "cp", valeur: e.target.value })
            // } // Mettez à jour l'état
          />

          <label className="block font-medium">Email :</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
          />

          <label className="block font-medium">Téléphone :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
          />
        </div>
      </div>
      {/* <div className="divider divider-horizontal"></div> */}
      <div className="card bg-base-300 rounded-box grid h-auto p-4  w-1/4">
        <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <FaClipboardList className="text-purple-500" />
            <span>Détails Devis</span>
          </h3>
          <label className="block font-medium">Date :</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
            // defaultValue={devisInfos.DATEBL} // Assurez-vous d'avoir cet état dans votre composant
            // onChange={(e) =>
            //   setDevisInfo({ collone: "DATEBL", valeur: e.target.value })
            // } // Mettez à jour l'état
          />
          <label className="block font-medium">Transport :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
          />

          <label className="block font-medium">À l'attention de :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
          />

          <label className="block font-medium">Délai de livraison :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            // disabled={!activerChampsForm}
          />
        </div>
      </div>
      {/* <div className="divider divider-horizontal"></div> */}
      <div className="card bg-base-300 rounded-box grid h-auto p-4  w-1/4">
        <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <FaUsers className="text-red-500" />
            <span>Informations de l'Utilisateur</span>
          </h3>

          <label className="block font-medium">Vendeur :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            //  disabled={!activerChampsForm}
            //  defaultValue={devisInfos.usera} // Assurez-vous d'avoir cet état dans votre composant
            //  onChange={(e) =>
            //    setDevisInfo({ collone: "usera", valeur: e.target.value })
            //  } // Mettez à jour l'état
          />

          <label className="block font-medium">RSREP :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            //  disabled={!activerChampsForm}
            //  defaultValue={devisInfos.RSREP} // Assurez-vous d'avoir cet état dans votre composant
            //  onChange={(e) =>
            //    setDevisInfo({ collone: "RSREP", valeur: e.target.value })
            //  } // Mettez à jour l'état
          />
          <label className="block font-medium">Code Secteur :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            //  disabled={!activerChampsForm}
            //  defaultValue={devisInfos.codesecteur} // Assurez-vous d'avoir cet état dans votre composant
            //  onChange={(e) =>
            //    setDevisInfo({ collone: "codesecteur", valeur: e.target.value })
            //  } // Mettez à jour l'état
          />

          <label className="block font-medium">Désignation Secteur :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            //  disabled={!activerChampsForm}
          />

          <label className="block font-medium mt-4">Commentaire :</label>
          <textarea
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2"
            // defaultValue={devisInfos.comm}
            //  disabled={!activerChampsForm}
          ></textarea>

          <label className="block font-medium mt-4">Affaire :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            //  disabled={!activerChampsForm}
          />
        </div>
      </div>
    </div>
  );
}

export default Test;
