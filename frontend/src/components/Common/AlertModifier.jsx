import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setActiverBoutonsValiderAnnuler,
  setActiverChampsForm,
  setAfficherAlert,
  setToolbarMode,
} from "../../app/interface_slices/interfaceSlice";
import {
  ajouterClient,
  getDerniereCodeClient,
  getToutCodesClient,
  majClient,
  setClientInfos,
  setDerniereCodeClient,
  setInsertionDepuisDevisForm,
  supprimerClient,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";

import {
  ajouterArticle,
  modifierarticle,
  setDerniereCodeArticle,
  suprimerArticle,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";

import { validerChampsForm } from "../../utils/validations";
import {
  AjouterDevis,
  annulerDevis,
  getListeNumbl,
  majDevis,
  setDerniereNumbl,
  setDevisInfo,
  viderChampsDevisInfo,
} from "../../app/devis_slices/devisSlice";

import {
  AjouterUtilisateur,
  ModifierUtilisateur,
  setViderChampsUtilisateur,
  supprimerUtilisateur,
} from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";
import { viderChampsInfosUtilisateur } from "../../app/utilisateur_slices/utilisateurSlice";
import { useNavigate } from "react-router-dom";
function AlertModifier() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const afficherAlert = useSelector(
    (state) => state.interfaceSlice.afficherAlert
  );
  const Utilisateur_SuperviseurInfos = useSelector(
    (state) => state.utilisateurSystemSlice.Utilisateur_SuperviseurInfos
  );
  const message = useSelector((state) => state.interfaceSlice.message);
  const toolbarTable = useSelector(
    (state) => state.interfaceSlice.toolbarTable
  );
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const clientSelectionne = useSelector(
    (state) => state.clientSlice.clientInfos
  ).code;
  const articleCode = useSelector(
    (state) => state.articleSlice.articleInfos
  ).code;
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const infosUtilisateur = useSelector(
    (state) => state.utilisateurSlice.infosUtilisateur
  );
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos)
  const insertionDepuisDevisForm = useSelector((state) => state.clientSlice.insertionDepuisDevisForm);
  //?==================================================================================================================
  //?=================================================appels UseEffect=================================================
  //?==================================================================================================================

  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================

  const handleConfirmerClick = async (closeToast) => {
    //*pour le client
    if (toolbarTable == "client") {
      if (toolbarMode == "ajout") {
        if(insertionDepuisDevisForm){
          dispatch(ajouterClient());
          dispatch(setDevisInfo({collone: "CODECLI", valeur: clientInfos.code}))
          dispatch(setDevisInfo({collone: "RSCLI", valeur: clientInfos.rsoc}))
          dispatch(setDevisInfo({collone: "ADRCLI", valeur: clientInfos.adresse}));
          navigate("/DevisFormTout");
        }
        if(!insertionDepuisDevisForm) {
          dispatch(ajouterClient()).then(() => {
            dispatch(getToutCodesClient());
          });
        }
        // dispatch(setDerniereCodeClient(""))
      }
      if (toolbarMode == "modification") {
        dispatch(majClient());
      }
      if (toolbarMode == "suppression") {
        dispatch(supprimerClient(clientSelectionne)).then(() => {
          dispatch(getToutCodesClient());
        });
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
        if (validerChampsForm("devis", devisInfo)) {
          dispatch(setInsertionDepuisDevisForm(false))
          dispatch(AjouterDevis());
          dispatch(viderChampsDevisInfo());
          // dispatch(setDerniereNumbl(""));
          // * pour obtenir la nouvelle liste de codes contenant le devis inseré
          dispatch(getListeNumbl());
        } else {
          alert("veuillez vérifier les données de formulaire");
        }
      }
      if (toolbarMode == "modification") {
        dispatch(majDevis(devisInfo.NUMBL));
        dispatch(viderChampsDevisInfo());
      }
      if (toolbarMode == "suppression") {
        dispatch(annulerDevis(devisInfo.NUMBL));
      }
    }
    // * pour l'article
    if (toolbarTable == "article") {
      if (toolbarMode == "ajout") {
        dispatch(ajouterArticle());
        dispatch(viderChampsArticleInfo());
        dispatch(setDerniereCodeArticle(""));
      }
      if (toolbarMode == "modification") {
        dispatch(modifierarticle(articleCode));
        dispatch(viderChampsArticleInfo());
      }
      if (toolbarMode == "suppression") {
        dispatch(suprimerArticle(articleCode));
        dispatch(viderChampsArticleInfo());
      }
    }
    //* pour l'utilisateur
    if (toolbarTable == "utilisateur") {
      if (toolbarMode == "ajout") {
        dispatch(AjouterUtilisateur());
      }
      if (toolbarMode == "modification") {
        dispatch(ModifierUtilisateur(infosUtilisateur.codeuser));
      }
      if (toolbarMode == "suppression") {
        dispatch(supprimerUtilisateur(infosUtilisateur.codeuser));
        dispatch(setViderChampsUtilisateur());
        dispatch(viderChampsInfosUtilisateur());
      }
    }
    // * pour la famille
    if (toolbarTable == "famille") {
      if (toolbarMode == "ajout") {
      }
    }
    dispatch(setAfficherAlert(false));
    dispatch(setActiverBoutonsValiderAnnuler(false));
    dispatch(setToolbarMode("consultation"));
    dispatch(setActiverChampsForm(false));
    closeToast();
  };

  useEffect(() => {
    if (afficherAlert) {
      toast(
        ({ closeToast }) => (
          <div
          // style={{
          //   borderRadius: "20px",
          //   boxShadow: "0px 4px 10px rgb(42, 33, 133)",
          // }}
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
                Confirmer
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
