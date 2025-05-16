const express = require("express");
const { ajouterpointVente ,getListePointVente,getLibellePointVneteparPVente} = require("../controllers/pointVenteController");
const router = express.Router()

router.post("/:dbName/ajouterpointVente", ajouterpointVente)
router.get("/:dbName/getListePointVente", getListePointVente)
router.get("/:dbName/getLibellePointVneteparPVente", getLibellePointVneteparPVente)





module.exports = router;