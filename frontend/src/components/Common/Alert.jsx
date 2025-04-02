import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAfficherAlert } from "../../app/interface_slices/uiSlice";
import { ajouterClient } from "../../app/client_slices/clientSlice";

function Alert() {
  const dispatch = useDispatch();
  const afficherAlert = useSelector((state) => state.uiStates.afficherAlert);

  const handleAjout = async (closeToast) => {
    dispatch(ajouterClient());
    dispatch(setAfficherAlert(false));
    closeToast();
  };

  useEffect(() => {
    if (afficherAlert) {
      toast.info(
        ({ closeToast }) => (
          <div
            style={{
              backgroundColor: "#2a2185",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Êtes-vous sûr de vouloir ajouter ce client ?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
                onClick={() => handleAjout(closeToast)}
              >
                Ajouter
              </button>
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(setAfficherAlert(false));
                  closeToast();
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        ),
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
    }
  }, [afficherAlert]);

  return <ToastContainer limit={1} />;
}

export default Alert;