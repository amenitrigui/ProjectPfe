const express = require("express");
const router = express.Router();
const {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  majClient,
  getClientParCode,
  getDerniereCodeClient,
  getClientParTypecli,
  getDesignationSecteurparCodeSecteur,
  getClientParCin,
  getToutCodesClient,
  getVilleParCodePostale,
  getVilleParRegion,
  getListeCodesPosteaux,
  getListeCodesSecteur,
  getListeCodeRegions,
} = require("../controllers/clientController");
router.get("/:dbName/List", getListeClients);
router.get("/:dbName/filterClient", filtrerListeClients);
router.post("/:dbName/Add", AjouterClient);
router.delete("/:dbName/Delete/:code", supprimerClient);
router.put("/:dbName/Update", majClient);
router.get("/:dbName/getClientParTypecli", getClientParTypecli);
router.get("/:dbName/getDerniereCodeClient", getDerniereCodeClient);
router.get("/:dbName/getClientParCin/:cin", getClientParCin);

router.get("/:dbName/getToutCodesClient", getToutCodesClient);
router.get("/:dbName/getClientParCode/:code", getClientParCode);
router.get("/:dbName/getListeCodesPosteaux", getListeCodesPosteaux);
router.get("/:dbName/getVilleParCodePostale/:cp", getVilleParCodePostale);

router.get("/:dbName/getListeCodesSecteur", getListeCodesSecteur);
router.get("/:dbName/getDesignationSecteurparCodeSecteur/:codesecteur", getDesignationSecteurparCodeSecteur)

router.get("/:dbName/getListeCodeRegions", getListeCodeRegions)
router.get("/:dbName/getVilleParRegion/:codeRegion", getVilleParRegion)



module.exports = router;
