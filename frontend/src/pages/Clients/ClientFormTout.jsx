import React, { useEffect } from "react";
import ClientForm from "../../components/Client/ClientForm";
import { setToolbarTable } from "../../app/interface_slices/interfaceSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertModifier from "../../components/Common/AlertModifier";
import Recherche from "../../components/Common/recherche";
import { getDerniereCodeClient } from "../../app/client_slices/clientSlice";

function ClientFormTout() {
  const dispatch = useDispatch();
  const afficherRecherchePopup = useSelector((state) => state.interfaceSlice.afficherRecherchePopup);
  useEffect(() => {
    dispatch(setToolbarTable("client"));
    dispatch(getDerniereCodeClient());  
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        { afficherRecherchePopup == true && <Recherche/> }
        <AlertModifier />
        <ClientForm />
        <br />
      </div>
    </div>
  );
}

export default ClientFormTout;
