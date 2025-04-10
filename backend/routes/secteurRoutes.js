const express = require("express");
const router = express.Router();
const {
    getDesignationSecteurparCodeSecteur,
    getListeCodesSecteur,
} = require("../controllers/secteurController");

router.get("/:dbName/getListeCodesSecteur", getListeCodesSecteur);
router.get(
  "/:dbName/getDesignationSecteurparCodeSecteur/:codesecteur",
  getDesignationSecteurparCodeSecteur
);
module.exports = router;
