const express = require("express")
const router = express.Router()
const {
  getVilleParCodePostale,
  getListeCodesPosteaux,
  getCodePostalParVille,
  ajouterCodePostal
} = require("../controllers/codePostalController");

router.get("/:dbName/getListeCodesPosteaux", getListeCodesPosteaux);
router.get("/:dbName/getVilleParCodePostale/:cp", getVilleParCodePostale);
router.get("/:dbName/getCodePostalParVille", getCodePostalParVille);
router.post("/:dbName/ajouterCodePostal", ajouterCodePostal);


module.exports = router;
