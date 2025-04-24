const express = require("express");
const { ajouterpointVente } = require("../controllers/pointVenteController");
const router = express.Router()

router.post("/:dbName/ajouterpointVente", ajouterpointVente)



module.exports = router;