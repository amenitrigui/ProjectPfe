import React from "react";
import UtilisateurForm from "../../components/Utilisateur/UtilisateurForm";
import AlertModifier from "../../components/Common/AlertModifier";
function UtilisateurFormTout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        <AlertModifier />
        <UtilisateurForm />
        <br />
      </div>
    </div>
  );
}

export default UtilisateurFormTout;
