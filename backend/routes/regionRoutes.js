const express = require("express");
const router = express.Router();
const {
  getListeCodeRegions,
  getVilleParRegion,
} = require("../controllers/regionController");

router.get("/:dbName/getListeCodeRegions", getListeCodeRegions);
router.get("/:dbName/getVilleParRegion/:codeRegion", getVilleParRegion);

module.exports = router;
