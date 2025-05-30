import React, { useEffect } from "react";
import ArticleForm from "../../components/Article/ArticleForm";
import AlertModifier from "../../components/Common/AlertModifier";
import { useDispatch, useSelector } from "react-redux";
import { setToolbarTable } from "../../app/interface_slices/interfaceSlice";
import Recherche from "../../components/Common/recherche";
import FamilleForm from "../../components/Famille/FamilleForm";
import ConfigPopUp from "../../components/Devis/ConfigPopUp";

function ArticleFormTout() {
  const dispatch = useDispatch();
  const afficherRecherchePopup = useSelector(
    (state) => state.interfaceSlice.afficherRecherchePopup
  );
  const afficherFamillePopub = useSelector(
    (state) => state.interfaceSlice.afficherFamillePopub
  );
  const afficherConfigPopup = useSelector(
    (state) => state.interfaceSlice.afficherConfigPopup
  );
  useEffect(() => {
    dispatch(setToolbarTable("article"));
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        {afficherRecherchePopup == true && <Recherche />}
        {afficherFamillePopub == true && <FamilleForm></FamilleForm>}
        <ArticleForm />
        <AlertModifier />
        {afficherConfigPopup && <ConfigPopUp />}
      </div>
    </div>
  );
}

export default ArticleFormTout;
