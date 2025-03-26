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
  getClientParCin,
  getToutCodesClient,
} = require("../controllers/clientController");

router.post("/:dbName/AjouterClient", AjouterClient);
router.get("/:dbName/getClientParCode/:code", getClientParCode);
router.put("/:dbName/majClient", majClient);
router.delete("/:dbName/Delete/:code", supprimerClient);
router.get("/:dbName/getListeClients", getListeClients);
router.get("/:dbName/filtrerListeClients", filtrerListeClients);
router.get("/:dbName/getClientParTypecli/:typecli", getClientParTypecli);
router.get("/:dbName/getDerniereCodeClient", getDerniereCodeClient);
router.get("/:dbName/getClientParCin/:cin", getClientParCin);

router.get("/:dbName/getToutCodesClient", getToutCodesClient);
router.get("/:dbName/getClientParCode/:code", getClientParCode);

module.exports = router;
