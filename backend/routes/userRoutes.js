const express = require("express");
const router = express.Router();
const authenticateJWT = require("../authentification/authenticateToken");
const {
  registerUser,
  loginUser,
  selectDatabase,
  getLatestDevisByYear,
  getAllSectors,
  sendPasswordResetEmail,
  passwordReset,
} = require("../controllers/UserController");
const {
  getDevisDetails,
  getAllClients,
} = require("../controllers/UserController");

// * inscription pour un utilisateur
router.post("/register", registerUser);
// * connexion pour un utilisateur
router.post("/login", loginUser);
// * envoyer une demander de réinitialisation de mot de passe
router.post("/passwordResetRequest", sendPasswordResetEmail);
// * réinitialiser un mot de passe
router.put("/passwordReset", passwordReset);
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

module.exports = router;
