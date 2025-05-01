import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  faTimes,
  faWrench,
  faBars,
  faMobileScreenButton,
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
  setOuvrireDrawerMenu,
  setOuvrireAvatarMenu,
} from "../../app/interface_slices/interfaceSlice";
import {
  getDerniereNumbl,
  getDevisParNUMBL,
  setDevisInfo,
  viderChampsDevisInfo,
} from "../../app/devis_slices/devisSlice";
import {
  deconnecterUtilisateur,
  getUtilisateurParCode,
} from "../../app/utilisateur_slices/utilisateurSlice";
import { viderChampsArticleInfo } from "../../app/article_slices/articleSlice";
import {
  getListeUtilisateurParCode,
  setUtilisateurSupInfo,
  setViderChampsUtilisateur,
} from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";
import { FaCog, FaRegUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { InboxStackIcon } from "@heroicons/react/20/solid";
import { viderChampsCPostalInfo } from "../../app/cpostal_slices/cpostalSlice";
import { viderChampsRegionInfo } from "../../app/region_slices/regionSlice";

function ToolBar() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  // * state pour controller quelle table on utilise
  // * puisque ce composant est partagé
  const toolbarTable = useSelector(
    (state) => state.interfaceSlice.toolbarTable
  );
  // * boolean pour afficher / cacher les bouton valider et supprimer
  const activerBoutonsValiderAnnuler = useSelector(
    (state) => state.interfaceSlice.activerBoutonsValiderAnnuler
  );
  const articleInfo = useSelector((state) => state.articleSlice.articleInfos);
  const Utilisateur_SuperviseurInfos = useSelector(
    (state) => state.utilisateurSystemSlice.Utilisateur_SuperviseurInfos
  );
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const dernierCodeClient = useSelector(
    (state) => state.clientSlice.dernierCodeClient
  );
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const ouvrireAvatarMenu = useSelector(
    (state) => state.interfaceSlice.ouvrireAvatarMenu
  );
  const isDashBoardRoute = useSelector(
    (state) => state.interfaceSlice.isDashBoardRoute
  );
  const menuRef = useRef();
  const buttonRef = useRef();
  const useClickOutside = (refs, callback) => {
    useEffect(() => {
      const handleClick = (e) => {
        // Vérifie si le clic est en dehors de tous les éléments référencés
        if (
          refs.every((ref) => ref.current && !ref.current.contains(e.target))
        ) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [refs, callback]);
  };
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
  const infosUtilisateur = useSelector(
    (state) => state.utilisateurSlice.infosUtilisateur
  );
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
      dispatch(
        setDevisInfo({ collone: "usera", valeur: utilisateurConnecte.codeuser })
      );
    }

    if (toolbarTable == "client") {
      dispatch(viderChampsClientInfo());
      dispatch(
        setClientInfos({
          colonne: "usera",
          valeur: utilisateurConnecte.codeuser,
        })
      );
      // * dispatch une action pour récuperer le code + nom d'utilisateur courant
      // dispatch(getUtilisateurParCode());
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
    if (toolbarTable == "devis") {
      dispatch(setAlertMessage("Êtes-vous sûr de vouloir modifier ce devis ?"));
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
  const handleAnnulerBtnClick = () => {
    if (toolbarTable === "devis") {
      dispatch(viderChampsDevisInfo());
      dispatch(getDerniereNumbl(utilisateurConnecte.codeuser));
      console.log("annuler btn clicked, derniere numbl recuperé");
    }
    if (toolbarTable === "client") {
      dispatch(viderChampsClientInfo());
    }
    if (toolbarTable === "article") {
      dispatch(viderChampsArticleInfo());
    }
    if (toolbarTable === "cpostal") {
      dispatch(viderChampsCPostalInfo());
    }
    if (toolbarTable === "region") {
      dispatch(viderChampsRegionInfo());
    }
    dispatch(setActiverBoutonsValiderAnnuler(false));
    dispatch(setActiverChampsForm(false));

    dispatch(setToolbarMode("consultation"));
  };

  const handleNaviguerVersPrecedent = () => {
    if (toolbarTable == "client") {
      const clientCode = parseInt(clientInfos.code) - 1;
      dispatch(getClientParCode(clientCode.toString()));
    }

    if (toolbarTable == "devis") {
      const Numerobl = devisInfo.NUMBL.substring(2, 9);

      const NumBLCode = "DV" + (parseInt(Numerobl) - 1);

      dispatch(getDevisParNUMBL(NumBLCode.toString()));
    }
    if (toolbarTable == "utilisateur") {
      let codeUser = parseInt(Utilisateur_SuperviseurInfos.codeuser) - 1;
      if (codeUser > 0) {
        if (codeUser < 10) {
          codeUser = "0" + codeUser;
        }
        dispatch(getListeUtilisateurParCode(codeUser.toString()));
      }
    }
  };
  const nav = useNavigate();
  const handleEditionClick = () => {
    nav("/ImprimerDevis");
  };
  const handleQuitterClick = () => {
    nav("/dashboard");
  };
  const handleNaviguerVersSuivant = () => {
    if (toolbarTable == "client") {
      const clientCode = parseInt(clientInfos.code) + 1;
      dispatch(getClientParCode(clientCode.toString()));
    }

    if (toolbarTable == "devis") {
      const Numerobl = devisInfo.NUMBL.substring(2, 9);

      const NumBLCode = "DV" + (parseInt(Numerobl) + 1);

      dispatch(getDevisParNUMBL(NumBLCode.toString()));
    }
    if (toolbarTable == "utilisateur") {
      let codeUser = parseInt(Utilisateur_SuperviseurInfos.codeuser) + 1;
      if (codeUser > 0) {
        if (codeUser < 10) {
          codeUser = "0" + codeUser;
        }
        dispatch(getListeUtilisateurParCode(codeUser.toString()));
      }
      //  dispatch(getCodeUtilisateurSuivant())
    }
  };
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };

  useClickOutside([menuRef, buttonRef], () => {
    dispatch(setOuvrireAvatarMenu(false));
  });

  const handleDeconnexionBtnClick = () => {
    dispatch(setOuvrireAvatarMenu(false));
    dispatch(deconnecterUtilisateur());
  };
  return (
    <>
      <nav className="w-full border-b border-gray-300 px-4 py-2 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Bouton Sidebar (always visible) */}
          <button
            type="button"
            className="flex flex-col items-center w-16 sm:w-20 p-2 mr-3 rounded-lg transition-all duration-200"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} className="text-xl mb-1" />
            <span className="text-[10px] sm:text-xs">Menu</span>
          </button>

          {!isDashBoardRoute && (
            <>
              {!activerBoutonsValiderAnnuler && (
                <>
                  {/* Bouton Nouveau */}
                  {(utilisateurConnecte?.type?.toLowerCase() ===
                    "superviseur" ||
                    (utilisateurConnecte?.type?.toLowerCase() ===
                      "utilisateur" &&
                      [
                        "client",
                        "devis",
                        "article",
                        "famille",
                        "sousfamille",
                      ].includes(toolbarTable?.toLowerCase()))) && (
                    <button
                      type="button"
                      onClick={handleAjoutBtnClick}
                      className="flex flex-col items-center w-16 sm:w-20 p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faFolderPlus}
                        className="text-xl mb-1"
                      />
                      <span className="text-[10px] sm:text-xs font-semibold">
                        Nouveau
                      </span>
                    </button>
                  )}

                  {/* Bouton Modifier */}
                  <button
                    type="button"
                    onClick={handleModifierBtnClick}
                    className="flex flex-col items-center w-16 sm:w-20 p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-xl mb-1" />
                    <span className="text-[10px] sm:text-xs font-semibold">
                      Modifier
                    </span>
                  </button>

                  {/* Bouton Supprimer */}
                  {(utilisateurConnecte?.type?.toLowerCase() ===
                    "superviseur" ||
                    (utilisateurConnecte?.type?.toLowerCase() ===
                      "utilisateur" &&
                      [
                        "client",
                        "devis",
                        "article",
                        "famille",
                        "sousfamille",
                      ].includes(toolbarTable?.toLowerCase()))) && (
                    <button
                      type="button"
                      onClick={handleSupprimerBtnClick}
                      className="flex flex-col items-center w-16 sm:w-20 p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="text-xl mb-1"
                      />
                      <span className="text-[10px] sm:text-xs font-semibold">
                        Supprimer
                      </span>
                    </button>
                  )}

                  {/* Liste */}
                  {(utilisateurConnecte?.type?.toLowerCase() ===
                    "superviseur" ||
                    (utilisateurConnecte?.type?.toLowerCase() ===
                      "utilisateur" &&
                      [
                        "client",
                        "devis",
                        "article",
                        "famille",
                        "sousfamille",
                      ].includes(toolbarTable?.toLowerCase()))) && (
                    <button
                      type="button"
                      onClick={handleNaviguerVersListe}
                      className="flex flex-col items-center w-16 sm:w-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-200"
                    >
                      <FontAwesomeIcon icon={faList} className="text-xl mb-1" />
                      <span className="text-[10px] sm:text-xs font-semibold">
                        Liste
                      </span>
                    </button>
                  )}

                  {/* Précédent */}
                  {(utilisateurConnecte?.type?.toLowerCase() ===
                    "superviseur" ||
                    (utilisateurConnecte?.type?.toLowerCase() ===
                      "utilisateur" &&
                      [
                        "client",
                        "devis",
                        "article",
                        "famille",
                        "sousfamille",
                      ].includes(toolbarTable?.toLowerCase()))) && (
                    <button
                      type="button"
                      onClick={handleNaviguerVersPrecedent}
                      className="flex flex-col items-center w-16 sm:w-20 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-xl mb-1"
                      />
                      <span className="text-[10px] sm:text-xs font-semibold">
                        Précédent
                      </span>
                    </button>
                  )}

                  {/* Suivant */}
                  {(utilisateurConnecte?.type?.toLowerCase() ===
                    "superviseur" ||
                    (utilisateurConnecte?.type?.toLowerCase() ===
                      "utilisateur" &&
                      [
                        "client",
                        "devis",
                        "article",
                        "famille",
                        "sousfamille",
                      ].includes(toolbarTable?.toLowerCase()))) && (
                    <button
                      type="button"
                      onClick={handleNaviguerVersSuivant}
                      className="flex flex-col items-center w-16 sm:w-20 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xl mb-1"
                      />
                      <span className="text-[10px] sm:text-xs font-semibold">
                        Suivant
                      </span>
                    </button>
                  )}

                  {/* Édition */}
                  {toolbarTable === "devis" && (
                    <button
                      type="button"
                      onClick={handleEditionClick}
                      className="flex flex-col items-center w-16 sm:w-20 p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-all duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faWrench}
                        className="text-xl mb-1"
                      />
                      <span className="text-[10px] sm:text-xs font-semibold">
                        Édition
                      </span>
                    </button>
                  )}

                  {/* Quitter */}
                  <button
                    onClick={handleQuitterClick}
                    className="flex flex-col items-center w-16 sm:w-20 p-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-all duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-xl mb-1"
                    />
                    <span className="text-[10px] sm:text-xs">Quitter</span>
                  </button>
                </>
              )}

              {/* Valider / Annuler */}
              {activerBoutonsValiderAnnuler && (
                <>
                  <button
                    type="button"
                    onClick={handleValiderBtnClick}
                    className="flex flex-col items-center w-16 sm:w-20 p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-xl mb-1" />
                    <span className="text-[10px] sm:text-xs font-semibold">
                      Valider
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleAnnulerBtnClick();
                    }}
                    className="flex flex-col items-center w-16 sm:w-20 p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xl mb-1" />
                    <span className="text-[10px] sm:text-xs font-semibold">
                      Annuler
                    </span>
                  </button>
                </>
              )}
            </>
          )}

          {/* Zone d'espace flexible */}
          <div className="flex-grow"></div>

          {/* Avatar utilisateur */}
          <div className="relative ml-auto">
            <div
              onClick={() => dispatch(setOuvrireAvatarMenu(!ouvrireAvatarMenu))}
              className="cursor-pointer"
              ref={buttonRef}
            >
              <FaRegUserCircle className="mr-3 text-3xl" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {ouvrireAvatarMenu && (
              <div
                className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50"
                ref={menuRef}
              >
                <div className="p-4 flex items-center border-b">
                  <FaRegUserCircle className="mr-3 text-3xl" />
                  <div>
                    <p className="font-semibold">{utilisateurConnecte.nom}</p>
                    <p className="text-sm text-gray-500">
                      {utilisateurConnecte.type}
                    </p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link
                      onClick={() => {
                        dispatch(setOuvrireAvatarMenu(false));
                        console.log(utilisateurConnecte);
                        dispatch(setUtilisateurSupInfo(utilisateurConnecte));
                      }}
                      to="/UtilisateurFormTout"
                      className="flex items-center"
                    >
                      <FaUser className="mr-3" /> Mon Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link
                      to="/Settings"
                      onClick={() => dispatch(setOuvrireAvatarMenu(false))}
                      className="flex items-center"
                    >
                      <FaCog className="mr-3" /> Paramètres
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-t">
                    <Link
                      to="/"
                      onClick={() => handleDeconnexionBtnClick()}
                      className="flex items-center"
                    >
                      <FaSignOutAlt className="mr-3" /> Déconnexion
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default ToolBar;
