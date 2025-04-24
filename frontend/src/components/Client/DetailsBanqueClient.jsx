import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumerique } from "../../utils/validations";
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import { setDevisInfo } from "../../app/devis_slices/devisSlice";

function DetailsBanqueClient() {
  const dispatch = useDispatch();
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const insertionDepuisDevisForm = useSelector(
    (state) => state.interfaceSlice.insertionDepuisDevisForm
  );

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

  const handleChangeCheckbox = (e, colonne) => {
    console.log(e.target.checked, " ", colonne);
    console.log(toolbarMode)
    if (toolbarMode == "ajout" || toolbarMode == "modification") {
      dispatch(
        setClientInfos({
          colonne: colonne,
          valeur: e.target.checked ? "1" : "0",
        })
      );
    }
  };
  return (
    <>
      <div className="card rounded-box p-6 space-y-2">
      <div className="flex flex-wrap md:flex-nowrap gap-4">
  <div className="flex flex-col w-full md:w-1/3">
    <label className="block font-bold text-blue-900">Nom</label>
    <input
      type="text"
      className="border border-gray-300 rounded-md p-2"
      disabled={!activerChampsForm}
      value={clientInfos.banque || ""}
      onChange={(e) => handleChangeNom(e, "banque")}
    />
  </div>
  <div className="flex flex-col w-full md:w-2/3">
    <label className="block font-bold text-blue-900">Rib</label>
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
       {/* Matricule fiscale et Numéro de décision sur la même ligne */}
<div className="flex flex-nowrap gap-4">
  <div className="flex flex-col w-1/2">
    <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
      Matricule fiscale
    </label>
    <input
      type="text"
      className="border border-gray-300 rounded-md p-2"
      value={clientInfos.matriculef || ""}
      onChange={(e) => handleChangeNumeriqueDouble(e, "matriculef")}
      disabled={!activerChampsForm}
      maxLength={17}
    />
  </div>

  <div className="flex flex-col w-1/2">
    <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
      Numéro de décision
    </label>
    <input
      type="text"
      className="border border-gray-300 rounded-md p-2"
      value={clientInfos.decision || ""}
      onChange={(e) => handleChangeNumDecision(e, "decision")}
      disabled={!activerChampsForm}
      maxLength={12}
    />
  </div>
</div>

{/* Date début et fin autorisation sur la même ligne */}
<div className="flex flex-nowrap gap-4 mt-4">
  <div className="flex flex-col w-1/2">
    <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
      Date début autorisation
    </label>
    <input
      type="date"
      className="border border-gray-300 rounded-md p-2"
      value={clientInfos.datedebaut ? clientInfos.datedebaut : ""}
      onChange={(e) => handleChange(e, "datedebaut")}
      disabled={!activerChampsForm}
    />
  </div>

  <div className="flex flex-col w-1/2">
    <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
      Date fin autorisation
    </label>
    <input
      type="date"
      className="border border-gray-300 rounded-md p-2"
      value={clientInfos.datefinaut ? clientInfos.datefinaut : ""}
      onChange={(e) => handleChange(e, "datefinaut")}
      disabled={!activerChampsForm}
    />
  </div>
</div>

            <div className="flex flex-nowrap">
              <input
                type="checkbox"
                className="border border-gray-300 rounded-md p-2"
                checked={
                  clientInfos.fidel &&
                  clientInfos.fidel?.toUpperCase() !== "N" &&
                  clientInfos.fidel !== "0"
                }
                onChange={(e) => handleChangeCheckbox(e, "fidel")}
                disabled={!activerChampsForm}
              />

              <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
                Fidele
              </label>

              <input
                type="checkbox"
                className="border border-gray-300 rounded-md p-2 "
                disabled={!activerChampsForm}
                checked={
                  clientInfos.ptva &&
                  clientInfos.ptva?.toUpperCase() !== "N" &&
                  clientInfos.ptva !== "0"
                }
                onChange={(e) => handleChangeCheckbox(e, "ptva")}
              />
              <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
                Autre Tva
              </label>
            </div>
            <div className="flex flex-nowrap">
              <select
                className="border border-gray-300 rounded-md w-1/3 p-2"
                value={clientInfos.susptva === "1" || clientInfos.susptva?.toUpperCase() === "O"? "1" : "0"}
                disabled={!activerChampsForm}
                onChange={(e) => hundleSelectTous(e, "susptva")}
              >
                <option value="1">O</option>
                <option value="0">N</option>
              </select>
              <label
                className="block mt-2"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                Suspendu du TVA
              </label>
            </div>
            {/* Ligne 1 */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="flex items-center space-x-2 w-full md:w-1/2">
                <input
                  type="checkbox"
                  checked={
                    clientInfos.majotva &&
                    clientInfos.majotva?.toUpperCase() !== "N" &&
                    clientInfos.majotva !== "0"
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
                    clientInfos.exon &&
                    clientInfos.exon?.toUpperCase() !== "N" &&
                    clientInfos.exon !== "0"
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
                    clientInfos.regime &&
                    clientInfos.regime?.toUpperCase() !== "N" &&
                    clientInfos.regime !== "0"
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
                    clientInfos.suspfodec &&
                    clientInfos.suspfodec?.toUpperCase() !== "N" &&
                    clientInfos.suspfodec !== "0"
                  }
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => handleChangeCheckbox(e, "suspfodec")}
                />
                <label className="text-blue-900">Suspendu FODEC</label>
              </div>
            </div>

            {/* Ligne 3 */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="flex items-center space-x-2 w-full md:w-1/2">
                <input
                  type="checkbox"
                  disabled={!activerChampsForm}
                  checked={
                    clientInfos.cltexport &&
                    clientInfos.cltexport.toUpperCase() !== "N" &&
                    clientInfos.cltexport !== "0"
                  }
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => handleChangeCheckbox(e, "cltexport")}
                />
                <label className="text-blue-900">Client à l'export</label>
              </div>

              <div className="flex items-center space-x-2 w-full md:w-1/2">
                <input
                  type="checkbox"
                  disabled={!activerChampsForm}
                  checked={
                    clientInfos.timbref &&
                    clientInfos.timbref?.toUpperCase() !== "N" &&
                    clientInfos.timbref !== "0"
                  }
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
                checked={
                  clientInfos.offretick &&
                  clientInfos.offretick?.toUpperCase() !== "N" &&
                  clientInfos.offretick !== "0"
                }
                className="border border-gray-300 rounded-md"
                onChange={(e) => handleChangeCheckbox(e, "offretick")}
              />
              <label className="text-blue-900">Fact ticket de caisse</label>
            </div>
          </div>

          <div className="flex flex-col w-1/2 p-8  gap-10 ">
            <div className="flex flex-col">
              <label
                className="block font-bold text-center"
                style={{ color: "rgb(48, 60, 123)" }}
              >
                commentaire
              </label>

              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                cols={30}
                rows={8}
                value={clientInfos.Commentaire || ""}
                onChange={(e) => handleChange(e, "Commentaire")}
                disabled={!activerChampsForm}
              />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsBanqueClient;
