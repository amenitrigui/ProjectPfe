import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supprimerClient, getListeClient } from "../../app/client_slices/clientSlice";
import { setAfficherAlertModal, setClearAppele } from "../../app/interface_slices/uiSlice";

function AlertModalD() {
  const message = useSelector((state) => state.uiStates.alerteModelMessage);
  const afficherAlerteModel = useSelector((state) => state.uiStates.afficherAlertModal);
  const dispatch = useDispatch();
  // * suprimer clients
  const handlesuprimer = async () => {
    dispatch(setAfficherAlertModal(false))
    dispatch(supprimerClient())
    dispatch(getListeClient())
    // ! s'exécute une seule fois, puis reste true
    dispatch(setClearAppele(true))
  }
  useEffect(() => {
    if (afficherAlerteModel) {
      document.getElementById("my_modal_1").showModal();
    }
  }, [afficherAlerteModel]); // Runs when afficherAlerteModel changes

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmez</h3>
        <p className="py-4">{message || "Press ESC key or click the button below to close"}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error" onClick={() => { handlesuprimer() }}>Supprimer</button>
            <button className="btn" onClick={() => {dispatch(setAfficherAlertModal(false))}}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AlertModalD;
