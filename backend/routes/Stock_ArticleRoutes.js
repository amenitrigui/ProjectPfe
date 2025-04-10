const express = require("express");
const { getlistepointvente, getListedepotdeStockparpcodepointvente } = require("../controllers/stock_articleController");
const router = express.Router();

router.get("/:dbName/getlistepointvente", getlistepointvente);
router.get("/:dbName/getListedepotdeStockparpcodepointvente", getListedepotdeStockparpcodepointvente);



module.exports = router;
