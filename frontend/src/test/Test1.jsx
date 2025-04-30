import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
} from "../app/client_slices/clientSlice";
import { setDevisInfo } from "../app/devis_slices/devisSlice";
import { setOuvrireDrawerMenu } from "../app/interface_slices/interfaceSlice";

function Test1() {
  const dispatch = useDispatch();
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const insertionDepuisDevisForm = useSelector(
    (state) => state.devisSlice.insertionDepuisDevisForm
  );

  const handleChange = (e, colonne) => {
    if (e.target.value === "") {
      dispatch(viderChampsClientInfo());
    }
    if (colonne === "cp" && e.target.value.length === 4) {
      dispatch(getVilleParCodePostal(e.target.value));
    }
    dispatch(setClientInfos({ colonne, valeur: e.target.value }));
    if (insertionDepuisDevisForm) {
      dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
    }
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  return (
    <>
      {/* Le reste de la page ici */}

      <div className="drawer">
      <input 
        id="my-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={isDrawerOpen}
        onChange={(e) => dispatch(setOuvrireDrawerMenu(e.target.checked))}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label 
          onClick={() => setIsDrawerOpen(true)} 
          className="btn btn-primary drawer-button"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <button
            onClick={() => dispatch(setOuvrireDrawerMenu(false))}
            className="btn btn-circle btn-sm absolute top-2 right-2 z-50"
          >
            ×
          </button>
          {/* Sidebar content here */}
          <li>
            <a onClick={() => dispatch(setOuvrireDrawerMenu(false))}>Sidebar Item 1</a>
          </li>
          <li>
            <a onClick={() => dispatch(setOuvrireDrawerMenu(false))}>Sidebar Item 1</a>
          </li>
          <li>
            <a onClick={() => dispatch(setOuvrireDrawerMenu(false))}>Sidebar Item 1</a>
          </li>
          <li>
            <a onClick={() => dispatch(setOuvrireDrawerMenu(false))}>Sidebar Item 1</a>
          </li>
          <li>
            <a onClick={() => dispatch(setOuvrireDrawerMenu(false))}>Sidebar Item 1</a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default Test1;
