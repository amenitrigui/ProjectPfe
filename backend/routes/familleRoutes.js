const express = require("express");
const { getListeFamillesParCodeFamille, getListeFamillesParLibelleFamille, ajouterFamille } = require("../controllers/familleController");
const router = express.Router()

router.get("/:dbName/getListeFamillesParCodeFamille", getListeFamillesParCodeFamille)
router.get("/:dbName/getListeFamillesParLibelleFamille/:LibelleFamille", getListeFamillesParLibelleFamille)
router.post("/:dbName/ajouterFamille", ajouterFamille)



module.exports = router;