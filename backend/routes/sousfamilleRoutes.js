const express = require("express");
const { getListeSousFamillesParCodeSousFamille, getListeSousFamillesParLibelleSousFamille } = require("../controllers/sousfamilleController");
const router = express.Router()
router.get("/:dbName/getListeSousFamillesParCodeSousFamille/:codeSousFamille", getListeSousFamillesParCodeSousFamille)
router.get("/:dbName/getListeSousFamillesParLibelleSousFamille/:LibelleSousFamille", getListeSousFamillesParLibelleSousFamille)


module.exports = router;