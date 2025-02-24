import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, getClientList } from "../../app/client_slices/clientSlice";
import { setClearAppele } from "../../app/interface_slices/uiSlice";

function AlertModalD() {
  const message = useSelector((state) => state.uiStates.alerteModelMessage);
  const showAlerteModel = useSelector((state) => state.uiStates.showAlertModal);
  const dispatch = useDispatch();
  // * suprimer client
  const handlesuprimer = async () => {
    dispatch(deleteClient())
    dispatch(getClientList())
    // ! s'exécute une seule fois, puis reste true
    dispatch(setClearAppele(true))
  }
  useEffect(() => {
    if (showAlerteModel) {
      document.getElementById("my_modal_1").showModal();
    }
  }, [showAlerteModel]); // Runs when showAlerteModel changes

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">{message || "Press ESC key or click the button below to close"}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error" onClick={() => { handlesuprimer() }}>Supprimer</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AlertModalD;
