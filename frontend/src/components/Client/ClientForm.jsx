import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt,FaRegUserCircle } from "react-icons/fa";

import {
  getNombreTotalDevis,
  getTotalChiffres,
} from "../../app/devis_slices/devisSlice";

import { setDevisInfo } from "../../app/devis_slices/devisSlice";
import {
  getClientParCode,
  getVilleParCodePostal,
  getToutCodesClient,
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
import { setAfficherRecherchePopup, setOuvrireDrawerMenu } from "../../app/interface_slices/uiSlice";
import SideBar from "../Common/SideBar";

const ClientForm = () => {
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector((state) => state.uiStates.ouvrireMenuDrawer);
  // * pour afficher le menu déroulante pour l'avatar
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListeCodesPosteaux());
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
    dispatch(getListeCodesSecteur());
    dispatch(getListeCodeRegions());
  }, []);

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);

  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  const listeCodesRegion = useSelector(
    (state) => state.ClientCrud.listeCodesRegion
  );
  // state pour désactiver/activer les champs lors de changement de modes editables (ajout/modification)
  // vers le mode de consultation respectivement
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );

  // Sélection du booléen pour détecter si l'insertion est faite depuis le formulaire de devis
  const insertionDepuisDevisForm = useSelector(
    (state) => state.ClientCrud.insertionDepuisDevisForm
  );

  const listeToutCodesPosteaux = useSelector(
    (state) => state.ClientCrud.listeToutCodesPosteaux
  );
  const listeCodesSecteur = useSelector(
    (state) => state.ClientCrud.listeCodesSecteur
  );
  
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  
  const handleChangeCheckbox = (e, colonne) => {
    console.log(e.target.checked," ", colonne)
    if(toolbarMode == "ajout" || toolbarMode == "modification") {
      dispatch(setClientInfos({colonne: colonne, valeur: e.target.checked ? "O" : "N"}))
    }
  }

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
  const handleChangeRib = (e, colonne) => {
    if (isNumerique(e.target.value)) {
      dispatch(setClientInfos({ colonne: "compteb", valeur: e.target.value }));
    }
    if (e.target.value == "") {
      dispatch(setClientInfos({ colonne: "compteb", valeur: "" }));
    }
  };
  const handleChangeNom = (e, colonne) => {
    dispatch(setClientInfos({ colonne: "banque", valeur: e.target.value }));
    if (e.target.value == "") {
      dispatch(setClientInfos({ colonne: "banque", valeur: "" }));
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
    if (isNumerique(e.target.value))
    {
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

  const handleChangeNumDecision = (e, colonne) => {
    if (isNumerique(e.target.value))
      dispatch(setClientInfos({ colonne: "decision", valeur: e.target.value }));
  };
  const hundleSelectTous = (e, champ) => {
    dispatch(setClientInfos({ colonne: champ, valeur: e.target.value }));
  };

  const nombredevis = useSelector((state) => state.DevisCrud.nombreDeDevis);
  const totalchifre = useSelector((state) => state.DevisCrud.totalchifre);

  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true))
  }

  // Fonction pour basculer la visibilité de la sidebar
  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };
  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <ToolBar></ToolBar>

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
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
                  <Link to="/UtilisateurFormTout" className="flex items-center w-full">

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
          <div className="recentOrders gap-y-0.5">
            <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(48, 60, 123)",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                className="text-3xl"
              >
                Client
              </h2>
              <a href="#" className="btn">
                View All
              </a>
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
                  onClick = {() => afficherRecherchePopup()}
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
                    // value={clientInfos.cltexport || ""}
                    // onChange={(e) => handleChange(e, "cltexport")} codpv
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type P. Vente
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    // code pv
                  />
                </div>
                <div className="flex flex-col w-1/7">
                  <label className="font-medium mb-5"></label>
                  <button className="btn" disabled={!activerChampsForm}>
                    PV
                  </button>
                </div>
              </div>

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
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    C. Postal
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.cp || ""}
                    list="listeCodesPosteaux"
                    onChange={(e) => handleChangeCodePostal(e)}
                    disabled={!activerChampsForm}
                  />

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
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.desicp || ""}
                    onChange={(e) => handleChange(e, "ville")}
                    disabled={!activerChampsForm}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-0">
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
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type Secteur
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={clientInfos.desisec}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-0">
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
                    // table region
                  />
                  <datalist id="listeCodesRegion">
                    {listeCodesRegion.length > 0 ? (
                      listeCodesRegion.map((region, indice) => (
                        <option key={indice} value={region.codergg}>
                          {region.codergg}
                        </option>
                      ))
                    ) : (
                      <option disabled>Aucun region trouvé</option>
                    )}
                  </datalist>
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type Région
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={clientInfos.desirgg}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Paramettre de fACTURATION</h2>
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
                        value={clientInfos.Nom1 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "Nom1")}
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
                        value={clientInfos.Nom2 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "Nom2")}
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
                        value={clientInfos.Nom3 || ""}
                        onChange={(e) => handleChangeAlphaphetique(e, "Nom3")}
                        disabled={!activerChampsForm}
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
                    onChange={(e)=>hundleSelectTous(e,"tarif")}
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
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Banque</h2>
            </div>
            <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-nowrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="block font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={clientInfos.banque || ""}
                    onChange={(e) => handleChangeNom(e, "banque")}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="block font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Rib
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={clientInfos.compteb || ""}
                    onChange={(e) => handleChangeRib(e, "compteb")}
                    maxLength={20}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <label
                    className="block"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Matricules fiscales
                  </label>

                  <input
                    type="text"
                    className=" border border-gray-300 rounded-md p-2 "
                    value={clientInfos.matriculef || ""}
                    onChange={(e) =>
                      handleChangeAlphaNumerique(e, "matriculef")
                    }
                    disabled={!activerChampsForm}
                    maxLength={17}
                  />

                  <label
                    className="block"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Numero de desicion
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 "
                    value={clientInfos.decision || ""}
                    onChange={(e) => handleChangeNumDecision(e, "decision")}
                    disabled={!activerChampsForm}
                    maxLength={12}
                  />
                  <label
                    className="block"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date deb Autorisation:
                  </label>

                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 "
                    value={clientInfos.datedebaut || ""}
                    onChange={(e) => handleChange(e, "datedebaut")}
                    disabled={!activerChampsForm}
                  />

                  <label
                    className="block"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date fin Autorisation:
                  </label>

                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 "
                    value={clientInfos.datefinaut || ""}
                    onChange={(e) => handleChange(e, "datefinaut")}
                    disabled={!activerChampsForm}
                  />
                  <div className="flex flex-nowrap">
                    <input
                      type="checkbox"
                      className="border border-gray-300 rounded-md p-2"
                      checked={
                        (toolbarMode == "consultation" || toolbarMode == "modification")  && (clientInfos.fidel && clientInfos.fidel?.toUpperCase() !== "N")
                      }
                      onChange={(e) => handleChangeCheckbox(e, "fidel")}
                      disabled={!activerChampsForm}
                    />

                    <label
                      className="block"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Fidele
                    </label>

                    <input
                      type="checkbox"
                      className="border border-gray-300 rounded-md p-2 "
                      disabled={!activerChampsForm}
                      checked={
                      (toolbarMode == "consultation" || toolbarMode == "modification")  && (clientInfos.ptva && clientInfos.ptva?.toUpperCase() !== "N") 
                      }
                      onChange={(e) => handleChangeCheckbox(e, "ptva")}
                    />
                    <label
                      className="block"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Autre Tva
                    </label>
                  </div>
                  <div className="flex flex-nowrap">
                    <select
                      className="border border-gray-300 rounded-md w-1/3 p-2"
                      disabled={!activerChampsForm}
                      onChange={(e) => hundleSelectTous(e, "susptva")}
                    >
                      <option>O</option>
                      <option>N</option>
                    </select>
                    <label
                      className="block mt-2"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Suspendu du TVA
                    </label>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 p-8  gap-10 ">
                  {/* Ligne 1 */}
                  <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <div className="flex items-center space-x-2 w-full md:w-1/2">
                      <input
                        type="checkbox"
                        checked={
                          (toolbarMode === "consultation" || toolbarMode == "modification")  && (clientInfos.majotva && clientInfos.majotva?.toUpperCase() !== "N")
                        }
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChangeCheckbox(e, "majotva")}
                        disabled={!activerChampsForm}
                      />
                      <label className="text-blue-900">Majoration de TVA</label>
                    </div>

                    <div className="flex items-center space-x-2 w-full md:w-1/2">
                      <input
                        checked={
                          (toolbarMode == "consultation" || toolbarMode == "modification")  && (clientInfos.exon && clientInfos.exon?.toUpperCase() !== "N")
                        }
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChangeCheckbox(e, "exon")}
                        disabled={!activerChampsForm}
                      />
                      <label className="text-blue-900">Exonore de TVA</label>
                    </div>
                  </div>

                  {/* Ligne 2 */}
                  <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <div className="flex items-center space-x-2 w-full md:w-1/2">
                      <input
                        disabled={!activerChampsForm}
                        checked={
                          (toolbarMode == "consultation" || toolbarMode == "modification")  && (clientInfos.regime && clientInfos.regime?.toUpperCase() !== "N")
                        }
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChangeCheckbox(e, "regime")}
                      />
                      <label className="text-blue-900">Regime réel</label>
                    </div>

                    <div className="flex items-center space-x-2 w-full md:w-1/2">
                      <input
                        disabled={!activerChampsForm}
                        type="checkbox"
                        checked={
                          (toolbarMode == "consultation" || toolbarMode == "modification")  && (clientInfos.suspfodec && clientInfos.suspfodec?.toUpperCase() !== "N")
                        }
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChangeCheckbox(e, "suspfodec")}
                      />
                      <label className="text-blue-900">Suspendu FODEK</label>
                    </div>
                  </div>

                  {/* Ligne 3 */}
                  <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <div className="flex items-center space-x-2 w-full md:w-1/2">
                      <input
                        type="checkbox"
                        disabled={!activerChampsForm}
                        checked={(toolbarMode == "consultation" || toolbarMode == "modification") && (clientInfos.cltexport && clientInfos.cltexport.toUpperCase() !== "N")}
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChangeCheckbox(e, "cltexport")}
                      />
                      <label className="text-blue-900">Client à l'export</label>
                    </div>

                    <div className="flex items-center space-x-2 w-full md:w-1/2">
                      <input
                        type="checkbox"
                        disabled={!activerChampsForm}
                        checked={(toolbarMode == "consultation" || toolbarMode == "modification") && (clientInfos.timbref && clientInfos.timbref?.toUpperCase() !== "N")}
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChangeCheckbox(e, "timbref")}
                      />
                      <label className="text-blue-900">Timbre fiscal</label>
                    </div>
                  </div>

                  {/* Ligne 4 - Unique */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled={!activerChampsForm}
                      checked={(toolbarMode == "consultation" || toolbarMode == "modification") && (clientInfos.offretick && clientInfos.offretick?.toUpperCase() !== "N")}
                      className="border border-gray-300 rounded-md"
                      onChange={(e) => handleChangeCheckbox(e, "offretick")}
                    />
                    <label className="text-blue-900">
                      Fact ticket de caisse
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="card rounded-box p-6 space-y-2">
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
                      clientInfos.usera ||
                      infosUtilisateur.codeuser + " // " + infosUtilisateur.nom
                    }
                    onChange={(e) => handleChange(e, "usera")}
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
                    value={clientInfos.userm || ""}
                    onChange={(e) => handleChange(e, "userm")}
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
                    type="date"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    value={clientInfos.datemaj || ""}
                    onChange={(e) => handleChange(e, "datemaj")}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="block font-bold text-center"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  commentaire
                </label>

                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  cols={33}
                  rows={7}
                  value={clientInfos.Commentaire || ""}
                  onChange={(e) => handleChange(e, "Commentaire")}
                  disabled={!activerChampsForm}
                />
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
