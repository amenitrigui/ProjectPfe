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
  getToutCodesClient
} = require("../controllers/clientController");
router.get("/:dbName/List", getListeClients);
router.get("/:dbName/filterClient", filtrerListeClients);
router.post("/:dbName/Add", AjouterClient);
router.delete("/:dbName/Delete/", supprimerClient);
router.put("/:dbName/Update", majClient);
router.get("/:dbName/getClientParTypecli", getClientParTypecli);
router.get("/:dbName/getDerniereCodeClient", getDerniereCodeClient);
router.get("/:dbName/getClientParCin", getClientParCin);


router.get("/:dbName/getToutCodesClient", getToutCodesClient);
router.get("/:dbName/client/:code", getClientParCode);

module.exports = router;
