import React, { useState } from "react";
import {
  FaFileInvoice,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaRegUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientParCode,
  getDerniereCodeClient,
  getToutCodesClient,
  setClientInfos,
  setInsertionDepuisDevisForm,
} from "../../app/client_slices/clientSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getDevisParNUMBL,
  getListeNumbl,
  setDevisInfo,
  getListePointsVente,
  getLignesDevis,
  viderChampsDevisInfo,
} from "../../app/devis_slices/devisSlice";
import ToolBar from "../Common/ToolBar";
import ArticlesDevis from "./ArticlesDevis";
import {
  setActiverChampsForm,
  setAfficherRecherchePopup,
  setOuvrireDrawerMenu,
  setToolbarMode,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";
import SideBar from "../Common/SideBar";
import TableArticle from "./TableArticle";

function DevisForm() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const navi = useNavigate();
  const listePointsVente = useSelector(
    (state) => state.DevisCrud.listePointsVente
  );
  const [isOpen, setIsOpen] = useState(false);
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  const listeToutCodesClients = useSelector(
    (state) => state.ClientCrud.listeToutCodesClients
  );
  // * informations d'un devis provenant des champs de cette formulaire
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  // * boolean pour activer/désactiver champs du formulaire
  // * initialement false (champs désactivé en mode de consultation)
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );
  const toobarTable = useSelector((state) => state.uiStates.toolbarTable);
  const NETHTGLOBAL = devisInfo.MHT - devisInfo.MREMISE || 0;
  const taxe = devisInfo.MTTC - NETHTGLOBAL || 0;
  const apayer = devisInfo.MTTC + devisInfo.TIMBRE || 0;
  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  const dernierCodeClient = useSelector(
    (state) => state.ClientCrud.dernierCodeClient
  );
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.uiStates.ouvrireMenuDrawer
  );
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  //?==================================================================================================================
  //?==============================================appels UseEffect====================================================
  //?==================================================================================================================
  // * UseEffect #1 : récupérer la liste des codes de devis et liste de points de vente
  useEffect(() => {
    dispatch(getListeNumbl());
    dispatch(getListePointsVente());
  }, []);
  // * UseEffect #2 : Récuperer la liste de codes clients lorsque
  // * le mode de toolbar change vers l'ajout
  useEffect(() => {
    if (toolbarMode == "ajout") dispatch(getToutCodesClient());
  }, [toolbarMode]);

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
  // * useEffect #5 : désactiver tous les champs
  // * et indiquer qu'on va utiliser la table de devis

  useEffect(() => {
    dispatch(setToolbarTable("devis"));
    dispatch(setToolbarMode("consultation"));
    dispatch(setActiverChampsForm(false));
  }, []);

  useEffect(() => {
    if (devisInfo.NUMBL && devisInfo.NUMBL !== "") {
      dispatch(getLignesDevis(devisInfo.NUMBL));
    }
  }, [devisInfo.NUMBL]);

  useEffect(() => {
    if (clientInfos) {
      dispatch(setDevisInfo({ collone: "CODECLI", valeur: clientInfos.code }));
      dispatch(setDevisInfo({ collone: "RSCLI", valeur: clientInfos.rsoc }));
      dispatch(
        setDevisInfo({ collone: "ADRCLI", valeur: clientInfos.adresse })
      );
    }
  }, [clientInfos.code]);
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  // * WIP : sélectionne un dévis de la liste des devis
  // * pour afficher ses informations dans les champs
  // * du formulaire
  const handleSelectDevis = (e) => {
    if (e.target.value != "" && e.target.value.length == 9) {
      dispatch(getDevisParNUMBL(e.target.value));
    }
    // * vider les champs du formulaire
    else dispatch(viderChampsDevisInfo());
  };
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

  // * méthode pour indiquer qu'on veut ajouter un nouveau client
  // * à partir de cette formulaire, ceci est nécessaire pour qu'on puisse
  // * consérver tous données de devis saisies avant l'ajout du client
  const handleAjoutClientRedirect = () => {
    dispatch(getDerniereCodeClient());
    dispatch(setClientInfos({ colonne: "code", valeur: dernierCodeClient }));
    dispatch(setInsertionDepuisDevisForm(true));

    navi("/ClientFormTout");
  };

  const handleChangeCodeClient = (valeur) => {
    console.log(valeur);
    dispatch(setDevisInfo({ collone: "CODECLI", valeur: valeur }));
    dispatch(getClientParCode(valeur));
  };
  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true));
  };
  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };
  return (
    <>
      <div className="container">
        <SideBar />
        <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
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
                <FaRegUserCircle className="mr-3 text-3xl" />
                {/* Indicateur de statut en ligne */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* Menu déroulant */}
              {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4 flex items-center border-b">
                    <FaRegUserCircle className="mr-3 text-3xl" />
                    <div>
                      <p className="font-semibold">{infosUtilisateur.nom}</p>
                      <p className="text-sm text-gray-500">
                        {infosUtilisateur.type}
                      </p>
                    </div>
                  </div>
                  <ul className="py-2">
                    <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                      <Link
                        to="/UtilisateurFormTout"
                        className="flex items-center w-full"
                      >
                        <FaUser className="mr-3" /> My Profile
                      </Link>
                    </li>
                    <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                      <Link to="/Settings" className="flex items-center w-full">
                        <FaCog className="mr-3" /> Settings
                      </Link>
                    </li>

                    <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                      <Link to="/" className="flex items-center w-full">
                        <FaSignOutAlt className="mr-3" /> Log Out
                      </Link>
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
                <div className="flex-1">
                  <div className="grid grid-cols-2 grid-rows-2">
                    <div className="space-y-0 p-6 border rounded-lg shadow-md bg-white">
                      <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaFileInvoice className="text-blue-500" />
                        <span>Identifiants Devis</span>
                      </h3>
                      <label className="block font-medium">N° Devis :</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={(e) => handleSelectDevis(e)}
                        value={devisInfo.NUMBL}
                        disabled={activerChampsForm}
                        onClick={() => {
                          dispatch(setToolbarTable("devis"));
                          afficherRecherchePopup();
                        }}
                      />

                      <label className="block font-medium">
                        Point de vente :
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        disabled={!activerChampsForm}
                      >
                        {listePointsVente.map((pointVente) => (
                          <option
                            key={pointVente.Libelle}
                            value={pointVente.Libelle}
                          >
                            {pointVente.Libelle}
                          </option>
                        ))}
                      </select>

                      <label className="block font-medium">
                        Code Secteur :
                      </label>
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
                        value={devisInfo.DATEBL}
                        onChange={(e) =>
                          setDevisInfo({
                            collone: "DATEBL",
                            valeur: e.target.value,
                          })
                        }
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
                        Délai de livraison (en jours)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                      />
                    </div>
                    {/* Information Client */}
                    <div className="col-span-2 space-y-0 p-6 border rounded-lg shadow-md bg-white">
                      <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaUser className="text-green-500" />
                        <span>Information Client</span>
                        <button
                          className="btn btn-outline btn-accent"
                          onClick={() => handleAjoutClientRedirect()}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </button>
                      </h3>
                      <label className="block font-medium">Code Client :</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        value={clientInfos.code || ""}
                        onChange={(e) => handleChangeCodeClient(e.target.value)}
                        onClick={() => {
                          dispatch(setToolbarTable("client"));
                          afficherRecherchePopup();
                        }}
                        list={
                          toolbarMode == "ajout" || "modification"
                            ? "listeCodesClients"
                            : ""
                        }
                      />

                      <label className="block font-medium">
                        Raison Sociale :
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        onChange={(e) => {
                          setDevisInfo({
                            collone: "RSCLI",
                            valeur: e.target.value,
                          });
                        }}
                        value={clientInfos.rsoc || ""}
                      />

                      <label className="block font-medium">Adresse :</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        value={clientInfos.adresse || ""}
                        onChange={(e) =>
                          setDevisInfo({
                            collone: "ADRCLI",
                            valeur: e.target.value,
                          })
                        }
                      />
                    </div>
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
                  <br></br>
                  <br></br>
                  <br></br>
                  <label className="block font-medium mt-4">
                    Commentaire :
                  </label>
                  <textarea
                    rows="10"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          {/* Table des articles */}
          {toolbarMode === "ajout" && <ArticlesDevis />}
          <div className="mt-6">
            <div className="p-4 sticky bottom-0 w-full overflow-x-auto">
              <TableArticle />
            </div>
          </div>
          <div className="bg-gray-300 p-4 sticky bottom-0 w-full">
            <div className="flex flex-wrap gap-0">
              <div className="flex-1 min-w-[150px]">
                <label className="block  font-bold">Montant HT :</label>

                <input
                  type="text"
                  name="totalHt"
                  value={devisInfo.MHT}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Remise Totale :</label>
                <input
                  type="text"
                  name="Remise"
                  value={devisInfo.MREMISE}
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
                  value={devisInfo.MTTC ? devisInfo.MTTC.toFixed(3) : ""}
                  className="w-full border rounded-md p-2"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block font-medium">Timbre :</label>
                <input
                  type="text"
                  name="timbre"
                  value={devisInfo.TIMBRE}
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
