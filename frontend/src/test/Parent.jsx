import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
  toast.warn(
    ({ closeToast }) => (
      <div>
        <p>vous etes sur de supprimer ce client?</p>
        <button className="btn btn-soft btn-warning" onClick={() => handleDelete(closeToast)}>Supprimer</button>
        <button className="btn btn-soft" onClick={closeToast}>Annuler</button>
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
};

const handleDelete = (closeToast) => {
  console.log("Élément supprimé !");
  closeToast(); // Ferme le toast après suppression
};

function Parent() {
  return (
    <div>
      <button onClick={notify}>Notify</button>
      <ToastContainer limit={1}/>
    </div>
  );
}

export default Parent;
