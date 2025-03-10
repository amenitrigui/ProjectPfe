import React, { useEffect } from "react";
import ClientForm from "../../components/Client/ClientForm";
import ToolBar from "../../components/Common/ToolBar";
import Alert from "../../components/Common/Alert";
import AlertModalD from "../../components/Common/AlertModalD";
import { setToolbarTable } from "../../app/interface_slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function ClientFormTout() {
  const dispatch = useDispatch();
  // ! calling that setter outside of a useEffect causes a "cannot update component while rendering a different component"
  // ! this helps a little bit with understanding the useEffect hook
  // ! the above error occured because a mutation was happening during the render phase
  // ! for the record, react has 2 phases: render phase and commit phase
  // ! the mutation should've happened in the commit phase instead of the render phase
  // ! no idea why that issue seems to sometimes happen while other times it will not
  useEffect(() => {
    dispatch(setToolbarTable("client"));
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        <Alert />
        <ToolBar />
        <AlertModalD />
        <ClientForm />
        <br />
      </div>
    </div>
  );
}

export default ClientFormTout;
