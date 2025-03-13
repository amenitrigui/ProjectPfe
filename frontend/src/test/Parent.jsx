import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";

import { setDevisInfo } from "../app/devis_slices/devisSlice";
import { setClientInfos } from "../app/client_slices/clientSlice";

import ToolBar from "../components/Common/ToolBar";

import { FaFileInvoice, FaClipboardList, FaUsers } from "react-icons/fa";
const Parent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // Fonction pour basculer la visibilité de la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const dispatch = useDispatch();

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  console.log(clientInfos);

  // const infosUtilisateur = useSelector(
  //   (state) => state.UtilisateurInfo.infosUtilisateur
  // );

  // state pour désactiver/activer les champs lors de changement de modes editables (ajout/modification)
  // vers le mode de consultation respectivement
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );

  // Sélection du booléen pour détecter si l'insertion est faite depuis le formulaire de devis
  const insertionDepuisDevisForm = useSelector(
    (state) => state.ClientCrud.insertionDepuisDevisForm
  );

  // liste de client
  const listeToutCodesClients = useSelector(
    (state) => state.ClientCrud.listeToutCodesClients
  );

  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  console.log(toolbarMode);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e, colonne) => {
    // * si aucun code client est selectionné
    // * vider les champs
    console.log(e.target);
    console.log(colonne);
    if (e.target.value == "") {
      // dispatch(viderChampsClientInfo());
    }
    // * on va récuperer les informations de client
    // * à partir de son code
    if (
      colonne == "code" &&
      e.target.value != "" &&
      // e.target.value.length == 8 &&
      !isNaN(e.target.value)
    ) {
      // dispatch(getClientParCode(e.target.value));
    }
    dispatch(setClientInfos({ colonne, valeur: e.target.value }));
    if (insertionDepuisDevisForm) {
      dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
    }
  };

  return (
    <div className="container">
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="speedometer-outline"></ion-icon>
              </span>
              <span className="title">ERP Logicom</span>
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
            {
              name: "Clients",
              icon: "people-outline",
              path: "/ClientFormTout",
            },
            { name: "devis", icon: "chatbubble-outline", path: "/DevisList" },
            {
              name: "devistout",
              icon: "lock-closed-outline",
              path: "/DevisFormTout",
            },
            {
              name: "les societes",
              icon: "help-outline",
              path: "/SocietiesList",
            },
            { name: "Settings", icon: "settings-outline", path: "/" },
            {
              name: "Deconnexion",
              icon: "log-out-outline",
              path: "/deconnexion",
            },
          ].map((item, index) => (
            <li key={index}>
              {/* Use Link instead of <a> */}
              <Link to={item.path}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`main ${isSidebarOpen ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <ToolBar />

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <img
                src="assets/imgs/customer01.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <img
                    src="assets/imgs/customer01.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaUser className="mr-3" /> My Profile
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaCog className="mr-3" /> Settings
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer relative">
                    <FaCreditCard className="mr-3" /> Billing
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      4
                    </span>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <FaSignOutAlt className="mr-3" /> Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="details">
          <div className="recentOrders flex flex-row flex-nowrap gap-4">
            <h2
              style={{
                color: "rgb(48, 60, 123)",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
              className="text-3xl"
            >
              Devis / Facture Proforma
            </h2>
            <div className="flex-1">
              {/*Identifiants devis */}
              <div className="flex-1 grid grid-cols-2">
                <span>
                  <div className="space-y-0 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                      <FaFileInvoice className="text-blue-500" />
                      <span>Identifiants Devis</span>
                    </h3>
                    <label className="block font-medium">N° Devis :</label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      disabled={activerChampsForm}
                      // onChange={(e) => handleSelectDevis(e)}
                    >
                      <option value="vide">Sélectionnez un devis</option>
                      {/* {listeNUMBL.map((codeDevis) => (
                        <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
                          {codeDevis.NUMBL}
                        </option>
                      ))} */}
                    </select>

                    <label className="block font-medium">
                      Point de vente :
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      disabled={!activerChampsForm}
                    >
                      {/* {listePointsVente.map((pointVente) => (
                        <option key={pointVente.libpv} value={pointVente.libpv}>
                          {pointVente.libpv}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  {/* Détails Devis */}
                  <div className="space-y-0 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                      <FaClipboardList className="text-purple-500" />
                      <span>Détails Devis</span>
                    </h3>
                    <label className="block font-medium">Date :</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      // defaultValue={devisInfos.DATEBL} // Assurez-vous d'avoir cet état dans votre composant
                      onChange={(e) =>
                        setDevisInfo({
                          collone: "DATEBL",
                          valeur: e.target.value,
                        })
                      } // Mettez à jour l'état
                    />
                    <label className="block font-medium">Transport :</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                    />

                    <label className="block font-medium">
                      À l'attention de :
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                    />

                    <label className="block font-medium">
                      Délai de livraison :
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                    />
                  </div>
                </span>
                {/* Information Client */}
                <div className="space-y-0 p-6 border rounded-lg shadow-md bg-white">
                  <h3 className="text-lg font-bold flex items-center space-x-2">
                    <FaUser className="text-green-500" />
                    <span>Information Client</span>
                    <button
                      className="btn btn-outline btn-accent"
                      // onClick={() => handleAjoutClientRedirect()}
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
                    // defaultValue={devisInfos.CODECLI} // Assurez-vous d'avoir cet état dans votre composant
                    // onChange={(e) =>
                    //   setDevisInfo({ collone: "CODECLI", valeur: e.target.value })
                    // } // Mettez à jour l'état
                  />

                  <label className="block font-medium">Raison Sociale :</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    // defaultValue={devisInfos.RSCLI} // Assurez-vous d'avoir cet état dans votre composant
                    onChange={(e) =>
                      setDevisInfo({
                        collone: "RSCLI",
                        valeur: e.target.value,
                      })
                    } // Mettez à jour l'état
                  />

                  <label className="block font-medium">Adresse :</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    // defaultValue={devisInfos.ADRCLI} // Assurez-vous d'avoir cet état dans votre composant
                    onChange={(e) =>
                      setDevisInfo({
                        collone: "ADRCLI",
                        valeur: e.target.value,
                      })
                    } // Mettez à jour l'état
                  />

                  <label className="block font-medium">Code Postal :</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    // defaultValue={devisInfos.cp} // Assurez-vous d'avoir cet état dans votre composant
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
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            {/* Informations de l'Utilisateur */}
            <div className="space-y-0 p-6 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <FaUsers className="text-red-500" />
                <span>Informations de l'Utilisateur</span>
              </h3>

              <label className="block font-medium">Vendeur :</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={!activerChampsForm}
              />

              <label className="block font-medium">RSREP :</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={!activerChampsForm}
              />

              <label className="block font-medium">Code Secteur :</label>
              <select
                className="select select-bordered w-full max-w-xs"
                disabled={!activerChampsForm}
                // onChange={(e) => handleSelectDevis(e)}
              ></select>

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
                disabled={!activerChampsForm}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
};

export default Parent;
