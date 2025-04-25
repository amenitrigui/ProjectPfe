import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  setAfficherSecteurPopup,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import {
  ajouterSecteur,
  setSecteurInfos,
} from "../../app/secteur_slices/secteurSlice";
import {
  ajouterRegion,
  setRegionInfos,
} from "../../app/region_slices/regionSlice";
import {
  ajouterCodePostal,
  setCodePostaleInfos,
  viderChampsCPostalInfo,
} from "../../app/cpostal_slices/cpostalSlice";
import { useLocation } from "react-router-dom";
import {
  ajouterpointVente,
  setPointVenteInfos,
} from "../../app/pointVente_slice/pointVenteSlice";
import { setClientInfos } from "../../app/client_slices/clientSlice";

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
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

const Secteur_Region_CpostalForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const afficherSecteurPopup = useSelector(
    (state) => state.interfaceSlice.afficherSecteurPopup
  );
  const toolbartable = useSelector(
    (state) => state.interfaceSlice.toolbarTable
  );

  const secteurInfo = useSelector((state) => state.secteurSlice.secteurInfo);
  const regionInfo = useSelector((state) => state.regionSlice.RegionInfo);
  const cpostaleInfo = useSelector(
    (state) => state.codePostaleSlice.CpostaleInfo
  );

  const togglePopup = () => {
    dispatch(setAfficherSecteurPopup(false));
    if (location.pathname.toLowerCase() === "/clientformtout") {
      dispatch(setToolbarTable("client"));
    }
  };

  const handleChange = (colonne, valeur) => {
    console.log(colonne, " ", valeur)
    if (toolbartable == "pointvente") {
      dispatch(setPointVenteInfos({ colonne, valeur }));
      
      if(colonne == "Code") {
        dispatch(setClientInfos({colonne: "codepv", valeur}))
      }
      if(colonne == "Libelle") {
        dispatch(setClientInfos({colonne: "Libelle", valeur}))
      }
    }
    if (toolbartable == "codepostale") {
      dispatch(setCodePostaleInfos({ colonne, valeur }));
      
      if(colonne == "CODEp") {
        dispatch(setClientInfos({colonne: "CODEp", valeur}))
      }
      if(colonne == "desicp") {
        dispatch(setClientInfos({colonne: "desicp", valeur}))
      }
    }
    
    if (toolbartable == "secteur") {
      dispatch(setSecteurInfos({ colonne, valeur }));
      if(colonne == "codesec") {
        dispatch(setClientInfos({colonne: "codes", valeur}))
      }
      if(colonne == "desisec") {
        dispatch(setClientInfos({colonne: "desisec", valeur}))
      }
    }
    if (toolbartable == "region") {
      dispatch(setRegionInfos({ colonne, valeur }));
    }
    if(colonne == "codesec") {
      dispatch(setClientInfos({colonne: "codes", valeur}))
    }
    if(colonne == "codergg") {
      dispatch(setClientInfos({colonne: "codergg", valeur}))
    }
    if(colonne == "desirgg") {
      dispatch(setClientInfos({colonne: "desirgg", valeur}))
    }
  };
  const pointVenteInfo = useSelector(
    (state) => state.pointVenteSlice.pointVenteInfo
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    togglePopup();
  };

  const hundleAjout = () => {
    if (toolbartable === "secteur") {
      dispatch(ajouterSecteur());
      console.log(secteurInfo);
    }
    if (toolbartable === "region") {
      dispatch(ajouterRegion());
    }
    if (toolbartable === "codepostale") {
      dispatch(ajouterCodePostal());
    }
    if (toolbartable === "pointvente") {
      dispatch(ajouterpointVente());
    }
    togglePopup();
  };

  const getCodeValue = () => {
    if (toolbartable === "secteur") return secteurInfo.codesec;
    if (toolbartable === "region") return regionInfo.codergg;
    if (toolbartable === "codepostale") return cpostaleInfo.CODEp;
    if (toolbartable === "pointvente") return cpostaleInfo.Code;

    return "";
  };

  const getLabel = () => {
    if (toolbartable === "secteur") return "Code secteur";
    if (toolbartable === "region") return "Code région";
    if (toolbartable === "codepostale") return "Code postale";
    if (toolbartable === "pointvente") return "Code pointVente";

    return "";
  };
  const getLabel2 = () => {
    if (toolbartable === "secteur") return "designation Secteur";
    if (toolbartable === "region") return "designation region";
    if (toolbartable === "codepostale") return "designation code postale";
    if (toolbartable === "pointvente") return "designation code point vente";
  };
  const getDesignationValue = () => {
    if (toolbartable === "secteur") return secteurInfo.desisec;
    if (toolbartable === "region") return regionInfo.desirgg;
    if (toolbartable === "codepostale") return cpostaleInfo.desicp;
    if (toolbartable === "pointvente") return pointVenteInfo.Libelle;

    return "";
  };

  const handleDesignationChange = (e) => {
    const valeur = e.target.value;
    if (toolbartable === "secteur") handleChange("desisec", valeur);
    if (toolbartable === "region") handleChange("desirgg", valeur);
    if (toolbartable === "codepostale") handleChange("desicp", valeur);
    if (toolbartable === "pointvente") handleChange("Libelle", valeur);
  };

  return (
    <AppContainer>
      {afficherSecteurPopup && (
        <PopupContainer>
          <PopupContent>
            <h2>
              Formulaire{" "}
              {toolbartable === "secteur"
                ? "Secteur"
                : toolbartable === "region"
                ? "Région"
                : toolbartable === "codepostale"
                ? "Code postale"
                : toolbartable === "pointvente"
                ? "Point vente"
                : ""}
            </h2>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="champ1">{getLabel()}</FormLabel>
                <FormInput
                  type="text"
                  id="champ1"
                  name="champ1"
                  value={getCodeValue()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (toolbartable === "secteur") {
                      handleChange("codesec", val);
                    }
                    if (toolbartable === "region") {
                      handleChange("codergg", val);
                    }
                    if (toolbartable === "codepostale") {
                      handleChange("CODEp", val);
                    }
                    if (toolbartable === "pointvente")
                      handleChange("Code", val);
                  }}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="champ2">{getLabel2()}</FormLabel>
                <FormInput
                  type="text"
                  id="champ2"
                  name="champ2"
                  value={getDesignationValue()}
                  onChange={handleDesignationChange}
                  required
                />
              </FormGroup>

              <ButtonsContainer>
                <CancelButton type="button" onClick={togglePopup}>
                  Annuler
                </CancelButton>
                <SubmitButton type="submit" onClick={hundleAjout}>
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

export default Secteur_Region_CpostalForm;
