import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo
} from '../app/client_slices/clientSlice';
import { setDevisInfo } from '../app/devis_slices/devisSlice';

function Test1() {
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
    <>
      {/* Le reste de la page ici */}
      
      <div className="fixed bottom-0 w-full bg-white shadow-inner border-t border-gray-300 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {(toolbarMode === "ajout" || toolbarMode === "consultation") && (
              <>
                <div className="flex flex-1 items-center space-x-2">
                  <label className="w-28 font-medium text-sm text-gray-700">Création</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 flex-1"
                    value={
                      clientInfos.usera ||
                      `${utilisateurConnecte.codeuser} // ${utilisateurConnecte.nom}`
                    }
                    onChange={(e) => handleChange(e, "usera")}
                    disabled
                  />
                </div>
                <div className="flex flex-1 items-center space-x-2">
                  <label className="w-28 font-medium text-sm text-gray-700">Date</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 flex-1"
                    value={clientInfos.datec}
                    onChange={(e) => handleChange(e, "datec")}
                    disabled
                  />
                </div>
              </>
            )}

            {toolbarMode === "modification" && (
              <>
                <div className="flex flex-1 items-center space-x-2">
                  <label className="w-28 font-medium text-sm text-gray-700">Modification</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 flex-1"
                    value={clientInfos.userm || ''}
                    onChange={(e) => handleChange(e, "userm")}
                    disabled
                  />
                </div>
                <div className="flex flex-1 items-center space-x-2">
                  <label className="w-28 font-medium text-sm text-gray-700">Date Maj</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 flex-1"
                    value={clientInfos.datemaj || ''}
                    onChange={(e) => handleChange(e, "datemaj")}
                    disabled
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Test1;
