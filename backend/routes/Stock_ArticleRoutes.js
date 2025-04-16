const express = require("express");
const { getlistepointvente, getListedepotdeStockparpcodepointvente, getQteTotalArticle, getQteTotalArticlParPointVente } = require("../controllers/stock_articleController");
const router = express.Router();

router.get("/:dbName/getlistepointvente", getlistepointvente);
router.get("/:dbName/getListedepotdeStockparpcodepointvente", getListedepotdeStockparpcodepointvente);
router.get("/:dbName/getQteTotalArticle", getQteTotalArticle);
router.get("/:dbName/getQteTotalArticlParPointVente", getQteTotalArticlParPointVente);


module.exports = router;
