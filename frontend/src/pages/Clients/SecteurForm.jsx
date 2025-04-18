import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setAfficherFamillePopub, setAfficherSecteurPopup } from "../../app/interface_slices/interfaceSlice";
import {
  ajouterFamille,
  setFamilleInfo,
} from "../../app/famille_slices/familleSlice";
import {
  ajouterSousFamille,
  setSousFamilleInfos,
} from "../../app/sousfamille_slices/sousfamilleSlice";
import { ajouterSecteur, setSecteurInfos } from "../../app/secteur_slices/secteurSlice";

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

const SecteurForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    champ1: "",
    champ2: "",
  });
  const dispatch = useDispatch();
  const afficherSecteurPopup = useSelector((state)=>state.interfaceSlice.afficherSecteurPopup)
  const togglePopup = () => {
    dispatch(setAfficherSecteurPopup(false));
  };

  const handleChange = (colonne, valeur) => {
  
      dispatch(setSecteurInfos({ colonne: colonne, valeur: valeur }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    togglePopup();
  };
  const toolbartable = useSelector((state) => state.interfaceSlice.toolbarTable);

  const hundleAjout = () => {
    if (toolbartable == "secteur") {
      dispatch(ajouterSecteur());
    }
    
    // if (toolbartable == "sousfamille") {
    //   dispatch(ajouterSousFamille());
    // }
  };
  console.log("ddd")
  const FamilleInfos = useSelector((state) => state.familleSlice.FamilleInfos);
  const secteurInfo=useSelector((state)=>state.secteurSlice.secteurInfo)

  const afficherFamillePopub = useSelector(
    (state) => state.interfaceSlice.afficherFamillePopub
  );
  return (
    <AppContainer>
      {afficherSecteurPopup && (
        <PopupContainer>
          <PopupContent>
            <h2>Formulaire Popup</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="champ1">Code secteur:</FormLabel>
                <FormInput
                  type="text"
                  id="champ1"
                  name="champ1"
                  value={toolbartable=="secteur"?secteurInfo.codesec:secteurInfo.codesec}
                 onChange={(e) => handleChange("codesec", e.target.value)}
                  placeholder="Entrez du texte ici"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="champ2">designation secteur:</FormLabel>
                <FormInput
                  type="text"
                  id="champ2"
                  name="champ2"
                  value={toolbartable=="secteur"?secteurInfo.desisec:secteurInfo.desisec}
                  onChange={(e) => handleChange("desisec", e.target.value)}
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

export default SecteurForm;
