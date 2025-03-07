import React, { useEffect, useState } from "react";


import { setDevisInfo } from "../app/devis_slices/devisSlice";
import { setClientInfos, setClientInfosEntiere } from "../app/client_slices/clientSlice";
import { useDispatch, useSelector } from "react-redux";



function Parent() {
  const dispatch = useDispatch();

  // Sélection des informations du client depuis le state Redux
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);

  // Sélection du booléen pour effacer les champs du formulaire
  const clearApelle = useSelector((state) => state.uiStates.clearAppele);

  // Sélection du booléen pour détecter si l'insertion est faite depuis le formulaire de devis
  const insertionDepuisDevisForm = useSelector(
    (state) => state.ClientCrud.insertionDepuisDevisForm
  );

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e, colonne) => {
    dispatch(setClientInfos({ colonne, valeur: e.target.value }));
    if (insertionDepuisDevisForm) {
      dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
    }
  };

  // Effet pour réinitialiser les champs du formulaire lorsque clearApelle change
  useEffect(() => {
    if (clearApelle) {
      dispatch(
        setClientInfosEntiere({
          code: "",
          rsoc: "",
          adresse: "",
          cp: "",
          email: "",
          telephone: "",
          desrep: "",
        })
      );
    }
  }, [clearApelle]);
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
                  defaultValue={clientInfos.code}
                  onChange={(e) => handleChange(e, "code")}
                />
                <datalist id="browsers">
                  <option value="Edge"></option>
                  <option value="Firefox"></option>
                  <option value="Chrome"></option>
                  <option value="Opera"></option>
                  <option value="Safari"></option>
                </datalist>
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Type Client
                </label>
                <select className="border border-gray-300 rounded-md p-2" />
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
                  defaultValue={clientInfos.cin}
                  onChange={(e) => handleChange(e, "cin")}
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
                defaultValue={clientInfos.rsoc}
                onChange={(e) => handleChange(e, "rsoc")}
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
                defaultValue={clientInfos.adresse}
                onChange={(e) => handleChange(e, "adresse")}
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
                defaultValue={clientInfos.activite}
                onChange={(e) => handleChange(e, "activite")}
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
                    // defaultValue={clientInfos.cltexport}
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
                    // code pv
                  />
                </div>
                <div className="flex flex-col w-1/7">
                  <label className="font-medium mb-5"></label>
                  <button className="btn">PV</button>
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
                  defaultValue={clientInfos.nature}
                  onChange={(e) => handleChange(e, "nature")}
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
                    defaultValue={clientInfos.cp}
                    onChange={(e) => handleChange(e, "cp")}
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
                    defaultValue={clientInfos.ville}
                    onChange={(e) => handleChange(e, "ville")}
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
                    defaultValue={clientInfos.secteur}
                    onChange={(e) => handleChange(e, "secteur")}///table secteur
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
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="divider lg:divider-horizontal" /> */}

          <div className="card bg-base-300 rounded-box p-6 w-1/2 space-y-2">
          <div className="flex flex-col items-end">
              <input type="date" className="border border-gray-300 rounded-md p-2 w-1/3" />
            </div>
            <div className="flex flex-col items-center">
              <button className="btn">Liste des affaires</button>
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
                  defaultValue={clientInfos.tel1}
                  onChange={(e) => handleChange(e, "tel1")}
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
                  defaultValue={clientInfos.tel2}
                  onChange={(e) => handleChange(e, "tel2")}
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
                  defaultValue={clientInfos.telex}
                  onChange={(e) => handleChange(e, "telex")}
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
                  defaultValue={clientInfos.email}
                  onChange={(e) => handleChange(e, "email")}
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
                  defaultValue={clientInfos.fax}
                  onChange={(e) => handleChange(e, "fax")}
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
                  //mafamech
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label className="font-medium mb-7"></label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
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
                  defaultValue={clientInfos.desrep}
                  onChange={(e) => handleChange(e, "desrep")}
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label className="font-medium mb-7"></label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-cols">
              <button className="btn">Liste clients bloquer</button>
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
                      defaultValue={clientInfos.Nom1}
                      onChange={(e) => handleChange(e, "Nom1")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.titre1}
                      onChange={(e) => handleChange(e, "titre1")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.gsm1}
                      onChange={(e) => handleChange(e, "gsm1")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.nposte1}
                      onChange={(e) => handleChange(e, "nposte1")}
                    />
                  </td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.Nom2}
                      onChange={(e) => handleChange(e, "Nom2")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.titre2}
                      onChange={(e) => handleChange(e, "titre2")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.gsm2}
                      onChange={(e) => handleChange(e, "gsm2")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.nposte2}
                      onChange={(e) => handleChange(e, "nposte2")}
                    />
                  </td>
                </tr>
                {/* row 3 */}
                <tr>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.Nom3}
                      onChange={(e) => handleChange(e, "Nom3")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.gsm3}
                      onChange={(e) => handleChange(e, "gsm3")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={clientInfos.nposte3}
                      onChange={(e) => handleChange(e, "nposte3")}
                    />
                  </td>
                  <td className="w-1/4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
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

                    <select className="border border-gray-300 rounded-md p-2">
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
                    <select className="border border-gray-300 rounded-md p-2">
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
                    defaultValue={clientInfos.remise}
                      onChange={(e) => handleChange(e, "remise")}
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
                    defaultValue={clientInfos.delregFC}
                      onChange={(e) => handleChange(e, "delregFC")}
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
                    defaultValue={clientInfos.delregFT}
                    onChange={(e) => handleChange(e, "delregFT")}
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
                    defaultValue={clientInfos.delregBL}
                      onChange={(e) => handleChange(e, "delregBL")}
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
                    defaultValue={clientInfos.scredit}
                      onChange={(e) => handleChange(e, "scredit")}
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
                    defaultValue={clientInfos.srisque}
                      onChange={(e) => handleChange(e, "srisque")}
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
                    defaultValue={clientInfos.reference}
                      onChange={(e) => handleChange(e, "reference")}
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
                    // defaultValue={clientInfos.cltexport}
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
                    <select className="border border-gray-300 rounded-md p-2 w-11/12">
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
                    <select className="border border-gray-300 rounded-md p-2 w-11/12">
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
                    // defaultValue={clientInfos.banque.banque}
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
                    // defaultValue={clientInfos.banque.ncompte}
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
                    defaultValue={clientInfos.matriculef}
                      onChange={(e) => handleChange(e, "matriculef")}
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
                    defaultValue={clientInfos.decision}
                      onChange={(e) => handleChange(e, "decision")}
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
                    defaultValue={clientInfos.datedebaut}
                      onChange={(e) => handleChange(e, "datedebaut")}
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
                    defaultValue={clientInfos.datefinaut}
                    onChange={(e) => handleChange(e, "datefinaut")}
                  />
                  <div className="flex flex-nowrap">
                    <input
                      type="checkbox"
                      className="border border-gray-300 rounded-md p-2 "
                      defaultValue={clientInfos.fidel}
                      onChange={(e) => handleChange(e, "fidel")}
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
                      // defaultValue={clientInfos.nposte1}
                      // onChange={(e) => handleChange(e, "nposte1")}
                      ///ma3anch

                    />
                    <label
                      className="block"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Autre Tva
                    </label>
                  </div>
                  <div className="flex flex-nowrap">
                    <select className="border border-gray-300 rounded-md w-1/3 p-2">
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
                        className="border border-gray-300 rounded-md"
                        defaultValue={clientInfos.majotva}
                      onChange={(e) => handleChange(e, "majotva")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Majoration de TVA
                      </label>
                    </div>

                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        defaultValue={clientInfos.exon}
                      onChange={(e) => handleChange(e, "exon")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Exonore de TVA
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-nowrap">
                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        defaultValue={clientInfos.regime}
                      onChange={(e) => handleChange(e, "regime")}
                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Regime reele
                      </label>
                    </div>

                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        defaultValue={clientInfos.suspfodec}
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
                        className="border border-gray-300 rounded-md"
                        defaultValue={clientInfos.cltexport}
                      onChange={(e) => handleChange(e, "cltexport")}

                      />
                      <label style={{ color: "rgb(48, 60, 123)" }}>
                        Client A l'expert
                      </label>
                    </div>

                    <div className="flex space-x-2 w-1/2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        defaultValue={clientInfos.timbref}
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
                      className="border border-gray-300 rounded-md"
                      defaultValue={clientInfos.fact}
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
                <select className="border border-gray-300 rounded-md p-2 w-11/12" />
                <button className="btn btn-sm "></button>
              </div>
              <select className="border border-gray-300 rounded-md p-2 w-11/12" />
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
                    defaultValue={clientInfos.usera}
                    onChange={(e) => handleChange(e, "usera")}
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
                    defaultValue={clientInfos.userm}
                    onChange={(e) => handleChange(e, "userm")}
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
                    defaultValue={clientInfos.datemaj}
                    onChange={(e) => handleChange(e, "datemaj")}
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
                  defaultValue={clientInfos.Commentaire}
                  onChange={(e) => handleChange(e, "Commentaire")}
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
                  defaultValue={clientInfos.aval1}
                  onChange={(e) => handleChange(e, "aval1")}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  defaultValue={clientInfos.aval2}
                  onChange={(e) => handleChange(e, "aval2")}
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
                  // defaultValue={clientInfos.cltexport}
                  // onChange={(e) => handleChange(e, "cltexport")}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  // defaultValue={clientInfos.cltexport}
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

export default Parent;
