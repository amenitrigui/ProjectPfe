import React, { useEffect } from "react";
import UtilisateurForm from "../../components/Utilisateur/UtilisateurForm";
import AlertModifier from "../../components/Common/AlertModifier";

import { useDispatch, useSelector } from "react-redux";
import { setToolbarMode, setToolbarTable } from "../../app/interface_slices/interfaceSlice";
import Recherche from "../../components/Common/recherche";

function UtilisateurFormTout() {
  const dispatch = useDispatch()
  const afficherRecherchePopup = useSelector((state) => state.interfaceSlice.afficherRecherchePopup);

  useEffect(()=>{
    dispatch(setToolbarTable("utilisateur"))
    dispatch(setToolbarMode("superviseur"))
  },[])
  return (
    <div className="flex min-h-screen bg-base-100">
      <div className="flex-1 bg-base-100">
      { afficherRecherchePopup == true && <Recherche></Recherche> }
        <AlertModifier />
        <UtilisateurForm />
        <br />
      </div>
    </div>
  );
}

export default UtilisateurFormTout;
