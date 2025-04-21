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

const ClientForm = () => {
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  // * pour afficher le menu déroulante pour l'avatar
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListeCodesPosteaux());
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
    dispatch(getListeCodesSecteur());
    dispatch(getListeCodeRegions());
  }, []);

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );

  const infosUtilisateur = useSelector(
    (state) => state.utilisateurSlice.infosUtilisateur
  );
  const listeCodesRegion = useSelector(
    (state) => state.clientSlice.listeCodesRegion
  );
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

  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e, colonne) => {
    // * si aucun code client est selectionné
    // * vider les champs
    if (e.target.value == "") {
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
    if (e.target.value.length == 3) {
      dispatch(getDesignationSecteurparCodeSecteur(e.target.value));
    }
    if (e.target.value == "") {
      dispatch(setClientInfos({ colonne: "desisec", valeur: "" }));
    }
  };
  const hundleRegionChange = (e) => {
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

  const handleChangeFax = (e, colonne) => {
    if (!isNaN(e.target.value)) {
      dispatch(setClientInfos({ colonne: "fax", valeur: e.target.value }));
    }
    if (e.target.value == "") {
      dispatch(setClientInfos({ colonne: "fax", valeur: "" }));
    }
  };

  const handleCinChange = (e, colonne) => {
    if (isNumerique(e.target.value)) {
      dispatch(setClientInfos({ colonne: colonne, valeur: e.target.value }));
    }
  };

  const handleChangeTel = (e, colonne) => {
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
  const handleChangeNumeriqueDouble = (e, colonne) => {
    if (!isNaN(parseFloat(e.target.value))) {
      dispatch(setClientInfos({ colonne: colonne, valeur: e.target.value }));
    }
  };
  const hundleSelectTous = (e, champ) => {
    dispatch(setClientInfos({ colonne: champ, valeur: e.target.value }));
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
  return (
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
          <div className="recentOrders">
            <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(48, 60, 123)",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                className="text-3xl"
              >
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
                  value={clientInfos.code || ""}
                  onChange={(e) => handleChangeCodeClient(e, "code")}
                  disabled={activerChampsForm}
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
                className="font-bold mb-1"
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
            <div className="collapse bg-base-100 border-base-300 border">
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
                  <div className="flex flex-col w-1/2">
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
                  <div className="flex flex-col w-1/3">
                    <label
                      className="font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Libelle P. Vente
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      value={clientInfos.Libelle || ""}
                      onChange = {(e) => handleChange(e, "Libelle")}
                    />
                  </div>
                  <div className="flex flex-col w-1/7">
                    <label className="font-medium mb-5"></label>
                    <button className="btn" disabled={!activerChampsForm}>
                      PV
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-0">
                  <label
                    className="font-bold mb-1"
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
                      className="font-bold mb-1"
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
                        className="font-bold mb-1"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        C. Postal
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={clientInfos.cp || ""}
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
                        className="font-bold mb-1"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Ville
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={clientInfos.desicp || ""}
                          onChange={(e) => handleChange(e, "ville")}
                          disabled={!activerChampsForm}
                        />
                        <button
                          type="button"
                          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                          //  onClick={handleAjoutVille}
                          disabled={!activerChampsForm}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-0">
                    {/* Champ Secteur */}
                    <div className="flex flex-col w-1/3">
                      <label
                        className="font-bold mb-1"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Secteur
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        list="listeCodesSecteur"
                        onChange={(e) => handleSecteurChange(e)} // colonone : codes
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
                        className="font-bold mb-1"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Libelle Secteur
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          disabled={!activerChampsForm}
                          value={clientInfos.desisec}
                          onChange = {(e) => handleChange(e, "desisec")}
                        />

                        <button
                          type="button"
                          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                          // disabled={!activerChampsForm}
                          onClick={() =>
                            dispatch(setAfficherSecteurPopup(true))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-0">
                    {/* Champ Région */}
                    <div className="flex flex-col w-1/3">
                      <label
                        className="font-bold mb-1"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Région
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        disabled={!activerChampsForm}
                        list="listeCodesRegion"
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
                    {/* à vérifier : nom de colonne value */}
                    <div className="flex flex-col w-2/3">
                      <label
                        className="font-bold mb-1"
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Libelle Région
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          disabled={!activerChampsForm}
                          value={clientInfos.desirgg}
                          onChange={(e) => handleChange(e, "desirgg")}
                        />
                        <button
                          type="button"
                          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                          //xxxxxxxxonClick={handleAjoutTypeRegion}
                          disabled={!activerChampsForm}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>PARAMETRES DE FACTURATION</h2>
            </div>
            <div className="card rounded-box p-6 space-y-2">
              {/* Conteneur pour Code Client, Type Client et CIN */}
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
                    className="font-bold mb-1"
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
                    className="font-bold mb-1"
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

              <div className="flex flex-cols">
                <button className="btn" disabled={activerChampsForm}>
                  Liste clients bloquer
                </button>
              </div>

              <table className="table table-xl w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th
                      className="w-1/4 text-lg font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Nom
                    </th>
                    <th
                      className="w-1/4 text-lg font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Titre
                    </th>
                    <th
                      className="w-1/4 text-lg font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      GSM
                    </th>
                    <th
                      className="w-1/4 text-lg font-bold mb-1"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      N°Poste
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.nom1 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "nom1")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.titre1 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "titre1")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.gsm1 || ""}
                        onChange={(e) => handleChangeTel(e, "gsm1")}
                        disabled={!activerChampsForm}
                        maxLength={8}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.nposte1 || ""}
                        onChange={(e) => handleChange(e, "nposte1")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.nom2 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "nom2")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.titre2 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "titre2")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.gsm2 || ""}
                        onChange={(e) => handleChangeTel(e, "gsm2")}
                        disabled={!activerChampsForm}
                        maxLength={8}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.nposte2 || ""}
                        onChange={(e) => handleChange(e, "nposte2")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        disabled={!activerChampsForm}
                        value={clientInfos.nom3 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "nom3")}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        disabled={!activerChampsForm}
                        value={clientInfos.titre3 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "titre3")}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.gsm3 || ""}
                        onChange={(e) => handleChangeTel(e, "gsm3")}
                        disabled={!activerChampsForm}
                        maxLength={8}
                      />
                    </td>
                    <td className="w-1/4">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={clientInfos.nposte3 || ""}
                        onChange={(e) => handleChange(e, "nposte3")}
                        disabled={!activerChampsForm}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full min-w-md">
              <div className="flex flex-nowrap">
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Tarif
                  </label>

                  <select
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    onChange={(e) => hundleSelectTous(e, "tarif")}
                  >
                    <option value="prix1">prix1</option>
                    <option value="prix2">prix2</option>
                    <option value="prix3">prix3</option>
                    <option value="prix4">prix4</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  className="font-bold"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Remise max
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.remise || ""}
                  onChange={(e) => handleChangeNumeriqueDouble(e, "remise")}
                  disabled={!activerChampsForm}
                  maxLength={3}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="font-bold"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Seuil crédit
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.scredit || ""}
                  onChange={(e) => handleChangeNumeriqueDouble(e, "scredit")}
                  disabled={!activerChampsForm}
                  maxLength={3}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="font-bold"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Seuil Risque
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.srisque || ""}
                  onChange={(e) => handleChangeNumeriqueDouble(e, "srisque")}
                  disabled={!activerChampsForm}
                  maxLength={3}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="font-bold"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Référence
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.reference || ""}
                  onChange={(e) => handleChangeAlphaNumerique(e, "reference")}
                  disabled={!activerChampsForm}
                  maxLength={11}
                />
              </div>

              <div className="flex flex-nowrap space-x-20">
                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Blockage
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-11/12"
                    disabled={!activerChampsForm}
                    onChange={(e) => {
                      hundleSelectTous(e, "blockage");
                    }}
                  >
                    <option value="O">O</option>
                    <option value="N">N</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Contrat
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-11/12"
                    disabled={!activerChampsForm}
                    onChange={(e) => {
                      hundleSelectTous(e, "Contrat");
                    }}
                  >
                    <option value="O">O</option>
                    <option value="N">N</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2eme whada */}
        <div className="details">
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

          <div className="recentCustomers">
            <div className="collapse bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <div
                className="collapse-title font-semibold mb-1"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Date de création et modification
              </div>
              <div className="collapse-content text-sm">
                <DateCreateMAJ />
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
