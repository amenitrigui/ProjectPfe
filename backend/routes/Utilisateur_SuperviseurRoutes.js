const express = require("express");
const { AjouterUtilisateur, getDerniereCodeUtilisateur, ModifierUtilisateur, supprimerUtilisateur,getCodeUtilisateurParCode } = require("../controllers/Utilisateur_SuperviseurController");

const router = express.Router();
// * inscription pour un utilisateur
router.post("/AjouterUtilisateur", AjouterUtilisateur);
router.get("/getDerniereCodeUtilisateur", getDerniereCodeUtilisateur);
router.put("/ModifierUtilisateur", ModifierUtilisateur);
router.delete("/supprimerUtilisateur", supprimerUtilisateur);
router.get("/getCodeUtilisateurParCode", getCodeUtilisateurParCode);








module.exports = router;