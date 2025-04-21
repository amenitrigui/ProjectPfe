const express = require("express");
const router = express.Router();
const {
  getListeCodeRegions,
  getVilleParRegion,
  ajouterRegion
} = require("../controllers/regionController");

router.get("/:dbName/getListeCodeRegions", getListeCodeRegions);
router.get("/:dbName/getVilleParRegion/:codeRegion", getVilleParRegion);
router.post("/:dbName/ajouterRegion", ajouterRegion);


module.exports = router;
