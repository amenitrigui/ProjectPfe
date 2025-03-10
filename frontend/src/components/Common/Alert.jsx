import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setAfficherAlertModal, setAlertMessage } from "../../app/interface_slices/uiSlice";
import { ajouterClient } from "../../app/client_slices/clientSlice";
function Alert() {
  // ! cette composant va etre remplacé par react toastify
  // * message d'alert
  const dispatch = useDispatch();
  const message = useSelector((state) => state.uiStates.message);
  // * boolean pour afficher/cacher cet alert
  const afficherAlertModal = useSelector((state) => state.uiStates.afficherAlertModal);
  const handleAjout = async (closeToast) => {
    dispatch(ajouterClient())
    dispatch(setAfficherAlertModal(false));
    closeToast();
  };
  useEffect(() => {
    if (afficherAlertModal) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p>Êtes-vous sûr de vouloir Ajouter client ?</p>
            <button
              className="btn btn-secondary"
              onClick={() => handleAjout(closeToast)}
            >
              Ajouter
            </button>
            <button
              className="btn btn-soft"
              onClick={() => {
                dispatch(setAfficherAlertModal(false));
                closeToast();
              }}
            >
              Annuler
            </button> 
          </div>
        ),

        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        
          theme: "light",
        }
      );
    }
  }, [afficherAlertModal]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />
     
    </>
  );
}

export default Alert;
