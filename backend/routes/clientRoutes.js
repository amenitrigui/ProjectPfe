const express = require('express');
const router = express.Router();
const { getlisteclient,getlisteclientsfilter } = require('../controllers/clientController');
router.get("/:dbName/ListeClient",getlisteclient);
router.get("/:dbName/filterClient",getlisteclientsfilter);

module.exports = router;