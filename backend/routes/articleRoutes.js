const express = require("express");
const { getFamilles, getCodesByFamille, getArticleDetailsByCode } = require("../controllers/articleController");
//const {  getArticleDetailsByCode } = require("../controllers/articleControllerPlaceholder");
const router = express.Router();

//hthi 5dmtna
router.get("/:dbName/familles", getFamilles);
router.get("/:dbName/codes/famille/:famille", getCodesByFamille);
router.get("/:dbName/articles/details/:code", getArticleDetailsByCode);








// router.post("/:dbName/articles/:code/updateConfig", updateConfig);
// router.get(
//   "/search/:searchType/:dbName/:searchTerm",
//   getSearchResultsByClientOrNumbl
// );

// router.get("/code/:dbName", getAllCodeCli);
// router.get("/:dbName/last-numbl", getLastNumbl);

module.exports = router;
