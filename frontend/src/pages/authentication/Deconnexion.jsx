import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deconnecterUtilisateur, deconnexionUtilisateur } from "../../app/utilisateur_slices/utilisateurSlice";

function Deconnexion() {
  console.log("interface deconnexion")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deconnexionUtilisateur(navigate));
  },[]);
  return <>...</>;
}

export default Deconnexion;
