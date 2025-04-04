const express = require("express");
const router = express.Router();
const authenticateJWT = require("../authentification/authenticateToken");
const {
  inscrireUtilisteur,
  loginUtilisateur,
  selectDatabase,
  getLatestDevisByYear,
  getAllSectors,
  envoyerDemandeReinitialisationMp,
  reinitialiserMotPasse,
  getUtilisateurParCode
} = require("../controllers/utilisateurController");
const {
  getDevisDetails,
  getAllClients,
} = require("../controllers/utilisateurController");

// * inscription pour un utilisateur
router.post("/inscrireUtilisteur", inscrireUtilisteur);
// * connexion pour un utilisateur
router.post("/loginUtilisateur", loginUtilisateur);
// * envoyer une demander de réinitialisation de mot de passe
router.post("/envoyerDemandeReinitialisationMp", envoyerDemandeReinitialisationMp);
// * réinitialiser un mot de passe
router.put("/reinitialiserMotPasse", reinitialiserMotPasse);
// * selectionner la base de données (societé) à gèrer
router.post("/select-database", selectDatabase);
// * get a single devis details
router.get("/get-devis-details/:databaseName/:NUMBL", getDevisDetails);
// * get latest devis by year
router.get("/get-devis-details/:databaseName", getLatestDevisByYear);
// * récuperer la liste des clients d'une société dont l'utilisateur utiliser son erp ?
router.get("/:databaseName/clients", getAllClients);
// * récuperer la liste des secteurs ?
router.get("/secteurs/:databaseName", getAllSectors);
// * récuperer un utilisateur par son code
router.get("/getUtilisateurParCode", getUtilisateurParCode);

module.exports = router;
