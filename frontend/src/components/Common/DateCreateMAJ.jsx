import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVilleParCodePostal, setClientInfos, viderChampsClientInfo } from '../../app/client_slices/clientSlice';
import { setDevisInfo } from '../../app/devis_slices/devisSlice';
function DateCreateMAJ() {
    const dispatch = useDispatch();
    const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
    const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
    const utilisateurConnecte = useSelector((state) => state.utilisateurSystemSlice.utilisateurConnecte);
    const insertionDepuisDevisForm = useSelector((state) => state.devisSlice.insertionDepuisDevisForm);
    const activerChampsForm = useSelector((state) => state.interfaceSlice.activerChampsForm);
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
    <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-col w-full">
                {/* Ligne pour "Creation" */}
                {(toolbarMode === "ajout" ||
                  toolbarMode === "consultation") && (
                  <div className="flex items-center space-x-4">
                    <label
                      className="font-medium w-1/3 text-left block"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Creation
                    </label>

                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      value={
                        clientInfos.usera ||
                        utilisateurConnecte.codeuser +
                          " // " +
                          utilisateurConnecte.nom
                      }
                      onChange={(e) => handleChange(e, "usera")}
                      disabled
                    />
                  </div>
                )}
                {(toolbarMode === "ajout" ||
                  toolbarMode === "consultation") && (
                  <div className="flex items-center space-x-4">
                    <label
                      className="font-medium w-1/3 text-left block"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      date Create
                    </label>

                    <input
                      type="date"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      value={clientInfos.datec}
                      onChange={(e) => handleChange(e, "datec")}
                      disabled
                    />
                  </div>
                )}

                {/* Ligne pour "Modification" */}
                {toolbarMode === "modification" && (
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
                )}

                {/* Ligne pour "Date Maj" */}
                {toolbarMode === "modification" && (
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
                )}
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
    </>
  )
}

export default DateCreateMAJ