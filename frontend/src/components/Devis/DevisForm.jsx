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
  getDerniereNumbl,
  getListeSecteur,
} from "../../app/devis_slices/devisSlice";
import ToolBar from "../Common/ToolBar";
import {
  setActiverBoutonsValiderAnnuler,
  setActiverChampsForm,
  setAfficherRecherchePopup,
  setOuvrireDrawerMenu,
  setToolbarMode,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import SideBar from "../Common/SideBar";
import TableArticle from "./TableArticle";
import ArticlesDevis from "./ArticlesDevis";
import DateCreateMAJ from "../Common/DateCreateMAJ";

function DevisForm() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const navi = useNavigate();
  const listePointsVente = useSelector(
    (state) => state.devisSlice.listePointsVente
  );

  const [isOpen, setIsOpen] = useState(false);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const listesecteur = useSelector((state) => state.devisSlice.listesecteur);
  console.log(listesecteur);

  const listeToutCodesClients = useSelector(
    (state) => state.clientSlice.listeToutCodesClients
  );
  // * informations d'un devis provenant des champs de cette formulaire
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  // * boolean pour activer/désactiver champs du formulaire
  // * initialement false (champs désactivé en mode de consultation)
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );
  const toobarTable = useSelector((state) => state.interfaceSlice.toolbarTable);
  const NETHTGLOBAL = devisInfo.MHT - devisInfo.MREMISE || 0;
  const taxe = devisInfo.MTTC - NETHTGLOBAL || 0;
  const apayer = devisInfo.MTTC + devisInfo.TIMBRE || 0;
  const infosUtilisateur = useSelector(
    (state) => state.utilisateurSlice.infosUtilisateur
  );
  const dernierCodeClient = useSelector(
    (state) => state.clientSlice.dernierCodeClient
  );
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const derniereNumbl = useSelector((state) => state.devisSlice.derniereNumbl);
  //?==================================================================================================================
  //?==============================================appels UseEffect====================================================
  //?==================================================================================================================
  // * UseEffect #1 : récupérer la liste des codes de devis et liste de points de vente

  useEffect(() => {
    dispatch(getListeNumbl());
    dispatch(getListePointsVente());
    dispatch(getListeSecteur());
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
    dispatch(getDerniereNumbl());
  }, []);

  useEffect(() => {
    if (derniereNumbl && derniereNumbl != "") {
      dispatch(
        setDevisInfo({ collone: "NUMBL", valeur: "DV" + derniereNumbl })
      );
      dispatch(getDevisParNUMBL("DV" + derniereNumbl));
      dispatch(getLignesDevis("DV" + derniereNumbl));
    }
  }, [derniereNumbl]);
  useEffect(() => {
    if (devisInfo.NUMBL && devisInfo.NUMBL != "") {
      dispatch(getDevisParNUMBL(devisInfo.NUMBL));
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
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const handleChangeCodeClient = (valeur) => {
    console.log(valeur);
    dispatch(setDevisInfo({ collone: "CODECLI", valeur: valeur }));
    dispatch(getClientParCode(valeur));
  };
  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true));
  };
  return (
    <>
      <div className="container">
        <SideBar />
        <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
          {/* <div className="topbar">
            <div className="toggle" onClick={toggleSidebar}>
              <ion-icon name="menu-outline"></ion-icon>
            </div>
            </div> */}
          <ToolBar />
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
                        value={
                          derniereNumbl != "" && devisInfo.NUMBL == ""
                            ? derniereNumbl
                            : devisInfo.NUMBL
                        }
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
                      >
                        {listesecteur.map((secteur) => (
                          <option key={secteur.codesec} value={secteur.codesec}>
                            {secteur.codesec}
                          </option>
                        ))}
                      </select>

                      <label className="block font-medium">
                        Désignation Secteur :
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        disabled={!activerChampsForm}
                      >
                        {listesecteur.map((secteur) => (
                          <option key={secteur.desisec} value={secteur.desisec}>
                            {secteur.desisec}
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
                        value={devisInfo.transport}
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                      />

                      <label className="block font-medium">
                        À l'attention de :
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={devisInfo.REFCOMM}
                        disabled={!activerChampsForm}
                      />

                      <label className="block font-medium">
                        Délai de livraison (en jours)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        value={devisInfo.delailivr}
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
                  value={utilisateurConnecte.codeuser || ""}
                />

                <label className="block font-medium">RSREP :</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                  value={utilisateurConnecte.directeur || ""}
                />
                <label className="block font-medium mt-4">Commentaire :</label>
                <textarea
                  rows="10"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                ></textarea>

                <DateCreateMAJ objet={devisInfo} />
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
          <div className="bg-gray-300 p-10 sticky bottom-5 pt-2 w-full">
            <div className="flex flex-wrap gap-0">
              <div className="flex-1 min-w-[200px]">
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
