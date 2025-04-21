import React, { useState } from "react";
import SideBar from "../components/Common/SideBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBoxesStacked,
  faCheck,
  faEdit,
  faFolderPlus,
  faHamburger,
  faList,
  faSignOut,
  faStepBackward,
  faTimes,
  faTrashAlt,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
function Test1() {
  const elementsDrawer = [
    { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
    {
      name: "Gestion Clients",
      icon: "people-outline",
      path: "/ClientFormTout",
    },
    {
      name: "Gestion Articles",
      icon: "chatbubble-outline",
      path: "/ArticleFormTout",
    },
    {
      name: "Gestion Devis",
      icon: "lock-closed-outline",
      path: "/DevisFormTout",
    },
    {
      name: "Gestion Utilisateurs",
      icon: "help-outline",
      path: "/UtilisateurFormTout",
    },
    {
      name: "Liste de société",
      icon: "help-outline",
      path: "/SocietiesList",
    },
    { name: "Settings", icon: "settings-outline", path: "/Parametres" },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
  ];

  const [afficher, setAfficher] = useState(false);

  const toggleDrawer = () => {
    setAfficher(!afficher);
  };
  return (
    <>
      <nav className="w-full border-b border-gray-300 px-4 py-2 bg-white shadow-sm overflow-x-auto">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          
          <>
          {/* Nouveau */}
          <button
              type="button"
              className="flex flex-col items-center w-20 p-2 mr-20 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Menu</span>
            </button>
            {/* Nouveau */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faFolderPlus} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Nouveau</span>
            </button>
            {/* Modifier */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faEdit} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Modifier</span>
            </button>
            {/* Supprimer */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Supprimer</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faList} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Liste</span>
            </button>
            {/* Précédent */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Précédent</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Suivant</span>
            </button>
            {/* Edition */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faWrench} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Édition</span>
            </button>
            {/* Quitter */}
            <button className="flex flex-col items-center w-20 p-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-all duration-200">
              <FontAwesomeIcon icon={faSignOut} />
              <span>Quitter</span>
            </button>
          </>
          <>
            {/* Valider */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faCheck} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Valider</span>
            </button>

            {/* Annuler */}
            <button
              type="button"
              className="flex flex-col items-center w-20 p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl mb-1" />
              <span className="text-xs font-semibold">Annuler</span>
            </button>
          </>
        </div>
      </nav>
    </>
  );
}
export default Test1;
