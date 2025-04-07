const express = require("express");
const { getListeFamillesParCodeFamille, getListeFamillesParLibelleFamille } = require("../controllers/familleController");
const router = express.Router()

router.get("/:dbName/getListeFamillesParCodeFamille/:codeFamille", getListeFamillesParCodeFamille)
router.get("/:dbName/getListeFamillesParLibelleFamille/:LibelleFamille", getListeFamillesParLibelleFamille)


module.exports = router;