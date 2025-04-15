const express = require("express");
const router = express.Router();
const authenticateJWT = require("../authentification/authenticateToken");
const {
  loginUtilisateur,
  selectDatabase,
  envoyerDemandeReinitialisationMp,
  reinitialiserMotPasse,
  getUtilisateurParCode,
} = require("../controllers/utilisateurController");

// * connexion pour un utilisateur
router.post("/loginUtilisateur", loginUtilisateur);
// * envoyer une demander de réinitialisation de mot de passe
router.post(
  "/envoyerDemandeReinitialisationMp",
  envoyerDemandeReinitialisationMp
);
// * réinitialiser un mot de passe
router.put("/reinitialiserMotPasse", reinitialiserMotPasse);
// * selectionner la base de données (societé) à gèrer
router.post("/select-database", selectDatabase);
// * récuperer un utilisateur par son code
router.get("getUtilisateurParCode/:codeuser", getUtilisateurParCode);

module.exports = router;
