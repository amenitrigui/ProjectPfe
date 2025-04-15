const express = require("express");
const { getListeSousFamillesParCodeSousFamille, getListeSousFamillesParLibelleSousFamille, ajouterSousFamille } = require("../controllers/sousfamilleController");
const router = express.Router()
router.get("/:dbName/getListeSousFamillesParCodeSousFamille/:codeSousFamille", getListeSousFamillesParCodeSousFamille)
router.get("/:dbName/getListeSousFamillesParLibelleSousFamille/:LibelleSousFamille", getListeSousFamillesParLibelleSousFamille)
router.post("/:dbName/ajouterSousFamille", ajouterSousFamille)



module.exports = router;