import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  supprimerClient,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import {
  setAfficherAlertModal,
} from "../../app/interface_slices/uiSlice";

function AlertModalD() {
  // ! cette composant va etre remplacé par react toastify
  // * message d'alert
  const message = useSelector((state) => state.uiStates.alerteModelMessage);
  // * boolean pour afficher/cacher cet alert
  const afficherAlerteModel = useSelector(
    (state) => state.uiStates.afficherAlertModal
  );
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  const dispatch = useDispatch();
  // * suprimer clients
  const handlesuprimer = async () => {
    dispatch(supprimerClient(clientInfos.code));
    dispatch(viderChampsClientInfo());
    dispatch(setAfficherAlertModal(false));
  };
  useEffect(() => {
    if (afficherAlerteModel) {
      document.getElementById("my_modal_1").showModal();
    }
  }, [afficherAlerteModel]); // Runs when afficherAlerteModel changes

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmez</h3>
        <p className="py-4">
          {message || "Press ESC key or click the button below to close"}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-error"
              onClick={() => {
                handlesuprimer();
              }}
            >
              Supprimer
            </button>
            <button
              className="btn"
              onClick={() => {
                dispatch(setAfficherAlertModal(false));
              }}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AlertModalD;
