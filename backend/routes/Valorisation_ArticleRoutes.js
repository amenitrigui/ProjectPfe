const express = require("express");
const { getPrixVente } = require("../controllers/valorisation_artcileController");

const router = express.Router();

router.get("/:dbName/getPrixVente", getPrixVente);




module.exports = router;
