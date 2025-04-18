const express = require("express");
const router = express.Router();
const {
    getDesignationSecteurparCodeSecteur,
    getListeCodesSecteur,
    ajouterSecteur
} = require("../controllers/secteurController");

router.get("/:dbName/getListeCodesSecteur", getListeCodesSecteur);
router.post("/:dbName/ajouterSecteur", ajouterSecteur);

router.get(
  "/:dbName/getDesignationSecteurparCodeSecteur/:codesecteur",
  getDesignationSecteurparCodeSecteur
);
module.exports = router;
