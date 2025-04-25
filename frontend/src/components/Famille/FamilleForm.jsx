import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setAfficherFamillePopub } from "../../app/interface_slices/interfaceSlice";
import {
  ajouterFamille,
  setFamilleInfo,
} from "../../app/famille_slices/familleSlice";
import {
  ajouterSousFamille,
  setSousFamilleInfos,
} from "../../app/sousfamille_slices/sousfamilleSlice";
import { setArticleInfos } from "../../app/article_slices/articleSlice";

// Définition des animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Création des composants stylisés
const AppContainer = styled.div`
  text-align: center;
`;

const OpenPopupButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  padding: 20px;
  animation: ${fadeIn} 0.3s;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0b7dda;
  }
`;

const FamilleForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    champ1: "",
    champ2: "",
  });
  const dispatch = useDispatch();
  const togglePopup = () => {
    dispatch(setAfficherFamillePopub(false));
  };

  const handleChange = (colonne, valeur, NomTable) => {
    if (NomTable == "famille")
      dispatch(setFamilleInfo({ colonne: colonne, valeur: valeur }));
    if (NomTable == "sousfamille") {
      dispatch(setSousFamilleInfos({ colonne: colonne, valeur: valeur }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    togglePopup();
  };
  const toolbartable = useSelector((state) => state.interfaceSlice.toolbarTable);
  const FamilleInfos = useSelector((state) => state.familleSlice.FamilleInfos);
  const SousFamilleInfos=useSelector((state)=>state.sousfamilleSlice.SousFamilleInfos)
console.log(toolbartable)
  const hundleAjout = () => {
    if (toolbartable == "famille") {

      dispatch(ajouterFamille());
      dispatch(setArticleInfos({colonne:"famille",valeur:FamilleInfos.code}))
      dispatch(setArticleInfos({colonne:"libelleFamille",valeur:FamilleInfos.libelle}))

    }
    if (toolbartable == "sousfamille") {

      dispatch(ajouterSousFamille());
      dispatch(setArticleInfos({colonne:"codesousfam",valeur:SousFamilleInfos.code}))
      dispatch(setArticleInfos({colonne:"Libellesousfamille",valeur:SousFamilleInfos.libelle}))
    }
  };


  const afficherFamillePopub = useSelector(
    (state) => state.interfaceSlice.afficherFamillePopub
  );
  return (
    <AppContainer style={{ position: "relative", zIndex: 10 }}>
    {afficherFamillePopub && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          zIndex: 999,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "10px",
            padding: "2rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>Formulaire Popup</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="champ1" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                Code:
              </label>
              <input
                type="text"
                id="champ1"
                name="champ1"
                value={toolbartable === "famille" ? FamilleInfos.code : SousFamilleInfos.code}
                onChange={(e) =>
                  handleChange("code", e.target.value, toolbartable === "famille" ? "famille" : "sousfamille")
                }
                placeholder="Entrez du texte ici"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
  
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="champ2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                Libelle:
              </label>
              <input
                type="text"
                id="champ2"
                name="champ2"
                value={toolbartable === "famille" ? FamilleInfos.libelle : SousFamilleInfos.libelle}
                onChange={(e) =>
                  handleChange("libelle", e.target.value, toolbartable === "famille" ? "famille" : "sousfamille")
                }
                placeholder="Entrez du texte ici"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
  
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <button
                type="button"
                onClick={togglePopup}
                style={{
                  backgroundColor: "#ccc",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                onClick={() => hundleAjout()}
                style={{
                  backgroundColor: "#2a2185",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </AppContainer>
  
  );
};

export default FamilleForm;
