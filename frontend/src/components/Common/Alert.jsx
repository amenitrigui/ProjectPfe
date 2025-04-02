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
      toast(
        ({ closeToast }) => (
          <div
          style={{
            
           
            
          borderRadius:"20px",
            boxShadow: "0px 4px 10px rgb(42, 33, 133)",
          
        
          }}
          >
            <p style={{ fontWeight: "bold", color: "#1f1f1f",   textAlign: "center",fontSize: "18px", fontFamily: "Arial, sans-serif", marginBottom: "15px" }}>
              Confirmez-vous l'ajout de ce client ?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button
                style={{
                  backgroundColor: "#2a2185",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onClick={() => handleAjout(closeToast)}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#211b70")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2a2185")}
              >
                Ajouter
              </button>
              <button
                style={{
                  backgroundColor: "#b0b0b0",
                  color: "#333",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onClick={() => {
                  dispatch(setAfficherAlert(false));
                  closeToast();
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#888")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#b0b0b0")}
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
          draggable: false,
          closeButton: false,
        }
      );
    }
  }, [afficherAlert]);

  return <ToastContainer limit={1} />;
}

export default Alert;
