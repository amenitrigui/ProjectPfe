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
  faTrashAlt,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import {
  ajouterClient,
  getListeClient,
  majClient,
  setClientInfosEntiere,
} from "../../app/client_slices/clientSlice";
import {
  setAfficherAlertModal,
  setMessageAlertModal,
  setAlertMessage,
  setClearAppele,
  setActiverChampsForm,
  setActiverBoutonsValiderAnnuler,
} from "../../app/interface_slices/uiSlice";
import {
  AjouterDevis,
  setDevisInfoEntiere,
} from "../../app/devis_slices/devisSlice";

function ToolBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  // * state pour afficher/cacher fenetre de confirmation pour
  // * la suppression
  const [isDeleting, setIsDeleting] = useState(false);
  // * state pour controller quelle table on utilise
  // * puisque ce composant est partagé
  const toolbarTable = useSelector((state) => state.uiStates.toolbarTable);
  // * boolean pour afficher / cacher les bouton valider et supprimer
  const activerBoutonsValiderAnnuler = useSelector(
    (state) => state.uiStates.activerBoutonsValiderAnnuler
  );

  // * ajout d'un client/devi
  const handleAjout = async () => {
    dispatch(setActiverBoutonsValiderAnnuler(true));
    dispatch(setActiverChampsForm(true));
    // * vider les champs du formulaires
    if (toolbarTable == "devis") {
      console.log(devisInfo);
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
    }

    if (toolbarTable == "client") {
      dispatch(
        setClientInfosEntiere({
          code: "",
          rsoc: "",
          adresse: "",
          cp: "",
          email: "",
          telephone: "",
          desrep: "",
        })
      );
    }
  };
  const HandleRecherche = async () => {
    navigate("/recherche");
  };
  // * méthode pour mettre à jour un client/devis
  const handleupdate = async () => {
    dispatch(majClient());
    dispatch(getListeClient());
  };

  // * afficher la fenetre de confirmation
  // * pour supprimer un ou plusieurs clients/devis
  const afficherModel = async () => {
    dispatch(
      setMessageAlertModal("Etes vouz sur de suprimer ce(s) client(s)?")
    );
    dispatch(setAfficherAlertModal(true));
  };

  // * méthode pour valider l'ajout d'un client/devis
  const validerAjout = () => {
    if (toolbarTable == "client") {
      dispatch(ajouterClient());
      dispatch(getListeClient());
      dispatch(setAlertMessage("Ajouté avec succès"));
      dispatch(setClearAppele(true));
    }
    if (toolbarTable == "devis") {
      dispatch(AjouterDevis());
      dispatch(setActiverChampsForm(true));
    }
  };

  // * cacher les bouttons valider/annuler
  // * et réafficher les autres bouttons
  const annulerOperation = () => {
    dispatch(setActiverBoutonsValiderAnnuler(false));
    dispatch(setActiverChampsForm(false));
  };

  const handleNaviguerListe = () => {
    if(toolbarTable == "devis") {
      navigate("/DevisList");
    }

    if(toolbarTable == "client") {
      navigate("/clientList");
    }
  }
  return (
    <>
      <nav className="w-full h-[110px] border-b border-gray-700 flex items-center px-6 mb-4">
        <div className="flex space-x-4">
          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={handleAjout}
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
          )}
          {!activerBoutonsValiderAnnuler && (
            <>
              <div className="border-r border-gray-300 h-8"></div>
              <button
                type="button"
                className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
                onClick={() => handleupdate()}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-yellow-600 text-3xl"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Modifier
                </span>
              </button>
            </>
          )}
          {!activerBoutonsValiderAnnuler && (
            <>
              <div className="border-r border-gray-300 h-8"></div>

              <button
                type="button"
                onClick={afficherModel}
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
            </>
          )}

          {isDeleting && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
                <p className="text-xl font-semibold mb-4">
                  Voulez-vous vraiment supprimer ce devis ?
                </p>
                <div className="flex justify-around">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                    Oui
                  </button>
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

          {!activerBoutonsValiderAnnuler && (
            <>
              <div className="border-r border-gray-300 h-8"></div>

              <button
                className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
                onClick={() => navigate("/recherche")}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-blue-600 text-3xl"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Rechercher
                </span>
              </button>
            </>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100">
              <FontAwesomeIcon icon={faArrowLeft} className="text-3xl" />
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100">
              <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => handleNaviguerListe()}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faList} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Liste
              </span>
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => navigate("/Dashboard")}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Quitter
              </span>
            </button>
          )}

          {activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => validerAjout()}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faCheck} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Valider
              </span>
            </button>
          )}

          {activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => annulerOperation()}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faCancel} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Annuler
              </span>
            </button>
          )}
        </div>
        <nav className="w-full h-[250px] border-b border-gray-700 flex items-center px-1 mt-1">
          <div className="flex space-x-4">{/* Vos autres boutons ici */}</div>
        </nav>
      </nav>

      {toolbarTable == "devis" && (
        <h2 className="text-black font-bold italic text-3xl">
          Devis / Facture Proforma
        </h2>
      )}
      {toolbarTable == "client" && (
        <h2 className="text-black font-bold italic text-3xl">
          client
        </h2>
      )}
    </>
  );
}

export default ToolBar;
