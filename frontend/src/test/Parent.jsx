import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import { getDevisParNUMBL } from "../app/devis_slices/devisSlice";
import ArticlesDevis from "../components/Devis/ArticlesDevis";

function Parent() {
  const afficherToast = () => {
    toast.warning("test", {
      position: "top-right",
    });
  };
  useEffect(() => {
    dispatch(getDevisParNUMBL());
  }, []);
  const dispatch = useDispatch();
  const devisList = useSelector((state) => state.DevisCrud.DevisList);

  return (
    <>
      <button onClick={() => afficherToast()}>afficher toast</button>
      <ToastContainer theme="dark" />
      <Select
        options={devisList.map((devis) => ({
          value: devis.NUMBL,
          label: devis.NUMBL,
        }))}
      />

      <ArticlesDevis />
    </>
  );
}

export default Parent;
