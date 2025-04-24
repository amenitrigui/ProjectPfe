import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getNombreTotalDevis,
  getTotalChiffres,
} from "../../app/devis_slices/devisSlice";

import { setDevisInfo } from "../../app/devis_slices/devisSlice";
import {
  getClientParCode,
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
  getListeCodesPosteaux,
  getListeCodesSecteur,
  getDesignationSecteurparCodeSecteur,
  getListeCodeRegions,
  getVilleParRegion,
  getDerniereCodeClient,
} from "../../app/client_slices/clientSlice";

import ToolBar from "../Common/ToolBar";
import { isAlphabetique, isNumerique } from "../../utils/validations";
import {
  setActiverBoutonsValiderAnnuler,
  setActiverChampsForm,
  setAfficherRecherchePopup,
  setAfficherSecteurPopup,
  setToolbarMode,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import SideBar from "../Common/SideBar";
import DetailsBanqueClient from "./DetailsBanqueClient";
import DateCreateMAJ from "../Common/DateCreateMAJ";
import ParametresFacturationClient from "./ParametresFacturationClient";

const ClientForm = () => {
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
  const dispatch = useDispatch();
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  useEffect(() => {
    dispatch(getListeCodesPosteaux());
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
    dispatch(getListeCodesSecteur());
    dispatch(getListeCodeRegions());
    dispatch(getDerniereCodeClient());
  }, []);

  useEffect(() => {
    if (dernierCodeClient && dernierCodeClient !== "") {
      dispatch(setClientInfos({ colonne: "code", valeur: dernierCodeClient }));
    }
  }, [dernierCodeClient]);

  useEffect(() => {
    if (
      clientInfos &&
      clientInfos.code &&
      clientInfos.code != "" &&
      clientInfos.code != (parseInt(dernierCodeClient) + 1).toString()
    ) {
      dispatch(getClientParCode(clientInfos.code));
    }
  }, [clientInfos.code]);

  useEffect(() => {
    if (toolbarMode === "consultation") {
      dispatch(getClientParCode(parseInt(dernierCodeClient) + 1));
    }
    if (toolbarMode === "ajout") {
      dispatch(
        setClientInfos({
          colonne: "code",
          valeur: (parseInt(dernierCodeClient) + 1).toString(),
        })
      );
    }
  }, [toolbarMode]);

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
    dispatch(setToolbarTable(colonne))
    
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
  useEffect(() => {
    if (insertionDepuisDevisForm === true) {
      dispatch(setToolbarMode("ajout"));
      dispatch(setToolbarTable("client"));
      dispatch(setActiverChampsForm(true));
      dispatch(setActiverBoutonsValiderAnnuler(true));
    }
  }, [insertionDepuisDevisForm]);

  useEffect(() => {
    console.log(toolbarTable)
  },[toolbarTable])
  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <ToolBar />
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(8, 9, 14)",
                  fontWeight: "bold",
                }}
                className="text-3xl"
              >
                Fiche client
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
                  // disabled={activerChampsForm}
                  maxLength={8}
                  onClick={() => afficherRecherchePopup()}
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
                <div className="flex flex-wrap gap-0">
                  <div className="flex flex-col w-1/3">
                    <label
                      className="font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      P. Vente
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      value={clientInfos.codepv || ""}
                      onChange={(e) => handleChange(e, "codepv")} //codpv
                    />
                  </div>
                  <div className="flex flex-col w-2/3">
                    <label
                      className="font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Libelle P. Vente
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        disabled={!activerChampsForm}
                        value={clientInfos.Libelle || ""}
                        onChange={(e) => handleChange(e, "Libelle")}
                      />
                      {(toolbarMode == "ajout" ||
                        toolbarMode == "modification") && (
                        <button
                          type="button"
                          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                          // disabled={!activerChampsForm}
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
                          value={
                            toolbarMode === "consultation"
                              ? clientInfos.cp
                              : toolbarTable === "codepostale"
                              ? CpostaleInfo.CODEp
                              : ""
                          }
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
                          value={
                            toolbarMode === "consultation"
                              ? clientInfos.desicp
                              : toolbarTable === "codepostale"
                              ? CpostaleInfo.desicp
                              : ""
                          }
                          onChange={(e) => handleChange(e, "ville")}
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
                        valeur={clientInfos.codes !== "" ?clientInfos.codes : ""}
                        disabled={!activerChampsForm}
                        value={
                          toolbarMode === "consultation"
                            ? clientInfos.codesec
                            : toolbarTable === "secteur"
                            ? secteurInfo.codesec
                            : ""
                        }
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
                          disabled={!activerChampsForm}
                          value={
                            toolbarMode === "consultation"
                              ? clientInfos.desisec
                              : toolbarTable === "secteur"
                              ? secteurInfo.desisec
                              : ""
                          }
                        />

                        {(toolbarMode == "ajout" ||
                          toolbarMode == "modification") && (
                          <button
                            type="button"
                            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                            // disabled={!activerChampsForm}
                            onClick={() => hundleClickButtonSecRegCp("secteur")}
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
                        valeur={clientInfos.coder !== "" ? clientInfos.coder : ""}
                        className="border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        list="listeCodesRegion"
                        value={
                          toolbarMode === "consultation"
                            ? clientInfos.codergg
                            : toolbarTable === "region"
                            ? RegionInfo.codergg
                            : ""
                        }
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
                        Désignation région
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          disabled={!activerChampsForm}
                          value={
                            toolbarMode === "consultation"
                              ? clientInfos.desirgg
                              : toolbarTable === "region"
                              ? RegionInfo.desirgg
                              : ""
                          }
                        />
                        {(toolbarMode == "ajout" ||
                          toolbarMode == "modification") && (
                          <button
                            type="button"
                            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                            // disabled={!activerChampsForm}
                            onClick={() => hundleClickButtonSecRegCp("region")}
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

          <div className="recentCustomers">
            <div className="card rounded-box  space-y-2">
              <h2
                style={{
                  color: "rgb(8, 9, 14)",
                  fontWeight: "bold",
                }}
                className="text-xxl"
              >
                Paramètre de facturation
              </h2>

              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Tel 1
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.tel1 || ""}
                      onChange={(e) => handleChangeTel(e, "tel1")}
                    disabled={!activerChampsForm}
                    maxLength={8}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Tel 2
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.tel2 || ""}
                     onChange={(e) => handleChangeTel(e, "tel2")}
                    disabled={!activerChampsForm}
                    maxLength={8}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mt-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.email || ""}
                    onChange={(e) => handleChange(e, "email")}
                    disabled={!activerChampsForm}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold  mt-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Fax
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.fax || ""}
                     onChange={(e) => handleChangeFax(e, "fax")}
                    disabled={!activerChampsForm}
                    minLength={6}
                    maxLength={9}
                  />
                </div>
              </div>
            </div>
            <div className="collapse bg-base-100 border-base-300 border mt-6">
              <input type="checkbox" />
              <div
                className="collapse-title font-semibold "
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Liste client A bloquer
              </div>

              <div className="collapse-content text-sm">
                <ParametresFacturationClient />
              <DateCreateMAJ objet={clientInfos} />
              </div>
            </div>
          </div>
        </div>
        {/* 2eme whada */}
        <div className="details">
          <div className="banquedetails">
            <div className="collapse bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <div
                className="collapse-title font-semibold mb-1"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Banque
              </div>
              <div className="collapse-content text-sm">
                <DetailsBanqueClient />
              </div>
            </div>

         
          </div>
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
};

export default ClientForm;
