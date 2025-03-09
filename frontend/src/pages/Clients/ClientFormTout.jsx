import React, { useEffect } from "react";
import ClientForm from "../../components/Client/ClientForm";
import ToolBar from "../../components/Common/ToolBar";
import Alert from "../../components/Common/Alert";
import AlertModalD from "../../components/Common/AlertModalD";
import { setToolbarTable } from "../../app/interface_slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function ClientFormTout() {
  const dispatch = useDispatch();
  dispatch(setToolbarTable("client"));

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
