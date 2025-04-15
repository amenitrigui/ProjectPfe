import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowLeft,
  faArrowRight,
  faList,
  faSignOutAlt,
  faFolderPlus,
  faEdit,
  faTrashAlt,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import {
  getClientParCode,
  getDerniereCodeClient,
  setClientInfos,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import {
  setAlertMessage,
  setActiverChampsForm,
  setActiverBoutonsValiderAnnuler,
  setToolbarMode,
  setAfficherAlert,
} from "../../app/interface_slices/uiSlice";
import {
  getDerniereNumbl,
  viderChampsDevisInfo,
} from "../../app/devis_slices/devisSlice";
import { getUtilisateurParCode } from "../../app/utilisateur_slices/utilisateurSlice";
import { viderChampsArticleInfo } from "../../app/article_slices/articleSlice";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import {
  AjouterUtilisateur,
  getCodeUtilisateurSuivant,
  getDerniereCodeUtilisateur,
  getListeUtilisateur,
  getListeUtilisateurParCode,
  setViderChampsUtilisateur,
} from "../../app/Utilisateur_SuperviseurSlices/Utilisateur_SuperviseurSlices";
function ToolBar() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
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
  const articleInfo = useSelector((state) => state.ArticlesDevis.articleInfos);
  const Utilisateur_SuperviseurInfos = useSelector(
    (state) => state.Utilisateur_SuperviseurSlices.Utilisateur_SuperviseurInfos
  );
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const dernierCodeClient = useSelector(
    (state) => state.ClientCrud.dernierCodeClient
  );
  //?==================================================================================================================
  //?==================================================appels UseEffect================================================
  //?==================================================================================================================

  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const handleNaviguerVersListe = async () => {
    if (toolbarTable == "devis") {
      navigate("/DevisList");
    }
    if (toolbarTable == "client") {
      navigate("/ClientList");
    }
    if (toolbarTable == "article") {
      navigate("/ArticleList");
    }
    if (toolbarTable == "utilisateur") {
      navigate("/UtilisateurList");
    }
  };

  // * ajout d'un client/devi
  const handleAjoutBtnClick = async () => {
    dispatch(setActiverBoutonsValiderAnnuler(true));
    dispatch(setActiverChampsForm(true));
    dispatch(setToolbarMode("ajout"));

    // * vider les champs du formulaires
    if (toolbarTable == "devis") {
      dispatch(viderChampsDevisInfo());
      dispatch(viderChampsClientInfo());
      dispatch(getDerniereNumbl());
    }

    if (toolbarTable == "client") {
      dispatch(viderChampsClientInfo());
      dispatch(getDerniereCodeClient());
      dispatch(setClientInfos({ colonne: "code", valeur: dernierCodeClient }));
      // * dispatch une action pour récuperer le code + nom d'utilisateur courant
      dispatch(getUtilisateurParCode());
    }

    if (toolbarTable == "article") {
      dispatch(viderChampsArticleInfo());
    }
    if (toolbarTable == "utilisateur") {
      dispatch(setViderChampsUtilisateur());
    }
  };
  // * méthode pour mettre à jour un client/devis
  const handleModifierBtnClick = async () => {
    if (toolbarTable == "devis") {
      if (!devisInfo.NUMBL) {
        // ! a remplacer par toast
        alert("aucune devis est selectionné pour la modification");
      }
    }

    if (toolbarTable == "client") {
      if (!clientInfos.code) {
        // ! a remplacer par toast
        alert("aucun client est selectionné pour la modification");
      }
    }
    if (toolbarTable == "article") {
      if (!articleInfo.code) {
        alert("aucun article est selectionne pour la modification");
      }
    }

    if (
      (toolbarTable == "client" && clientInfos.code) ||
      (toolbarTable == "devis" && devisInfo.NUMBL) ||
      (toolbarTable == "article" && articleInfo.code) ||
      (toolbarTable == "utilisateur" && Utilisateur_SuperviseurInfos.codeuser)
    ) {
      dispatch(setToolbarMode("modification"));
      dispatch(setActiverBoutonsValiderAnnuler(true));
      dispatch(setActiverChampsForm(true));
    }
  };

  // * afficher la fenetre de confirmation
  // * pour supprimer un ou plusieurs clients/devis
  const handleSupprimerBtnClick = async () => {
    dispatch(setActiverChampsForm(false));
    dispatch(setToolbarMode("suppression"));
    dispatch(setAlertMessage("Êtes-vous sûr de vouloir supprimer ce client ?"));
    dispatch(setAfficherAlert(true));
  };

  // * méthode pour valider l'ajout d'un client/devis
  const handleValiderBtnClick = () => {
    if (toolbarTable == "client") {
      if (toolbarMode == "ajout") {
        dispatch(setAlertMessage("Confirmez-vous ajouter de ce client ?"));
      }

      if (toolbarMode == "modification") {
        dispatch(setAlertMessage("Confirmez-vous modifier de ce client ?"));
      }
    }

    //* pour devis
    if (toolbarTable == "devis") {
      if (toolbarMode == "ajout") {
        dispatch(setAlertMessage("Confirmez-vous l'ajout de ce devis ?"));
        dispatch(setAfficherAlert(true));
      }

      if (toolbarMode == "modification") {
        // dispatch(majDevis())
      }
    }
    //* pour l'article
    if (toolbarTable == "article") {
      if (toolbarMode == "ajout") {
        dispatch(setAlertMessage("Confirmez-vous ajouter de ce article ?"));
      }
      if (toolbarMode == "modification") {
        dispatch(setAlertMessage("confirmer vous de modifier de article?"));
      }
    }
    //*pour utilisateur
    if (toolbarTable == "utilisateur") {
      if (toolbarMode == "ajout") {
        dispatch(setAlertMessage("Confirmez-vous ajouter de ce utilisateur ?"));
      }
      if (toolbarMode == "modification") {
        dispatch(setAlertMessage("confirmer vous de modifier de utilisateur?"));
      }
    }

    dispatch(setAfficherAlert(true));
  };

  // * cacher les bouttons valider/annuler
  // * réafficher les autres bouttons
  // * vider toutes les champs
  const annulerOperation = () => {
    dispatch(setActiverBoutonsValiderAnnuler(false));
    dispatch(setActiverChampsForm(false));
    dispatch(viderChampsClientInfo());
    dispatch(viderChampsDevisInfo());
    dispatch(viderChampsArticleInfo());

    dispatch(setToolbarMode("consultation"));
  };

  const handleNaviguerListe = () => {
    if (toolbarTable == "devis") {
      navigate("/DevisList");
    }

    if (toolbarTable == "client") {
      navigate("/clientList");
    }
  };

  const handleNaviguerVersPrecedent = () => {
    if (toolbarTable == "client") {
      console.log(dernierCodeClient);
      const clientCode = parseInt(clientInfos.code) - 1;
      dispatch(getClientParCode(clientCode.toString()));
    }

    if (toolbarTable == "devis") {
    }
    if (toolbarTable == "utilisateur"){
      const codeUser = parseInt(Utilisateur_SuperviseurInfos.codeuser) - 1;
      console.log(codeUser)
      dispatch(getListeUtilisateurParCode(codeUser.toString()));
    }
  };

  const handleNaviguerVersSuivant = () => {
    console.log("ttt: ",toolbarTable);
    if (toolbarTable == "client") {
      const clientCode = parseInt(clientInfos.code) + 1;
      dispatch(getClientParCode(clientCode.toString()));
    }

    if (toolbarTable == "devis") {
    }
    if (toolbarTable == "utilisateur") {
      const codeUser = parseInt(Utilisateur_SuperviseurInfos.codeuser) + 1;
      console.log(codeUser);
      dispatch(getListeUtilisateurParCode(codeUser.toString()));
      //  dispatch(getCodeUtilisateurSuivant())
    }
  };
  return (
    <>
      <nav className="w-full h-[110px] sm:h-[80px] md:h-[90px] border-b border-gray-700 flex items-center px-6 sm:px-4 md:px-5 overflow-x-auto">
        <div className="flex space-x-4">
          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={handleAjoutBtnClick}
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
                onClick={() => handleModifierBtnClick()}
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
                onClick={() => handleSupprimerBtnClick()}
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

          {/* {!activerBoutonsValiderAnnuler && (
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
          )} */}
          {/* // ! btn précedent */}
          {!activerBoutonsValiderAnnuler && toolbarTable != "article" && (
            <button
              className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
              onClick={handleNaviguerVersPrecedent}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-3xl" />
            </button>
          )}
          {/* // ! btn suivant */}
          {!activerBoutonsValiderAnnuler && toolbarTable != "article" && (
            <button
              //disabled={dernierCodeClient == clientInfos.code}
              className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100"
              onClick={handleNaviguerVersSuivant}
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => handleNaviguerVersListe()}
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
              onClick={() => handleValiderBtnClick()}
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
      </nav>
    </>
  );
}

export default ToolBar;
