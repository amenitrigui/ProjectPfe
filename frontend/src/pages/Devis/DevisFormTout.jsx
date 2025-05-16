import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiverChampsForm,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";

import DevisForm from "../../components/Devis/DevisForm";
import Recherche from "../../components/Common/recherche";
import AlertModifier from "../../components/Common/AlertModifier";

function DevisFormTout() {
  //?==================================================================================================================
  //?====================================================Variables=====================================================
  //?==================================================================================================================
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const toobarTable = useSelector((state) => state.interfaceSlice.toolbarTable);
  const afficherAlert = useSelector((state) => state.interfaceSlice.afficherAlert);
  const afficherRecherchePopup = useSelector((state) => state.interfaceSlice.afficherRecherchePopup);
  const NETHTGLOBAL = devisInfo.MHT - devisInfo.MREMISE || 0;
  const taxe = devisInfo.MTTC - NETHTGLOBAL || 0;
  const apayer = devisInfo.MTTC + devisInfo.TIMBRE || 0;
  //?==================================================================================================================
  //?=================================================appels useEffect=================================================
  //?==================================================================================================================
  // * useEffect #1 : désactiver tous les champs
  // * et indiquer qu'on va utiliser la table de devis
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToolbarTable("devis"));
    dispatch(setActiverChampsForm(false));
  }, []);
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================

  return (
    <div className="bg-gray-100 min-h-screen">
      { afficherRecherchePopup == true && <Recherche/> }
      { afficherAlert && <AlertModifier /> }
      <DevisForm />
    </div>
  );
}

export default DevisFormTout;
