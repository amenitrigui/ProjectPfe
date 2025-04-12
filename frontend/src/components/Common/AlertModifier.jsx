import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setActiverBoutonsValiderAnnuler,
  setActiverChampsForm,
  setAfficherAlert,
  setToolbarMode,
} from "../../app/interface_slices/uiSlice";
import {
  ajouterClient,
  majClient,
  supprimerClient,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";

import {
  ajouterArticle,
  modifierarticle,
  suprimerArticle,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
function AlertModifier() {
  const dispatch = useDispatch();

  const afficherAlert = useSelector((state) => state.uiStates.afficherAlert);
  const message = useSelector((state) => state.uiStates.message);
  const toolbarTable = useSelector((state) => state.uiStates.toolbarTable);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const clientSelectionne = useSelector(
    (state) => state.ClientCrud.clientInfos
  ).code;
  const articleCode = useSelector(
    (state) => state.ArticlesDevis.articleInfos
  ).code;

  const handleConfirmerClick = async (closeToast) => {
    //*pour le client
    if (toolbarTable == "client") {
      if (toolbarMode == "ajout") {
        dispatch(ajouterClient());
      }
      if (toolbarMode == "modification") {
        dispatch(majClient());
      }
      if (toolbarMode == "suppression") {
        dispatch(supprimerClient(clientSelectionne));
      }
      // * pour désactiver les champs du formulaire
      dispatch(setActiverChampsForm(false));
      // * pour cacher les deux bouttons valider/annuler
      dispatch(setActiverBoutonsValiderAnnuler(false));
      // * pour vider les champs de l'objet clientInfos
      dispatch(viderChampsClientInfo());
    }
    // * pour devis
    if (toolbarTable == "devis") {
      if (toolbarMode == "ajout") {
      }
      if (toolbarMode == "modification") {
      }
      if (toolbarMode == "suppression") {
      }
    }
    // * pour l'article
    if (toolbarTable == "article") {
      if (toolbarMode == "ajout") {
        dispatch(ajouterArticle());
        dispatch(viderChampsArticleInfo())
      }
      if (toolbarMode == "modification") {
        dispatch(modifierarticle(articleCode));
        dispatch(viderChampsArticleInfo())

      }
      if (toolbarMode == "suppression") {
        console.log("dd");
        dispatch(suprimerArticle(articleCode));
        dispatch(viderChampsArticleInfo())
      }
    }

    if(toolbarTable == "famille") {
      if(toolbarMode == "ajout") {
        
      }
    }
    dispatch(setAfficherAlert(false));
    closeToast();

    dispatch(setToolbarMode("consultation"));
  };

  useEffect(() => {
    if (afficherAlert) {
      toast(
        ({ closeToast }) => (
          <div
            style={{
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgb(42, 33, 133)",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                color: "#1f1f1f",
                textAlign: "center",
                fontSize: "18px",
                fontFamily: "Arial, sans-serif",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "12px" }}
            >
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
                onClick={() => handleConfirmerClick(closeToast)}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#211b70")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2a2185")}
              >
                {toolbarMode == "ajout"
                  ? "Ajouter"
                  : toolbarMode == "modification"
                  ? "Modifier"
                  : toolbarMode == "suppression"
                  ? "Supprimer"
                  : "par defaut"}
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

export default AlertModifier;
