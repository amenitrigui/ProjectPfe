const express = require("express");
const router = express.Router();
const {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  getClient,
  majClient,
} = require("../controllers/clientController");
router.get("/:dbName/List", getListeClients);
router.get("/:dbName/filterClient", filtrerListeClients);
router.get("/:dbName/Get/:code", getClient);
router.post("/:dbName/Add", AjouterClient);
router.delete("/:dbName/Delete/", supprimerClient);
router.put("/:dbName/Update", majClient);
module.exports = router;
