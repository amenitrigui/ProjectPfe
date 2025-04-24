import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
} from '../../app/client_slices/clientSlice';
import { setDevisInfo } from '../../app/devis_slices/devisSlice';

function DateCreateMAJ() {
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
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md  z-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full max-w-7xl mx-auto">
        {/* Creation + Date Create */}
        {(toolbarMode === 'ajout' || toolbarMode === 'consultation') && (
          <>
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 w-full sm:w-1/2">
              <label className="font-medium text-sm w-full sm:w-auto text-indigo-900">
                Création :
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                value={
                  clientInfos.usera ||
                  utilisateurConnecte.codeuser + ' // ' + utilisateurConnecte.nom
                }
                onChange={(e) => handleChange(e, 'usera')}
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
                value={clientInfos.datcreat}
                onChange={(e) => handleChange(e, 'datcreat')}
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
                value={clientInfos.userm || ''}
                onChange={(e) => handleChange(e, 'userm')}
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
                value={clientInfos.datemaj || ''}
                onChange={(e) => handleChange(e, 'datemaj')}
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
