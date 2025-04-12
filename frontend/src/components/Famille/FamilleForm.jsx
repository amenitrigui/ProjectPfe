import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setAfficherFamillePopub } from "../../app/interface_slices/uiSlice";
import {
  ajouterFamille,
  setFamilleInfo,
} from "../../app/famille_slices/familleSlice";
import {
  ajouterSousFamille,
  setSousFamilleInfos,
} from "../../app/sousfamille_slices/sousfamilleSlice";

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
  const toolbartable = useSelector((state) => state.uiStates.toolbarTable);

  const hundleAjout = () => {
    if (toolbartable == "famille") {
      dispatch(ajouterFamille());
    }
    if (toolbartable == "sousfamille") {
      dispatch(ajouterSousFamille());
    }
  };
  const FamilleInfos = useSelector((state) => state.familleSlice.FamilleInfos);
  const SousFamilleInfos=useSelector((state)=>state.sousfamilleSlice.SousFamilleInfos)

  const afficherFamillePopub = useSelector(
    (state) => state.uiStates.afficherFamillePopub
  );
  return (
    <AppContainer>
      {afficherFamillePopub && (
        <PopupContainer>
          <PopupContent>
            <h2>Formulaire Popup</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="champ1">Code:</FormLabel>
                <FormInput
                  type="text"
                  id="champ1"
                  name="champ1"
                  value={toolbartable=="famille"?FamilleInfos.code:SousFamilleInfos.code}
                  onChange={(e) => handleChange("code", e.target.value, toolbartable=="famille" ?"famille": "sousfamille")}
                  placeholder="Entrez du texte ici"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="champ2">Libelle:</FormLabel>
                <FormInput
                  type="text"
                  id="champ2"
                  name="champ2"
                  value={toolbartable=="famille"?FamilleInfos.libelle:SousFamilleInfos.libelle}
                  onChange={(e) => handleChange("libelle", e.target.value,toolbartable=="famille" ?"famille": "sousfamille")}
                  placeholder="Entrez du texte ici"
                  required
                />
              </FormGroup>

              <ButtonsContainer>
                <CancelButton type="button" onClick={togglePopup}>
                  Annuler
                </CancelButton>
                <SubmitButton type="submit" onClick={() => hundleAjout()}>
                  Valider
                </SubmitButton>
              </ButtonsContainer>
            </form>
          </PopupContent>
        </PopupContainer>
      )}
    </AppContainer>
  );
};

export default FamilleForm;
