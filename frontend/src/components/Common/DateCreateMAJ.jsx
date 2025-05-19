import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
} from '../../app/client_slices/clientSlice';
import { setDevisInfo } from '../../app/devis_slices/devisSlice';

function DateCreateMAJ(props) {
  const dispatch = useDispatch();
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const utilisateurConnecte = useSelector((state) => state.utilisateurSystemSlice.utilisateurConnecte);
  const insertionDepuisDevisForm = useSelector((state) => state.devisSlice.insertionDepuisDevisForm);

  const handleChange = (e, colonne) => {
    if (e.target.value === '') {
      dispatch(viderChampsClientInfo());
    }
    if (colonne === 'cp' && e.target.value.length === 4) {
      dispatch(getVilleParCodePostal(e.target.value));
    }
    dispatch(setClientInfos({ colonne, valeur: e.target.value }));
    if (insertionDepuisDevisForm) {
      dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-gray-300 shadow-md  z-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full max-w-7xl mx-auto">
        {/* Creation + Date Create */}
        {(toolbarMode === 'ajout' || toolbarMode === 'consultation' ||toolbarMode=="suppression")&& (
          <>
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 w-full sm:w-1/2">
              <label className="font-medium text-sm w-full sm:w-auto text-indigo-900">
                Création :
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                value={
                  props.objet.usera? props.objet.usera : utilisateurConnecte.codeuser? 
                  utilisateurConnecte.codeuser + ' // ' + utilisateurConnecte.nom : ""
                }
                // onChange={(e) => handleChange(e, 'usera')}
                disabled
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 w-full sm:w-1/2">
              <label className="font-medium text-sm w-full sm:w-auto text-indigo-900">
                Date création :
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                value={toolbarMode === "ajout"? new Date().toISOString().split("T")[0] : props.objet.datcreat? props.objet.datcreat: props.objet.datecreate? props.objet.datecreate: props.objet.DATEBL? props.objet.DATEBL : ""}
                // onChange={(e) => handleChange(e, 'datcreat
                disabled
              />
            </div>
          </>
        )}

        {/* Modification + Date Maj */}
        {toolbarMode === 'modification' && (
          <>
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 w-full sm:w-1/2">
              <label className="font-medium text-sm w-full sm:w-auto text-indigo-900">
                Modification :
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                value={props.objet.userm? props.objet.userm : (toolbarMode == "modification" && utilisateurConnecte.codeuser)? utilisateurConnecte.codeuser : ""}
                // onChange={(e) => handleChange(e, 'userm')}
                disabled
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 w-full sm:w-1/2">
              <label className="font-medium text-sm w-full sm:w-auto text-indigo-900">
                Date maj :
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                value={props.objet.datemaj? props.objet.datemaj : props.objet.DATEDMAJ? props.objet.DATEDMAJ : (toolbarMode == "modification" && utilisateurConnecte.codeuser)?new Date().toISOString().split("T")[0] : "" }
                // onChange={(e) => handleChange(e, 'datemaj')}
                disabled
              />
            </div>
          </>
        )}
      </div>
    </footer>
  );
}

export default DateCreateMAJ;
