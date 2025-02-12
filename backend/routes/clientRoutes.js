const express = require('express');
const router = express.Router();
const { getlisteclient,getlisteclientsfilter,AjouterClient } = require('../controllers/clientController');
router.get("/:dbName/ListeClient",getlisteclient);
router.get("/:dbName/filterClient",getlisteclientsfilter);
router.post("/:dbName/AjouterClient",AjouterClient);
module.exports = router;