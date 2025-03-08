import React, { useEffect } from "react";
import ClientForm from "../../components/Client/ClientForm";
import ToolBar from "../../components/Common/ToolBar";
import Alert from "../../components/Common/Alert";
import AlertModalD from "../../components/Common/AlertModalD";
import { setToolbarTable } from "../../app/interface_slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function ClientFormTout() {
  const InfoClient = useSelector((state) => state.ClientCrud.clientInfos);
  const dispatch = useDispatch();

  // * UseEffect #1 : Récuperer La liste des clients
  useEffect(() => {
    dispatch(setToolbarTable("client"));
  }, []);

  // * Utilisé pour spécifier quelle db (societé) on interroge
  const dbName = localStorage.getItem("selectedDatabase");
  // * Utilisé pour l'authorization de l'utilisateur à effectuer des opérations
  const token = localStorage.getItem("token");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        <ToolBar />
        <Alert />
        <AlertModalD />
        <ClientForm />
        <br />
      </div>
    </div>
  );
}

export default ClientFormTout;
