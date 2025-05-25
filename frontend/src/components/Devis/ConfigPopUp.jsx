import React, { useState } from "react";
import { setAfficherConfigPopup, setLignedevisSelectionne } from "../../app/interface_slices/interfaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLigneDevisInfos, setLigneDevisInfosEntiere, viderChampsArticleInfo } from "../../app/article_slices/articleSlice";
import {
  setDevisArticles,
  setDevisInfo,
} from "../../app/devis_slices/devisSlice";

function ConfigPopUp(props) {
  const dispatch = useDispatch();
  const netHt = props.netHt;
  const puttc = props.puttc;
  const ligneDevisInfos = useSelector(
    (state) => state.articleSlice.ligneDevisInfos
  );
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  console.log(ligneDevisInfos);
  const handleSubmit = (type) => {
    if (type == "supprimer") {
      console.log("supprimer");
      dispatch(setLigneDevisInfos({ colonne: "Conf", valeur: "" }));
    }
    if (type == "confirmer") {

      dispatch(setDevisArticles(ligneDevisInfos));
      dispatch(
        setDevisInfo({
          collone: "MHT",
          valeur: parseInt(devisInfo.MHT) + parseInt(netHt),
        })
      );
      dispatch(
        setDevisInfo({
          collone: "MREMISE",
          valeur: (
            parseInt(devisInfo.MREMISE) +
            parseFloat(ligneDevisInfos.PUART) *
              parseFloat(ligneDevisInfos.Remise / 100)
          ).toFixed(3),
        })
      );
      dispatch(
        setDevisInfo({
          collone: "MTTC",
          valeur: parseInt(devisInfo.MTTC) + parseInt(puttc),
        })
      );

      dispatch(viderChampsArticleInfo());
      // * vider l'objet ligne devis infos
      dispatch(setLigneDevisInfosEntiere({}));
      // * vider l'objet ligne devis selectionné
      dispatch(setLignedevisSelectionne([]));

      dispatch(setAfficherConfigPopup(false))
    }
  };

  // Inline styles instead of <style> tag
  const styles = {
    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    popupContainer: {
      background: "white",
      padding: "25px",
      borderRadius: "8px",
      width: "400px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    inputContainer: {
      margin: "20px 0",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
    },
    button: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: 500,
      flex: 1,
    },
    confirmButton: {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    cancelButton: {
      backgroundColor: "#f44336",
      color: "white",
    },
    customButton: {
      backgroundColor: "#2196F3",
      color: "white",
    },
  };

  return (
    <div style={styles.popupOverlay}>
      <div style={styles.popupContainer}>
        <h2>
          Configuration
          <button
            className="flex float-end"
            onClick={() => {
              dispatch(setAfficherConfigPopup(false));
            }}
          >
            X
          </button>
        </h2>

        <div style={styles.inputContainer}>
          <textarea
            type="text"
            rows={6}
            value={ligneDevisInfos.Conf}
            onChange={(e) => {
              dispatch(
                setLigneDevisInfos({ colonne: "Conf", valeur: e.target.value })
              );
            }}
            placeholder="Config"
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.confirmButton }}
            onClick={() => handleSubmit("confirmer")}
          >
            Confirmer Config
          </button>

          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={() => handleSubmit("supprimer")}
          >
            Supprimer Config
          </button>

          <button
            style={{ ...styles.button, ...styles.customButton }}
            onClick={() => {
              dispatch(setAfficherConfigPopup(false));
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigPopUp;
