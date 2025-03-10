import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setDevisInfo } from "../../app/devis_slices/devisSlice";
import {
  getClientParCode,
  getToutCodesClient,
  setClientInfos,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";

function ClientForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToutCodesClient());
  }, []);

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  console.log(clientInfos);

  const infosUtilisateur = useSelector((state) => state.UtilisateurInfo.infosUtilisateur);

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
    dispatch(setClientInfos({ colonne, valeur: e.target.value }));
    if (insertionDepuisDevisForm) {
      dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
    }
  };
  // ! hateful fields : Exonore de tva, client a l'expert, autre tva, fidele
  console.log(clientInfos.code);
  return (
    <>
      <form className="grid grid-cols-1 space-y-2 items-center bg-base-300">
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2">
            {/* Conteneur pour Code Client, Type Client et CIN */}

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
                  list="browsers"
                  value={clientInfos.code || ""}
                  onChange={(e) => handleChange(e, "code")}
                  disabled={activerChampsForm}
                />
                <datalist id="browsers">
                  {listeToutCodesClients.length > 0 ? (
                    listeToutCodesClients.map((client, indice) => (
                      <option key={indice} value={client.code}>
                        {client.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun client trouvé</option>
                  )}
                </datalist>
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
                  onChange={(e) => handleChange(e, "cin")}
                  disabled={!activerChampsForm}
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
                onChange={(e) => handleChange(e, "rsoc")}
                disabled={!activerChampsForm}
              />
            </div>
            <div className="flex flex-col w-full">
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
                onChange={(e) => handleChange(e, "adresse")}
                disabled={!activerChampsForm}
              />
            </div>
            <div className="flex flex-col w-full">
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
                onChange={(e) => handleChange(e, "activite")}
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
                  onChange={(e) => handleChange(e, "nature")}
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
                    onChange={(e) => handleChange(e, "cp")}
                    disabled={!activerChampsForm}
                  />
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
                    value={clientInfos.ville || ""}
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
                    // value={clientInfos.secteur.codesec || ""}
                    // onChange={(e) => handleChange(e, "codesec")} ///table secteur
                  />
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
                    // table region
                  />
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
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="divider lg:divider-horizontal" /> */}

          <div className="card bg-base-300 rounded-box p-6 w-1/2 space-y-2">
            <div className="flex flex-col items-end">
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-1/3"
                disabled={!activerChampsForm}
              />
            </div>
            <div className="flex flex-col items-center">
              <button className="btn" disabled={activerChampsForm}>
                Liste des affaires
              </button>
            </div>

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
                  onChange={(e) => handleChange(e, "tel1")}
                  disabled={!activerChampsForm}
                />
              </div>
              <div className="flex flex-col w-1/3">
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
                  onChange={(e) => handleChange(e, "tel2")}
                  disabled={!activerChampsForm}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Télex
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.telex || ""}
                  onChange={(e) => handleChange(e, "telex")}
                  disabled={!activerChampsForm}
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
                  type="text"
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
                  onChange={(e) => handleChange(e, "fax")}
                  disabled={!activerChampsForm}
                />
              </div>
            </div>
            <div className="flex flex-nowrap">
              <div className="flex flex-col w-1/4">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Fournisseur
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                  //mafamech
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label className="font-medium mb-7"></label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Représentant
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={clientInfos.desrep || ""}
                  onChange={(e) => handleChange(e, "desrep")}
                  disabled={!activerChampsForm}
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label className="font-medium mb-7"></label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
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
                      onChange={(e) => handleChange(e, "Nom1")}
                      disabled={!activerChampsForm}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={clientInfos.titre1 || ""}
                      onChange={(e) => handleChange(e, "titre1")}
                      disabled={!activerChampsForm}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={clientInfos.gsm1 || ""}
                      onChange={(e) => handleChange(e, "gsm1")}
                      disabled={!activerChampsForm}
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
                      onChange={(e) => handleChange(e, "Nom2")}
                      disabled={!activerChampsForm}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={clientInfos.titre2 || ""}
                      onChange={(e) => handleChange(e, "titre2")}
                      disabled={!activerChampsForm}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={clientInfos.gsm2 || ""}
                      onChange={(e) => handleChange(e, "gsm2")}
                      disabled={!activerChampsForm}
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
                      onChange={(e) => handleChange(e, "Nom3")}
                      disabled={!activerChampsForm}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={clientInfos.gsm3 || ""}
                      onChange={(e) => handleChange(e, "gsm3")}
                      disabled={!activerChampsForm}
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
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      disabled={!activerChampsForm}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div className="divider lg:divider-horizontal" /> */}

          <div className="card bg-base-300 rounded-box p-6 w-1/5 space-y-2">
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <legend
                className="font-normal"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Paramètres Facturation
              </legend>

              <div className="w-full min-w-md">
                <div className="flex flex-nowrap">
                  <div className="flex flex-col w-1/2">
                    <label
                      className="font-bold"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Tarif
                    </label>

                    <select
                      className="border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                    >
                      <option value="prix1">prix1</option>
                      <option value="prix2">prix2</option>
                      <option value="prix3">prix3</option>
                      <option value="prix4">prix4</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label
                      className="font-bold"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Régl.
                    </label>
                    <select
                      className="border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                    >
                      <option value="Chèque">Chèque</option>
                      <option value="Espèce">Espèce</option>
                      <option value="Effet">Effet</option>
                      <option value="Retenue">Retenue</option>
                      <option value="Virement">Virement</option>
                      <option value="Différence">Différence</option>
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
                    onChange={(e) => handleChange(e, "remise")}
                    disabled={!activerChampsForm}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Délai de Règl F.C
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.delregFC || ""}
                    onChange={(e) => handleChange(e, "delregFC")}
                    disabled={!activerChampsForm}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Délai de Règl Fact
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.delregFT || ""}
                    onChange={(e) => handleChange(e, "delregFT")}
                    disabled={!activerChampsForm}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Délai de Règl BL
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={clientInfos.delregBL || ""}
                    onChange={(e) => handleChange(e, "delregBL")}
                    disabled={!activerChampsForm}
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
                    onChange={(e) => handleChange(e, "scredit")}
                    disabled={!activerChampsForm}
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
                    onChange={(e) => handleChange(e, "srisque")}
                    disabled={!activerChampsForm}
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
                    onChange={(e) => handleChange(e, "reference")}
                    disabled={!activerChampsForm}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    // value={clientInfos.cltexport || ""}
                    // onChange={(e) => handleChange(e, "cltexport")}
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
                    >
                      <option value="O">O</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        {/* 2 */}
        <div className="divider"></div>

        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2">
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <legend className="fieldset-legend text-red-500 font-bold">
                Banque
              </legend>

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
                    // value={clientInfos.banque.banque || ""}
                    //   onChange={(e) => handleChange(e, "nposte1")}
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
                    // value={clientInfos.banque.ncompte || ""}
                    //   onChange={(e) => handleChange(e, "ncompte")}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <legend className="fieldset-legend text-red-500 font-bold">
                Parametre Fiscales
              </legend>
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
                    onChange={(e) => handleChange(e, "matriculef")}
                    disabled={!activerChampsForm}
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
                    onChange={(e) => handleChange(e, "decision")}
                    disabled={!activerChampsForm}
                  />
                  <label
                    className="block"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date deb Autorisation:
                  </label>

                  <input
                    type="text"
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
                    type="text"
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
                        toolbarMode === "edition"
                          ? Boolean(clientInfos.fidel)
                          : false
                      }
                      onChange={(e) => handleChange(e, "fidel")}
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
                      value={clientInfos.autretva || ""}
                      onChange={(e) => handleChange(e, "autretva")}
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
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-nowrap">
                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        checked={clientInfos.majotva === "0"}
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChange(e, "majotva")}
                        disabled={!activerChampsForm}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Majoration de TVA
                      </label>
                    </div>

                    <div className="flex space-x-2 w-1/2">
                      <input
                        checked={clientInfos.exon === "0"}
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        value={clientInfos.exon || ""}
                        onChange={(e) => handleChange(e, "exon")}
                        disabled={!activerChampsForm}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Exonore de TVA
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-nowrap">
                    <div className="flex space-x-2 w-1/2">
                      <input
                        disabled={!activerChampsForm}
                        checked={clientInfos.regime === "O"}
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChange(e, "regime")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Regime reele
                      </label>
                    </div>

                    <div className="flex space-x-2 w-1/2">
                      <input
                        disabled={!activerChampsForm}
                        type="checkbox"
                        checked={clientInfos.suspfodec === "0"}
                        className="border border-gray-300 rounded-md"
                        onChange={(e) => handleChange(e, "suspfodec")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Suspendu FODEK
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-nowrap">
                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        disabled={!activerChampsForm}
                        checked={clientInfos.cltexport === "0"}
                        className="border border-gray-300 rounded-md"
                        value={clientInfos.cltexport || ""}
                        onChange={(e) => handleChange(e, "cltexport")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Client A l'expert
                      </label>
                    </div>

                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        disabled={!activerChampsForm}
                        className="border border-gray-300 rounded-md"
                        checked={clientInfos.timbref === "O"}
                        onChange={(e) => handleChange(e, "timbref")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Timbre fiscale
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="checkbox"
                      disabled={!activerChampsForm}
                      className="border border-gray-300 rounded-md"
                      checked={clientInfos.fact == "0"}
                      onChange={(e) => handleChange(e, "fact")}
                    />
                    <label style={{ color: "rgb(48, 60, 123)" }}>
                      Fact ticket de caisse
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          {/* <div className="divider lg:divider-horizontal"></div> */}

          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-20 mt-2">
            {/* Ajout de space-y-6 pour espacer les fieldsets */}

            {/* Fieldset Compte comptable */}
            <fieldset className="fieldset bg-base-300 border border-base-100 p-4 rounded-box">
              <legend
                className="fieldset-legend font-bold"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Compte comptable
              </legend>

              <div className="flex flex-nowrap w-full items-center space-x-2">
                <select
                  className="border border-gray-300 rounded-md p-2 w-11/12"
                  disabled={!activerChampsForm}
                />
                <button
                  className="btn btn-sm disabled={!activerChampsForm}"
                  disabled={!activerChampsForm}
                ></button>
              </div>
              <select
                className="border border-gray-300 rounded-md p-2 w-11/12"
                disabled={!activerChampsForm}
              />
            </fieldset>

            {/* Fieldset Informations */}
            <fieldset className="fieldset bg-base-300 border border-base-100 p-4 rounded-box">
              <legend className="fieldset-legend"></legend>
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
                    value={clientInfos.usera || infosUtilisateur.codeuser + " // " + infosUtilisateur.nom}
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
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    value={clientInfos.datemaj || ""}
                    onChange={(e) => handleChange(e, "datemaj")}
                    disabled
                  />
                </div>
              </div>
            </fieldset>
          </div>

          {/* <div className="divider lg:divider-horizontal"></div> */}

          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2">
            <fieldset className="fieldset bg-base-300 border border-base-100 p-4 rounded-box">
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

              <div className="flex flex-col">
                <label
                  className="block font-bold text-center"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Aval
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={clientInfos.aval1 || ""}
                  onChange={(e) => handleChange(e, "aval1")}
                  disabled={!activerChampsForm}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={clientInfos.aval2 || ""}
                  onChange={(e) => handleChange(e, "aval2")}
                  disabled={!activerChampsForm}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="block font-bold text-center"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Cordonnes client en arabe{" "}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                  // value={clientInfos.cltexport || ""}
                  // onChange={(e) => handleChange(e, "cltexport")}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={!activerChampsForm}
                  // value={clientInfos.cltexport || ""}
                  // onChange={(e) => handleChange(e, "cltexport")}
                />
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </>
  );
}

export default ClientForm;
