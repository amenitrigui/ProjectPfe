const express = require("express");
const router = express.Router();
const {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  getClientParCode,
  majClient,
} = require("../controllers/clientController");
router.get("/:dbName/List", getListeClients);
router.get("/:dbName/filterClient", filtrerListeClients);
router.get("/:dbName/client/:code", getClientParCode);
router.post("/:dbName/Add", AjouterClient);
router.delete("/:dbName/Delete/", supprimerClient);
router.put("/:dbName/Update", majClient);
module.exports = router;
