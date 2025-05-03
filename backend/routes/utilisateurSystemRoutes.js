const express = require("express");
const {
  AjouterUtilisateur,
  getDerniereCodeUtilisateur,
  ModifierUtilisateur,
  supprimerUtilisateur,
  getListeUtilisateurParCode,
  getListeUtilisateurParDirecteur,
  getListeUtilisateurParType,
  getListeUtilisateurParNom,
  getListeUtilisateur,
  filterListeUtilisateur,
  getCodeUtilisateurSuivant,
  getListeCodesUtilisateur,
  getUtilisateurParCode
} = require("../controllers/utilisateurSystemController");

const router = express.Router();
// * inscription pour un utilisateur
router.post("/AjouterUtilisateur", AjouterUtilisateur);
router.get("/getDerniereCodeUtilisateur", getDerniereCodeUtilisateur);
router.put("/ModifierUtilisateur", ModifierUtilisateur);
router.delete("/supprimerUtilisateur", supprimerUtilisateur);
router.get("/getListeUtilisateurParCode", getListeUtilisateurParCode);
router.get("/getListeUtilisateurParNom", getListeUtilisateurParNom);
router.get("/getListeUtilisateurParDirecteur", getListeUtilisateurParDirecteur);
router.get("/getListeUtilisateurParType", getListeUtilisateurParType);
router.get("/getListeUtilisateur", getListeUtilisateur);
router.get("/filterListeUtilisateur", filterListeUtilisateur);
router.get("/getCodeUtilisateurSuivant", getCodeUtilisateurSuivant);
router.get("/getListeCodesUtilisateur", getListeCodesUtilisateur);
router.get("/getUtilisateurParCode", getUtilisateurParCode);
module.exports = router;
