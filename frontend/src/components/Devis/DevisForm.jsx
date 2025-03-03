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
import { useEffect } from "react";
import {
  getDevisParNUMBL,
  getListeNumbl,
  setDevisInfo,
  setDevisInfoEntiere,
  getListePointsVente,
  getLigneArticle
} from "../../app/devis_slices/devisSlice";
function DevisForm() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  // * tableau contenant la liste des codes des devis
  const listeNUMBL = useSelector((state) => state.DevisCrud.listeNUMBL);
  // * informations d'un devis provenant des champs de cette formulaire
  const devisInfos = useSelector((state) => state.DevisCrud.devisInfo);
  console.log(devisInfos);
  const listePointsVente = useSelector(
    (state) => state.DevisCrud.listePointsVente
  );
  // * UseEffect #1 : récupérer la liste des codes de devis et liste de points de vente
  useEffect(() => {
    dispatch(getListeNumbl());
    dispatch(getListePointsVente());
  }, []);
  // * WIP : sélectionne un dévis de la liste des devis
  // * pour afficher ses informations dans les champs
  // * du formulaire
  const handleSelectDevis = (e) => {
    if (e.target.value != "vide"){
      dispatch(getDevisParNUMBL(e.target.value));
      dispatch(getLigneArticle(devisInfos.NUMBL));
    }
    else
      // * vider les champs du formulaire
      dispatch(
        setDevisInfoEntiere({
          NUMBL: "",
          libpv: "",
          ADRCLI: "",
          CODECLI: "",
          cp: "",
          DATEBL: "",
          MREMISE: "",
          MTTC: "",
          comm: "",
          RSREP: "",
          CODEREP: "",
          usera: "",
          RSCLI: "",
          codesecteur: "",
          MHT: "",
          articles: [],
        })
      );
  };
  // * boolean pour activer/désactiver champs du formulaire
  // * initialement false (champs désactivé en mode de consultation)
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );
  const insertionDepuisDevisForm = useSelector(
    (state) => state.ClientCrud.insertionDepuisDevisForm
  );
  // * méthode pour indiquer qu'on veut ajouter un nouveau client
  // * à partir de cette formulaire, ceci est nécessaire pour qu'on puisse
  // * consérver tous données de devis saisies avant l'ajout du client
  const handleAjoutClientRedirect = () => {
    dispatch(setInsertionDepuisDevisForm(true));

    navi("/ClientList");
  };

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
          onChange={(e) => handleSelectDevis(e)}
        >
          {devisInfos.NUMBL == "" && 
          <option value={devisInfos.NUMBL}>Veuillez sélectionner un devis</option>
          }
          {devisInfos.NUMBL && 
          <option value={devisInfos.NUMBL}>{devisInfos.NUMBL}</option>
          }
          {listeNUMBL.map((codeDevis) => (
            <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
              {codeDevis.NUMBL}
            </option>
          ))}
        </select>

        <label className="block font-medium">Point de vente :</label>
        <select
          className="select select-bordered w-full max-w-xs"
          disabled={!activerChampsForm}
        >
          {listePointsVente.map((pointVente) => (
            <option key={pointVente.libpv} value={pointVente.libpv}>
              {pointVente.libpv}
            </option>
          ))}
        </select>
      </div>

      {/* Information Client */}
      <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <FaUser className="text-green-500" />
          <span>Information Client</span>
          <button
            className="btn btn-outline btn-accent"
            onClick={() => handleAjoutClientRedirect()}
          >
            {" "}
            <i className="fas fa-plus-circle"></i>
          </button>
        </h3>
        <label className="block font-medium">Code Client :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
          defaultValue={devisInfos.CODECLI} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "CODECLI", valeur: e.target.value })
          } // Mettez à jour l'état
        />

        <label className="block font-medium">Raison Sociale :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
          defaultValue={devisInfos.RSCLI} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "RSCLI", valeur: e.target.value })
          } // Mettez à jour l'état
        />

        <label className="block font-medium">Adresse :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
          defaultValue={devisInfos.ADRCLI} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "ADRCLI", valeur: e.target.value })
          } // Mettez à jour l'état
        />

        <label className="block font-medium">Code Postal :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
          defaultValue={devisInfos.cp} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "cp", valeur: e.target.value })
          } // Mettez à jour l'état
        />

        <label className="block font-medium">Email :</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
        />

        <label className="block font-medium">Téléphone :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
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
          disabled={!activerChampsForm}
          defaultValue={devisInfos.DATEBL} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "DATEBL", valeur: e.target.value })
          } // Mettez à jour l'état
        />
        <label className="block font-medium">Transport :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
        />

        <label className="block font-medium">À l'attention de :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
        />

        <label className="block font-medium">Délai de livraison :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
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
          disabled={!activerChampsForm}
          defaultValue={devisInfos.usera} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "usera", valeur: e.target.value })
          } // Mettez à jour l'état
        />

        <label className="block font-medium">RSREP :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
          defaultValue={devisInfos.RSREP} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "RSREP", valeur: e.target.value })
          } // Mettez à jour l'état
        />
        <label className="block font-medium">Code Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
          defaultValue={devisInfos.codesecteur} // Assurez-vous d'avoir cet état dans votre composant
          onChange={(e) =>
            setDevisInfo({ collone: "codesecteur", valeur: e.target.value })
          } // Mettez à jour l'état
        />

        <label className="block font-medium">Désignation Secteur :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
        />

        <label className="block font-medium mt-4">Commentaire :</label>
        <textarea
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2"
          defaultValue={devisInfos.comm}
          disabled={!activerChampsForm}
        ></textarea>

        <label className="block font-medium mt-4">Affaire :</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          disabled={!activerChampsForm}
        />
      </div>
    </>
  );
}

export default DevisForm;
