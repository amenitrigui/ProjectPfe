import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  supprimerClient,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import { setAfficherAlertModal } from "../../app/interface_slices/uiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlertModalD() {
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  const dispatch = useDispatch();
  const afficherAlertModal = useSelector((state) => state.uiStates.afficherAlertModal);

  const handlesuprimer = async (closeToast) => {
    dispatch(supprimerClient(clientInfos.code));
    dispatch(viderChampsClientInfo());
    dispatch(setAfficherAlertModal(false));
    closeToast();
  };

  useEffect(() => {
    if (afficherAlertModal) {
      toast.warn(
        ({ closeToast }) => (
          <div>
            <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
            <button
              className="btn btn-soft btn-warning"
              onClick={() => handlesuprimer(closeToast)}
            >
              Supprimer
            </button>
            <button className="btn btn-soft" onClick={() => {dispatch(setAfficherAlertModal(false));closeToast()}}>
              Annuler
            </button>
          </div>
        ),
        {
          position: "top-center",
          autoClose: false, // Désactiver la fermeture automatique
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    }
  }, [afficherAlertModal]);

  return <ToastContainer limit={1} />;
}

export default AlertModalD;
