import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deconnecterUtilisateur } from "../../app/utilisateur_slices/utilisateurSlice";

function Deconnexion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("nice bro")
    dispatch(deconnecterUtilisateur(navigate));
  },[]);
  return <>...</>;
}

export default Deconnexion;
