import React, { useEffect } from "react";
import UtilisateurForm from "../../components/Utilisateur/UtilisateurForm";
import AlertModifier from "../../components/Common/AlertModifier";

import { useDispatch, useSelector } from "react-redux";
import { setToolbarTable } from "../../app/interface_slices/uiSlice";
import Recherche from "../../components/Common/recherche";

function UtilisateurFormTout() {
  const dispatch = useDispatch()
  const afficherRecherchePopup = useSelector((state) => state.uiStates.afficherRecherchePopup);

  useEffect(()=>{
    dispatch(setToolbarTable("utilisateur"))
  },[])
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
      { afficherRecherchePopup == true && <Recherche></Recherche> }
        <AlertModifier />
        <UtilisateurForm />
        <br />
      </div>
    </div>
  );
}

export default UtilisateurFormTout;
