const express = require("express")
const router = express.Router()
const {
  getVilleParCodePostale,
  getListeCodesPosteaux,
  getCodePostalParVille
} = require("../controllers/codePostalController");

router.get("/:dbName/getListeCodesPosteaux", getListeCodesPosteaux);
router.get("/:dbName/getVilleParCodePostale/:cp", getVilleParCodePostale);
router.get("/:dbName/getCodePostalParVille", getCodePostalParVille);

module.exports = router;
