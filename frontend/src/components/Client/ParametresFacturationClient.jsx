import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAlphabetique, isNumerique } from "../../utils/validations";
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import { setDevisInfo } from "../../app/devis_slices/devisSlice";

function ParametresFacturationClient() {
  const dispatch = useDispatch();
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );
  const insertionDepuisDevisForm = useSelector(
    (state) => state.clientSlice.insertionDepuisDevisForm
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

  return (
    <>
      <div className="card rounded-box p-0 space-y-2">
        {/* Conteneur pour Code Client, Type Client et CIN */}
        

       

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
            <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
          <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
          <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
          <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
          <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
            <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
            <label className="font-bold" style={{ color: "rgb(48, 60, 123)" }}>
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
    </>
  );
}

export default ParametresFacturationClient;
