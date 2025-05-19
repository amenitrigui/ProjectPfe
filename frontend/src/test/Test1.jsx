import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  getClientParCode,
  getDesignationSecteurparCodeSecteur,
  getVilleParCodePostal,
  getVilleParRegion,
  setClientInfos,
  viderChampsClientInfo,
} from "../app/client_slices/clientSlice";
import { setDevisInfo } from "../app/devis_slices/devisSlice";
import SideBar from "../components/Common/SideBar";
import ToolBar from "../components/Common/ToolBar";
import { isAlphabetique, isNumerique } from "../utils/validations";
import { setAfficherRecherchePopup, setAfficherSecteurPopup, setToolbarTable } from "../app/interface_slices/interfaceSlice";

function Test1() {
  const dispatch = useDispatch();

  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
    const utilisateurConnecte = useSelector(
      (state) => state.utilisateurSystemSlice.utilisateurConnecte
    );
  
    const infosUtilisateur = useSelector(
      (state) => state.utilisateurSlice.infosUtilisateur
    );
    const handleChangeTel = (e, colonne) => {
      if (isNumerique(e.target.value)) {
        dispatch(setClientInfos({ colonne: colonne, valeur: e.target.value }));
      }
    };
    const handleChangeFax = (e, colonne) => {
      if (!isNaN(e.target.value)) {
        dispatch(setClientInfos({ colonne: "fax", valeur: e.target.value }));
      }
      if (e.target.value == "") {
        dispatch(setClientInfos({ colonne: "fax", valeur: "" }));
      }
    };
    const listeCodesRegion = useSelector(
      (state) => state.clientSlice.listeCodesRegion
    );
    const dernierCodeClient = useSelector(
      (state) => state.clientSlice.dernierCodeClient
    );
    // * pour afficher le sidebar
    const ouvrireMenuDrawer = useSelector(
      (state) => state.interfaceSlice.ouvrireMenuDrawer
    );
    // * pour afficher le menu déroulante pour l'avatar
    const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
    const listeToutCodesClients = useSelector(
      (state) => state.clientSlice.listeToutCodesClients
    );
  
  
    // Sélection des informations du client depuis le state Redux
    // state pour désactiver/activer les champs lors de changement de modes editables (ajout/modification)
    // vers le mode de consultation respectivement
    const activerChampsForm = useSelector(
      (state) => state.interfaceSlice.activerChampsForm
    );
  
    // Sélection du booléen pour détecter si l'insertion est faite depuis le formulaire de devis
    const insertionDepuisDevisForm = useSelector(
      (state) => state.clientSlice.insertionDepuisDevisForm
    );
  
    const listeToutCodesPosteaux = useSelector(
      (state) => state.clientSlice.listeToutCodesPosteaux
    );
    const listeCodespointVente = useSelector(
      (state) => state.pointVenteSlice.listeCodespointVente
    );
    const listeCodesSecteur = useSelector(
      (state) => state.clientSlice.listeCodesSecteur
    );
    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChange = (e, colonne) => {
      // * si aucun code client est selectionné
      // * vider les champs
      if (colonne == "code" && e.target.value == "") {
        dispatch(viderChampsClientInfo());
      }
      if (e)
        if (colonne == "cp" && e.target.value.length == 4) {
          dispatch(getVilleParCodePostal(e.target.value));
        }
      dispatch(setClientInfos({ colonne, valeur: e.target.value }));
      if (insertionDepuisDevisForm) {
        dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
      }
    };
  
    const handleChangeCodePostal = (e) => {
      if (e.target.value.length == 4) {
        dispatch(getVilleParCodePostal(e.target.value));
      }
      if (e.target.value == "") {
        dispatch(setClientInfos({ colonne: "desicp", valeur: "" }));
      }
      dispatch(setClientInfos({ colonne: "cp", valeur: e.target.value }));
    };
  
    const handleSecteurChange = (e) => {
      dispatch(setClientInfos({ colonne: "codes", valeur: e.target.value }));
      if (e.target.value.length == 3) {
        dispatch(getDesignationSecteurparCodeSecteur(e.target.value));
      }
      if (e.target.value == "") {
        dispatch(setClientInfos({ colonne: "desisec", valeur: "" }));
      }
    };
    const hundleRegionChange = (e) => {
      dispatch(setClientInfos({ colonne: "coder", valeur: e.target.value }));
      if (e.target.value.length == 3) {
        dispatch(getVilleParRegion(e.target.value));
      }
      if (e.target.value == "") {
        dispatch(setClientInfos({ colonne: "desirgg", valeur: "" }));
      }
    };
    const handleChangeCodeClient = (e, colonne) => {
      if (isNumerique(e.target.value)) {
        dispatch(setClientInfos({ colonne: "code", valeur: e.target.value }));
      }
      if (e.target.value == "") {
        dispatch(viderChampsClientInfo());
      }
      // * on va récuperer les informations de client
      // * à partir de son code
      if (
        colonne == "code" &&
        e.target.value != "" &&
        e.target.value.length == 8 &&
        !isNaN(e.target.value)
      ) {
        dispatch(getClientParCode(e.target.value));
      }
    };
  
    const handleCinChange = (e, colonne) => {
      if (isNumerique(e.target.value)) {
        dispatch(setClientInfos({ colonne: colonne, valeur: e.target.value }));
      }
    };
    const handleChangeAlphaphetique = (e, colonne) => {
      if (isAlphabetique(e.target.value)) {
        dispatch(setClientInfos({ colonne: colonne, valeur: e.target.value }));
      }
    };
    const handleChangeAlphaNumerique = (e, colonne) => {
      if (isNaN(e.target.value)) {
        dispatch(setClientInfos({ colonne: colonne, valeur: e.target.value }));
      }
    };
    const CpostaleInfo = useSelector(
      (state) => state.codePostaleSlice.CpostaleInfo
    );
    const RegionInfo = useSelector((state) => state.regionSlice.RegionInfo);
    const secteurInfo = useSelector((state) => state.secteurSlice.secteurInfo);
    const toolbarTable = useSelector(
      (state) => state.interfaceSlice.toolbarTable
    );
  
    const hundleClickButtonSecRegCp = (colonne) => {
      dispatch(setToolbarTable(colonne));
  
      dispatch(setAfficherSecteurPopup(true));
    };
  
    const nav = useNavigate();
    const handleAjoutTypeSecteur = () => {
      nav("/SecteurForm");
    };
    const nombredevis = useSelector((state) => state.devisSlice.nombreDeDevis);
    const totalchifre = useSelector((state) => state.devisSlice.totalchifre);
  
    const afficherRecherchePopup = () => {
      dispatch(setAfficherRecherchePopup(true));
    };
  return (
    <>
      <div>
        <SideBar />
        <div
          className={`main ${ouvrireMenuDrawer ? "active" : ""} bg-base-100`}
        >
          <ToolBar />
          <div className="container mx-auto px-4 py-6 ">
            <div>
              {/* <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(8, 9, 14)",
                  fontWeight: "bold",
                }}
                className="text-3xl"
              >
                t
              </h2>Fiche clien
            </div> */}
              <div className="bg-base-100">
                <h2 className="text-3xl font-bold text-blue-900 italic">
                  Fiche Client
                </h2>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Code Client
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    list="listeCodesClients"
                    value={clientInfos.code !== "" ? clientInfos.code : ""}
                    onChange={(e) => handleChangeCodeClient(e, "code")}
                    readOnly={true}
                    maxLength={8}
                    onClick={() => {
                      if (toolbarMode != "ajout") {
                        afficherRecherchePopup();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type Client
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                  >
                    <option value={clientInfos.typecli || ""}>LOCAL</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    CIN
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.cin || ""}
                    onChange={(e) => handleCinChange(e, "cin")}
                    disabled={!activerChampsForm}
                    maxLength={8}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label
                  className="font-bold  pt-3 pb-3"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Raison Sociale
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.rsoc || ""}
                  onChange={(e) => handleChangeAlphaphetique(e, "rsoc")}
                  disabled={!activerChampsForm}
                />
              </div>
              <div className="collapse bg-base-100 border-base-300 border mt-3">
                <input type="checkbox" />
                <div
                  className="collapse-title font-semibold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Informations client supplementaires
                </div>
                <div className="collapse-content text-sm">
                  <div className="flex flex-col w-full mb-5">
                    <label
                      className="font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Adresee
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      value={clientInfos.adresse || ""}
                      onChange={(e) => handleChangeAlphaNumerique(e, "adresse")}
                      disabled={!activerChampsForm}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {/* Champ P. Vente */}
                    <div className="flex flex-col w-full sm:w-1/3">
                      <label className="font-bold text-sm text-[rgb(48,60,123)] mb-1">
                        P. Vente
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={clientInfos.codepv}
                          list="listePointVente"
                          onChange={(e) => handleChange(e, "codepv")}
                          disabled={!activerChampsForm}
                        />
                      </div>
                      <datalist id="listePointVente">
                        {listeCodespointVente.length > 0 ? (
                          listeCodespointVente.map((pointvente, indice) => (
                            <option key={indice} value={pointvente.Code}>
                              {pointvente.Code}
                            </option>
                          ))
                        ) : (
                          <option disabled>Aucun client trouvé</option>
                        )}
                      </datalist>
                    </div>

                    {/* Champ Libelle P. Vente */}
                    <div className="flex flex-col w-full sm:w-1/2">
                      <label className="font-bold text-sm text-[rgb(48,60,123)] mb-1">
                        Libellé P. Vente
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          disabled={!activerChampsForm}
                          value={clientInfos.codepv || ""}
                          onChange={(e) => handleChange(e, "Libelle")}
                        />
                        {(toolbarMode === "ajout" ||
                          toolbarMode === "modification") && (
                          <button
                            type="button"
                            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                            onClick={() =>
                              hundleClickButtonSecRegCp("pointvente")
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-0">
                    <label
                      className="font-bold pt-3 pb-3"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Activite
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      value={clientInfos.activite || ""}
                      onChange={(e) => handleChangeAlphaphetique(e, "activite")}
                      disabled={!activerChampsForm}
                    />
                  </div>

                  <div className="mt-3 flex flex-col">
                    <div className="flex flex-col w-full">
                      <label
                        className="font-bold pt-3 pb-3"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Nature
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        value={clientInfos.nature || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "nature")}
                        disabled={!activerChampsForm}
                      />
                    </div>

                    <div className="flex flex-wrap gap-0">
                      {/* Champ Code Postal */}
                      <div className="flex flex-col w-1/3">
                        <label
                          className="font-bold  pt-3 pb-3"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          C. Postal
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={clientInfos.cp}
                            list="listeCodesPosteaux"
                            onChange={(e) => handleChangeCodePostal(e)}
                            disabled={!activerChampsForm}
                          />
                        </div>

                        <datalist id="listeCodesPosteaux">
                          {listeToutCodesPosteaux.length > 0 ? (
                            listeToutCodesPosteaux.map((cp, indice) => (
                              <option key={indice} value={cp.CODEp}>
                                {cp.CODE}
                              </option>
                            ))
                          ) : (
                            <option disabled>Aucun client trouvé</option>
                          )}
                        </datalist>
                      </div>

                      {/* Champ Ville + bouton */}
                      <div className="flex flex-col w-2/3">
                        <label
                          className="font-bold  pt-3 pb-3"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          Désignation code postal
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={clientInfos.desicp}
                            onChange={(e) => handleChange(e, "desicp")}
                            disabled={!activerChampsForm}
                          />
                          {(toolbarMode == "ajout" ||
                            toolbarMode == "modification") && (
                            <button
                              type="button"
                              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                              // disabled={!activerChampsForm}
                              onClick={() =>
                                hundleClickButtonSecRegCp("codepostale")
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-0">
                      {/* Champ Secteur */}
                      <div className="flex flex-col w-1/3">
                        <label
                          className="font-bold  pt-3 pb-3"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          Secteur
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2"
                          value={clientInfos.codes}
                          disabled={!activerChampsForm}
                          list="listeCodesSecteur"
                          onChange={(e) => handleSecteurChange(e)}
                        />
                        <datalist id="listeCodesSecteur">
                          {listeCodesSecteur.length > 0 ? (
                            listeCodesSecteur.map((secteur, indice) => (
                              <option key={indice} value={secteur.codesec}>
                                {secteur.codesec}
                              </option>
                            ))
                          ) : (
                            <option disabled>Aucun secteur trouvé</option>
                          )}
                        </datalist>
                      </div>

                      {/* Champ Type Secteur + bouton */}
                      <div className="flex flex-col w-2/3">
                        <label
                          className="font-bold  pt-3 pb-3"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          Désignation secteur
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={clientInfos.desisec}
                            onChange={(e) => handleChange(e, "desisec")}
                            disabled={!activerChampsForm}
                          />

                          {(toolbarMode == "ajout" ||
                            toolbarMode == "modification") && (
                            <button
                              type="button"
                              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                              // disabled={!activerChampsForm}
                              onClick={() =>
                                hundleClickButtonSecRegCp("secteur")
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-0">
                      {/* Champ Région */}
                      <div className="flex flex-col w-1/3">
                        <label
                          className="font-bold  pt-3 pb-3"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          Région
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2"
                          disabled={!activerChampsForm}
                          list="listeCodesRegion"
                          value={clientInfos.coder}
                          onChange={(e) => hundleRegionChange(e)}
                        />
                        <datalist id="listeCodesRegion">
                          {listeCodesRegion.length > 0 ? (
                            listeCodesRegion.map((region, indice) => (
                              <option key={indice} value={region.codergg}>
                                {region.codergg}
                              </option>
                            ))
                          ) : (
                            <option disabled>Aucune région trouvée</option>
                          )}
                        </datalist>
                      </div>

                      {/* Champ Type Région + bouton */}
                      <div className="flex flex-col w-2/3">
                        <label
                          className="font-bold  pt-3 pb-3"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          Ville
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            disabled={!activerChampsForm}
                            value={clientInfos.desireg || clientInfos.desirgg}
                            onChange={(e) => handleChange(e, "desirgg")}
                          />
                          {(toolbarMode == "ajout" ||
                            toolbarMode == "modification") && (
                            <button
                              type="button"
                              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                              // disabled={!activerChampsForm}
                              onClick={() =>
                                hundleClickButtonSecRegCp("region")
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test1;
