const express = require("express");
const { getListeFamillesParCodeFamille } = require("../controllers/familleController");
const router = express.Router()

router.get("/:dbName/getListeFamillesParCodeFamille", getListeFamillesParCodeFamille)

module.exports = router;