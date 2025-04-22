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
    if (toolbarMode == "ajout" || toolbarMode == "modification") {
      dispatch(
        setClientInfos({
          colonne: colonne,
          valeur: e.target.checked ? "O" : "N",
        })
      );
    }
  };
  return (
    <>
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
            <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
              Matricules fiscales
            </label>

            <input
              type="text"
              className=" border border-gray-300 rounded-md p-2 "
              value={clientInfos.matriculef || ""}
              onChange={(e) => handleChangeNumeriqueDouble(e, "matriculef")}
              disabled={!activerChampsForm}
              maxLength={17}
            />

            <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
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
            <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
              Date deb Autorisation:
            </label>

            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 "
              value={clientInfos.datedebaut || ""}
              onChange={(e) => handleChange(e, "datedebaut")}
              disabled={!activerChampsForm}
            />

            <label className="block" style={{ color: "rgb(48, 60, 123)" }}>
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
                  (toolbarMode == "consultation" ||
                    toolbarMode == "modification") &&
                  clientInfos.fidel &&
                  clientInfos.fidel?.toUpperCase() !== "N"
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
                  (toolbarMode == "consultation" ||
                    toolbarMode == "modification") &&
                  clientInfos.ptva &&
                  clientInfos.ptva?.toUpperCase() !== "N"
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
                    (toolbarMode === "consultation" ||
                      toolbarMode == "modification") &&
                    clientInfos.majotva &&
                    clientInfos.majotva?.toUpperCase() !== "N"
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
                    (toolbarMode == "consultation" ||
                      toolbarMode == "modification") &&
                    clientInfos.exon &&
                    clientInfos.exon?.toUpperCase() !== "N"
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
                    (toolbarMode == "consultation" ||
                      toolbarMode == "modification") &&
                    clientInfos.regime &&
                    clientInfos.regime?.toUpperCase() !== "N"
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
                    (toolbarMode == "consultation" ||
                      toolbarMode == "modification") &&
                    clientInfos.suspfodec &&
                    clientInfos.suspfodec?.toUpperCase() !== "N"
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
                  checked={
                    (toolbarMode == "consultation" ||
                      toolbarMode == "modification") &&
                    clientInfos.cltexport &&
                    clientInfos.cltexport.toUpperCase() !== "N"
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
                    (toolbarMode == "consultation" ||
                      toolbarMode == "modification") &&
                    clientInfos.timbref &&
                    clientInfos.timbref?.toUpperCase() !== "N"
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
                  (toolbarMode == "consultation" ||
                    toolbarMode == "modification") &&
                  clientInfos.offretick &&
                  clientInfos.offretick?.toUpperCase() !== "N"
                }
                className="border border-gray-300 rounded-md"
                onChange={(e) => handleChangeCheckbox(e, "offretick")}
              />
              <label className="text-blue-900">Fact ticket de caisse</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsBanqueClient;
