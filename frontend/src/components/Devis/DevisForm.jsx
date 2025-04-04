import React, { useState } from "react";
import {
  FaFileInvoice,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientParCode,
  getToutCodesClient,
  setInsertionDepuisDevisForm,
} from "../../app/client_slices/clientSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getDevisParNUMBL,
  getListeNumbl,
  setDevisInfo,
  setDevisInfoEntiere,
  getListePointsVente,
  getLignesDevis,
  viderChampsDevisInfo,
  setDevisClientInfos,
} from "../../app/devis_slices/devisSlice";
import ToolBar from "../Common/ToolBar";
import ArticlesDevis from "./ArticlesDevis";
import {
  setActiverChampsForm,
  setToolbarMode,
} from "../../app/interface_slices/uiSlice";

function DevisForm() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  // * tableau contenant la liste des codes des devis
  const listeNUMBL = useSelector((state) => state.DevisCrud.listeNUMBL);

  const listePointsVente = useSelector(
    (state) => state.DevisCrud.listePointsVente
  );
  // * UseEffect #1 : récupérer la liste des codes de devis et liste de points de vente
  useEffect(() => {
    dispatch(getListeNumbl());
    dispatch(getListePointsVente());
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  const listeToutCodesClients = useSelector(
    (state) => state.ClientCrud.listeToutCodesClients
  );
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);

  // * UseEffect #2 : Récuperer la liste de codes clients lorsque
  // * le mode de toolbar change vers l'ajout
  useEffect(() => {
    if (toolbarMode == "ajout") dispatch(getToutCodesClient());
  }, [toolbarMode]);

  // * WIP : sélectionne un dévis de la liste des devis
  // * pour afficher ses informations dans les champs
  // * du formulaire

  const handleSelectDevis = (e) => {
    if (e.target.value != "" && e.target.value.length == 9) {
      dispatch(getDevisParNUMBL(e.target.value));
      dispatch(getLignesDevis(e.target.value));
    }
    // * vider les champs du formulaire
    else dispatch(viderChampsDevisInfo());
  };
  // * informations d'un devis provenant des champs de cette formulaire

  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);

  // * UseEffect #3 : récuperer les information de client
  // * associé avec le devis selectionné
  useEffect(() => {
    if (devisInfo.CODECLI) {
      dispatch(getClientParCode(devisInfo.CODECLI));
    }
  }, [devisInfo.CODECLI]);

  // * UseEffect #4 : récuperer les information d'utilisateur connecté
  useEffect(() => {
    if (devisInfo.CODECLI) {
      dispatch(getClientParCode(devisInfo.CODECLI));
    }
  }, [devisInfo.CODECLI]);
  const handleChange = (e, col) => {
    dispatch(
      setDevisInfo({
        collone: col,
        valeur: e.target.value,
      })
    );
    if (
      col == "CODECLI" &&
      e.target.value != "" &&
      e.target.value.length == 8 &&
      !isNaN(e.target.value)
    ) {
      dispatch(getClientParCode(e.target.value));
    }
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

    navi("/ClientFormTout");
  };

  const toobarTable = useSelector((state) => state.uiStates.toolbarTable);
  // * useEffect #5 : désactiver tous les champs
  // * et indiquer qu'on va utiliser la table de devis

  useEffect(() => {
    dispatch(setToolbarMode("devis"));
    dispatch(setActiverChampsForm(false));
  }, []);

  const NETHTGLOBAL = devisInfo.MHT - devisInfo.MREMISE || 0;
  const taxe = devisInfo.MTTC - NETHTGLOBAL || 0;
  const apayer = devisInfo.MTTC + devisInfo.TIMBRE || 0;

  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  return (
    <>
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
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              >
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
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        list="listeCodesNumbl"
                        onChange={(e) => handleSelectDevis(e)}
                      />
                      <datalist id="listeCodesNumbl">
                        {listeNUMBL.map((codeDevis) => (
                          <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
                            {codeDevis.NUMBL}
                          </option>
                        ))}
                      </datalist>
                      {/* <select
                        className="select select-bordered w-full max-w-xs"
                        disabled={activerChampsForm}
                        onChange={(e) => handleSelectDevis(e)}
                      >
                        <option value="vide">Sélectionnez un devis</option>
                        {listeNUMBL.map((codeDevis) => (
                          <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
                            {codeDevis.NUMBL}
                          </option>
                        ))}
                      </select> */}

                      <label className="block font-medium">
                        Point de vente :
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        disabled={!activerChampsForm}
                      >
                        {listePointsVente.map((pointVente) => (
                          <option
                            key={pointVente.Code}
                            value={pointVente.Code}
                          >
                            {pointVente.libpv}
                          </option>
                        ))}
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
                        Value={devisInfo.DATEBL}
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
                      value={clientInfos.code || ""}
                      // defaultValue={devisInfos.CODECLI} // Assurez-vous d'avoir cet état dans votre composant
                      // onChange={(e) =>
                      //   setDevisInfo({ collone: "CODECLI", valeur: e.target.value })
                      // } // Mettez à jour l'état
                    />

                    <label className="block font-medium">
                      Raison Sociale :
                    </label>
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
                      value={clientInfos.rsoc || ""}
                    />

                    <label className="block font-medium">Adresse :</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      defaultValue={clientInfos.adresse || ""}
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
                      value={clientInfos.cp ? clientInfos.cp : ""} // Assurez-vous d'avoir cet état dans votre composant
                      onChange={(e) =>
                        setDevisInfo({ collone: "cp", valeur: e.target.value })
                      } // Mettez à jour l'état
                    />

                    <label className="block font-medium">Email :</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      value={clientInfos.email || ""}
                    />

                    <label className="block font-medium">Téléphone :</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      value={clientInfos.telephone || ""}
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
                  value={infosUtilisateur.codeuser || ""}
                />

                <label className="block font-medium">RSREP :</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                  value={infosUtilisateur.directeur || ""}
                />

                <label className="block font-medium">Code Secteur :</label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  disabled={!activerChampsForm}
                  value={devisInfo.codesecteur || ""}
                  //onChange={(e) => handleSelectDevis(e)}
                ></select>

                <label className="block font-medium">
                  Désignation Secteur :
                </label>
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
                <div className="flex flex-col w-full">
                  {/* Ligne pour "Creation" */}
                  <div className="flex items-center space-x-4">
                    <label
                      className="font-medium w-1/3 text-left block "
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Creation
                    </label>

                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      value={
                        infosUtilisateur.codeuser +
                          " // " +
                          infosUtilisateur.nom || ""
                      }
                      // onChange={(e) => handleChange(e, "usera")}
                      disabled
                    />
                  </div>

                  {/* Ligne pour "Modification" */}
                  <div className="flex items-center space-x-4">
                    <label
                      className="font-medium w-1/3 text-left block "
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Modification
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      value={
                        devisInfo.userm
                          ? infosUtilisateur.code + "//" + infosUtilisateur.nom
                          : ""
                      }
                      // onChange={(e) => handleChange(e, "userm")}
                      disabled
                    />
                  </div>

                  {/* Ligne pour "Date Maj" */}
                  <div className="flex items-center space-x-4">
                    <label
                      className="font-medium w-1/3 text-left block "
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Date Maj
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      value={devisInfo.DATEDMAJ || ""}
                      // onChange={(e) => handleChange(e, "datemaj")}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Table des articles */}
          {toolbarMode === "ajout" && <ArticlesDevis />}
          <div className="mt-6">
            <div className="p-4 sticky bottom-0 w-full overflow-x-auto">
              <table className="min-w-[600px] sm:min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-300">
                  {/* Ajout du fond gris pour l'en-tête */}
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      Famille
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      Code Article
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      Unité
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      Quantite
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      Remise
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      Libelle
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      TVA
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      PUHT
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      PUTTC
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                      NET HT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(devisInfo.articles || []).length > 0 ? (
                    devisInfo.articles.map((article) => (
                      <tr
                        key={`${article.famille}-${article.CodeART}`}
                        className="transition-all duration-150 ease-in-out hover:bg-[#2A2185]"
                      >
                        <td className="p-3 border border-gray-300">
                          {article.famille}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.CodeART}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.Unite}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.QteART}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.Remise}%
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.DesART}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.TauxTVA}%
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.PUART}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.PUART}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {article.PUART}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        Aucun article trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-300 p-4 sticky bottom-0 w-full">
            <div className="flex flex-wrap gap-0">
              <div className="flex-1 min-w-[150px]">
                <label className="block  font-bold">Montant HT :</label>

                <input
                  type="text"
                  name="totalHt"
                  defaultValue={devisInfo.MHT}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Remise Totale :</label>
                <input
                  type="text"
                  name="Remise"
                  defaultValue={devisInfo.MREMISE}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Net HT Global :</label>
                <input
                  type="text"
                  name="netHtGlobal"
                  value={NETHTGLOBAL.toFixed(3)}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Taxe :</label>
                <input
                  type="text"
                  name="taxe"
                  value={taxe.toFixed(3)}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Montant TTC :</label>
                <input
                  type="text"
                  name="MTTC"
                  defaultValue={devisInfo.MTTC ? devisInfo.MTTC.toFixed(3) : ""}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Timbre :</label>
                <input
                  type="text"
                  name="timbre"
                  defaultValue={devisInfo.TIMBRE}
                  readOnly={!(toolbarMode == "ajout" && toobarTable == "devis")}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">À Payer :</label>
                <input
                  type="text"
                  name="aPayer"
                  value={apayer.toFixed(3)}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <script src="%PUBLIC_URL%/assets/js/main.js"></script>
      </div>
    </>
  );
}

export default DevisForm;
