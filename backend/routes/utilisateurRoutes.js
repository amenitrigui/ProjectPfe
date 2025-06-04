const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authenticateJWT = require("../authentification/authenticateToken");
const {
  loginUtilisateur,
  selectDatabase,
  envoyerDemandeReinitialisationMp,
  reinitialiserMotPasse,
  getUtilisateurParCode,
  deconnecterUtilisateur,
  // uploadImageUtilisateur,
 
} = require("../controllers/utilisateurController");

// Configuration Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'user-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Seules les images (jpeg, jpg, png, gif) sont autorisées'));
  }
});

// Routes d'authentification
router.post("/loginUtilisateur", loginUtilisateur);
router.post("/deconnecterUtilisateur", deconnecterUtilisateur);

// Routes de gestion de mot de passe
router.post("/envoyerDemandeReinitialisationMp", envoyerDemandeReinitialisationMp);
router.put("/reinitialiserMotPasse", reinitialiserMotPasse);

// Routes de gestion utilisateur
router.get("/getUtilisateurParCode/:codeuser", getUtilisateurParCode);
router.post("/select-database", selectDatabase);


// Route pour l'upload d'image avec authentification JWT optionnelle
// router.post(
//   "/uploadImage/:codeuser", 
//   authenticateJWT, // Optionnel - à ajouter si nécessaire
//   upload.single('image'), 
//   uploadImageUtilisateur
// );

module.exports = router;