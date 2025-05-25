import React, { useState } from "react";
import {
  FaFileInvoice,
  FaUser,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientParCode,
  getDerniereCodeClient,
  getToutCodesClient,
  setClientInfos,
  setInsertionDepuisDevisForm,
} from "../../app/client_slices/clientSlice";
import { useNavigate } from "react-router-dom";
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
  getDesignationSecteurparCodeSecteur,
  getListeCodeVendeur,
  getrepresentantparcodevendeur,
} from "../../app/devis_slices/devisSlice";
import ToolBar from "../Common/ToolBar";
import {
  setActiverBoutonsValiderAnnuler,
  setActiverChampsForm,
  setAfficherRecherchePopup,
  setToolbarMode,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import SideBar from "../Common/SideBar";
import LignesDevis from "./LignesDevis";
import ArticlesDevis from "./ArticlesDevis";
import DateCreateMAJ from "../Common/DateCreateMAJ";
import { isAlphabetique, isAlphaNumerique } from "../../utils/validations";

function DevisForm() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const navi = useNavigate();
  const listePointsVente = useSelector(
    (state) => state.devisSlice.listePointsVente
  );

  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const listesecteur = useSelector((state) => state.devisSlice.listesecteur);

  const listeToutCodesClients = useSelector(
    (state) => state.clientSlice.listeToutCodesClients
  );
  // * informations d'un devis provenant des champs de cette formulaire
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const listeVendeur = useSelector((state) => state.devisSlice.listeVendeur);
  // * boolean pour activer/désactiver champs du formulaire
  // * initialement false (champs désactivé en mode de consultation)
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );
  const toobarTable = useSelector((state) => state.interfaceSlice.toolbarTable);
  const NETHTGLOBAL = devisInfo.MHT - devisInfo.MREMISE || 0;
  const taxe = devisInfo.MTTC - NETHTGLOBAL || 0;
  const [apayer, setApayer] = useState(0);

  useEffect(() => {
    const mttc = parseFloat(devisInfo.MTTC) || 0;
    const timbre = parseFloat(devisInfo.TIMBRE) || 0;
    setApayer(mttc + timbre);
  }, [devisInfo.MTTC, devisInfo.TIMBRE]);

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
  const toolbarTable = useSelector(
    (state) => state.interfaceSlice.toolbarTable
  );
  const listeNUMBL = useSelector((state) => state.devisSlice.listeNUMBL);
  const derniereNumbl = useSelector((state) => state.devisSlice.derniereNumbl);
  //?==================================================================================================================
  //?==============================================appels UseEffect====================================================
  //?==================================================================================================================
  // * UseEffect #1 : désactiver tous les champs
  // * et indiquer qu'on va utiliser la table de devis
  // * et récupérer la liste des codes de devis et liste de points de vente
  // * et récuperer le dernier NUMBL
  useEffect(() => {
    dispatch(setToolbarTable("devis"));
    dispatch(setToolbarMode("consultation"));
    dispatch(setActiverChampsForm(false));
    dispatch(getListeNumbl());
    dispatch(getListePointsVente());
    dispatch(getListeSecteur());
    dispatch(getListeCodeVendeur());
  }, []);

  // * UseEffect #2 : Récuperer la liste de codes clients lorsque
  // * le mode de toolbar change vers l'ajout
  useEffect(() => {
    if (toolbarMode == "ajout") dispatch(getToutCodesClient());
  }, [toolbarMode]);

  useEffect(() => {
    if (devisInfo.codesecteur && devisInfo.codesecteur != "") {
      dispatch(getDesignationSecteurparCodeSecteur(devisInfo.codesecteur));
    }
  }, [devisInfo.codesecteur]);
  // * useEffect #5: remplir le champ NUMBL par le derniere NUMBL récuperé
  useEffect(() => {
    if (!devisInfo.NUMBL && listeNUMBL.length > 0) {
      dispatch(
        // setDevisInfo({ collone: "NUMBL", valeur: "DV" + derniereNumbl })
        setDevisInfo({
          collone: "NUMBL",
          valeur: listeNUMBL[listeNUMBL.length - 1].NUMBL,
        })
      );
    }
  }, [devisInfo.NUMBL, listeNUMBL]);

  useEffect(() => {
    if (
      derniereNumbl &&
      toolbarMode == "ajout" &&
      devisInfo.NUMBL != derniereNumbl
    ) {
      const nouvNumbl = derniereNumbl + 1;
      dispatch(
        setDevisInfo({ collone: "NUMBL", valeur: "DV" + nouvNumbl })
      );
    }
  }, [derniereNumbl, toolbarMode, devisInfo.NUMBL]);

  // * useEffect #6: récuperer les informations de devis
  // * et les lignes de devis par NUMBL
  useEffect(() => {
    if (devisInfo.NUMBL && devisInfo.NUMBL != "" && toolbarMode != "ajout") {
      dispatch(getDevisParNUMBL(devisInfo.NUMBL));
      dispatch(getLignesDevis(devisInfo.NUMBL));
    }

    // if(!devisInfo.NUMBL) {
    //   dispatch(getDerniereNumbl(utilisateurConnecte.codeuser));
    // }
  }, [devisInfo.NUMBL]);

  // * useEffect #7 : remplacer la valeur de champ NUMBL
  // * par le derniere NUMBL incrementé par 1 lors d'ajout d'un devis
  useEffect(() => {
    if (
      toolbarMode &&
      toolbarMode === "ajout"
      // derniereNumbl != devisInfo.NUMBL
    ) {
      dispatch(
        setDevisInfo({
          collone: "NUMBL",
          valeur: "DV" + (parseInt(derniereNumbl) + 1),
        })
      );
    }
  }, [toolbarMode]);
  const insertionDepuisDevisForm = useSelector(
    (state) => state.clientSlice.insertionDepuisDevisForm
  );
  useEffect(() => {
    if(insertionDepuisDevisForm){
      dispatch(setActiverBoutonsValiderAnnuler(true))
      dispatch(setActiverChampsForm(true));
      dispatch(setToolbarMode("ajout"))
      // console.log("ajout client ", toolbarMode, " ", toolbarTable)
    }
  },[toolbarMode, toolbarTable])

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
  const handleChangeAlphanumerique = (colonne, valeur) => {
    const Alph = [
      "delailivr",
      "REFCOMM",
      "mlettre",
      "comm",
      "ADRCLI",
      "transport",
    ];
    if (Alph.includes(colonne) && isAlphaNumerique(valeur)) {
      dispatch(setDevisInfo({ collone: colonne, valeur }));
    }
  };
  const handleChange = (e, col) => {
    if (col == "codesecteur") {
      dispatch(getDesignationSecteurparCodeSecteur(e.target.value));
    }
    if (col == "CODEREP") {
      dispatch(getrepresentantparcodevendeur(e.target.value));
    }

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
    dispatch(setDevisInfo({ collone: "CODECLI", valeur: valeur }));
  };
  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true));
  };
  return (
    <>
      <div className="container">
        <SideBar />
        <div className={`main ${ouvrireMenuDrawer ? "active" : ""} bg-base-100`}>
          <ToolBar />
          <div className="details bg-base-100">
            <div className="recentOrders flex flex-row flex-nowrap gap-4">
              <div className="flex-1">
                {/*Identifiants devis */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 grid-rows-2">
                    <div className="space-y-0 p-6 border rounded-lg shadow-md bg-base-100">
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
                            ? "DV" + derniereNumbl
                            : devisInfo.NUMBL
                        }
                        readOnly={true}
                        onClick={() => {
                          if(toolbarMode != "ajout") {
                            dispatch(setToolbarTable("devis"));
                            afficherRecherchePopup();
                          }
                        }}
                      />

                      <label className="block font-medium">
                        Point de vente :
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        disabled={!activerChampsForm}
                        value={devisInfo.libpv}
                        onChange={(e) => {
                          handleChange(e, "libpv");
                        }}
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
                        onChange={(e) => {
                          handleChange(e, "codesecteur");
                        }}
                        value={devisInfo.codesecteur}
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
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        value={devisInfo.desisec}
                        onChange={(e) => handleChange(e, "desisec")}
                      />
                    </div>

                    {/* Détails Devis */}
                    <div className="space-y-0 p-6 border rounded-lg shadow-md bg-base-100">
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
                        onChange={(e) => handleChange(e, "DATEBL")}
                      />
                      <label className="block font-medium">Transport :</label>
                      <input
                        type="text"
                        value={devisInfo.transport}
                        onChange={(e) =>
                          handleChangeAlphanumerique(
                            "transport",
                            e.target.value
                          )
                        }
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
                        onChange={(e) => handleChange(e, "REFCOMM")}
                      />

                      <label className="block font-medium">
                        Délai de livraison (en jours)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={devisInfo.delailivr}
                        disabled={!activerChampsForm}
                        onChange={(e) =>
                          handleChangeAlphanumerique(
                            "delailivr",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {/* Information Client */}
                    <div className="col-span-2 space-y-0 p-6 border rounded-lg shadow-md bg-base-100">
                      <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaUser className="text-green-500" />
                        <span>Information Client</span>
                        {toolbarMode == "ajout" && (
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() => handleAjoutClientRedirect()}
                          >
                            <i className="fas fa-plus-circle"></i>
                          </button>
                        )}
                      </h3>
                      <label className="block font-medium">Code Client :</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        // disabled={!activerChampsForm}
                        readOnly
                        value={devisInfo.CODECLI || ""}
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
                          handleChange(e, "RSCLI");
                        }}
                        value={devisInfo.RSCLI || ""}
                      />

                      <label className="block font-medium">Adresse :</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        value={devisInfo.ADRCLI || ""}
                        onChange={(e) => handleChange(e, "ADRCLI")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="recentCustomers bg-base-100">
              {/* Informations de l'Utilisateur */}
              <div className="space-y-0 p-6 border rounded-lg shadow-md bg-base-100">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <FaUsers className="text-red-500" />
                  <span>Informations de Vendeur</span>
                </h3>

                <label className="block font-medium">Vendeur :</label>

                <select
                  className="select select-bordered w-full max-w-xs"
                  disabled={!activerChampsForm}
                  onChange={(e) => {
                    handleChange(e, "CODEREP");
                  }}
                  value={devisInfo.CODEREP}
                >
                  {listeVendeur.map((vendeur) => (
                    <option key={vendeur.CODEREP} value={vendeur.CODEREP}>
                      {vendeur.CODEREP}
                    </option>
                  ))}
                </select>

                <label className="block font-medium">
                  Raison sociale de representant :
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => {
                    handleChange(e, "RSREP");
                  }}
                  disabled={!activerChampsForm}
                  value={devisInfo.RSREP ? devisInfo.RSREP : ""}
                />
                {toolbarMode != "ajout" && (
                  <>
                    <label className="block font-medium">Mlettre :</label>
                    <textarea
                      rows={5}
                      className="w-full border border-gray-300 rounded-md p-2"
                      onChange={(e) => {
                        handleChange(e, "mlettre");
                      }}
                      disabled={!activerChampsForm}
                      value={devisInfo.mlettre ? devisInfo.mlettre : ""}
                    />
                  </>
                )}
                <label className="block font-medium mt-4">Commentaire :</label>
                <textarea
                  rows="10"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                  value={devisInfo.comm}
                  onChange={(e) =>
                    handleChangeAlphanumerique("comm", e.target.value)
                  }
                ></textarea>

                <DateCreateMAJ objet={devisInfo} />
              </div>
            </div>
          </div>
          {/* Table des articles */}
          {(toolbarMode === "ajout" || toolbarMode == "modification") && (
            <ArticlesDevis />
          )}
          <div className="mt-6">
            <div className="p-4 sticky bottom-0 w-full overflow-x-auto">
              <LignesDevis />
            </div>
          </div>
          <div className="bg-base-100 p-3 sm:p-9 sticky bottom-3 w-full border-t border-gray-300">
            <div className="flex flex-wrap gap-4 justify-between">
              {/* Montant HT */}
              <div className="flex-1 min-w-[150px] max-w-[200px]">
                <label className="block text-sm font-bold mb-1">
                  Montant HT :
                </label>
                <input
                  type="text"
                  name="totalHt"
                  value={devisInfo.MHT}
                  className="w-full input input-bordered input-sm"
                  readOnly
                />
              </div>

              {/* Remise Totale */}
              <div className="flex-1 min-w-[120px] max-w-[160px]">
                <label className="block text-sm font-medium mb-1">
                  Remise Totale :
                </label>
                <input
                  type="text"
                  name="Remise"
                  value={devisInfo.MREMISE}
                  className="w-full input input-bordered input-sm"
                  readOnly
                />
              </div>

              {/* Net HT Global */}
              <div className="flex-1 min-w-[140px] max-w-[180px]">
                <label className="block text-sm font-medium mb-1">
                  Net HT Global :
                </label>
                <input
                  type="text"
                  name="netHtGlobal"
                  value={NETHTGLOBAL.toFixed(3)}
                  className="w-full input input-bordered input-sm"
                  readOnly
                />
              </div>

              {/* Taxe */}
              <div className="flex-1 min-w-[100px] max-w-[140px]">
                <label className="block text-sm font-medium mb-1">Taxe :</label>
                <input
                  type="text"
                  name="taxe"
                  value={taxe.toFixed(3)}
                  className="w-full input input-bordered input-sm"
                  readOnly
                />
              </div>

              {/* Montant TTC */}
              <div className="flex-1 min-w-[140px] max-w-[180px]">
                <label className="block text-sm font-medium mb-1">
                  Montant TTC :
                </label>
                <input
                  type="text"
                  name="MTTC"
                  value={devisInfo.MTTC ? devisInfo.MTTC.toFixed(3) : ""}
                  className="w-full input input-bordered input-sm"
                  readOnly
                />
              </div>

              {/* Timbre */}
              <div className="flex-1 min-w-[120px] max-w-[160px]">
                <label className="block text-sm font-medium mb-1">
                  Timbre :
                </label>
                <input
                  type="text"
                  name="timbre"
                  value={devisInfo.TIMBRE}
                  onChange={(e) => handleChange(e, "TIMBRE")}
                  readOnly={!(toolbarMode == "ajout" && toobarTable == "devis")}
                  className="w-full input input-bordered input-sm"
                />
              </div>

              {/* À Payer */}
              <div className="flex-1 min-w-[120px] max-w-[160px]">
                <label className="block text-sm font-medium mb-1">
                  À Payer :
                </label>
                <input
                  type="text"
                  name="aPayer"
                  value={apayer.toFixed(3)}
                  className="w-full input input-bordered input-sm"
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
