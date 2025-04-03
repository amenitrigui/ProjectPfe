const express = require("express");
const { getListeFamilles, getCodesArticlesByFamille, getToutCodesArticle ,suprimerArticle, getArticle, ajouterArticle, modifierArticle, getListeArticles, filtrerListeArticle } = require("../controllers/articleController");
const { getArticleDetailsByCode } = require("../controllers/articleControllerPlaceholder");
//const {  getArticleDetailsByCode } = require("../controllers/articleControllerPlaceholder");
const router = express.Router();

//hthi 5dmtna
router.get("/:dbName/getListeFamilles", getListeFamilles);
// ! ddddd
router.get("/:dbName/codes/famille/:famille", getCodesArticlesByFamille);
router.get("/:dbName/articles/details/:code", getArticleDetailsByCode);
router.delete("/:dbName/suprimerArticle/:code", suprimerArticle);
router.get("/:dbName/getArticle/:code", getArticle);
router.post("/:dbName/ajouterArticle", ajouterArticle);
router.put("/:dbName/modifierArticle/:code", modifierArticle);
router.get("/:dbName/getListeArticles", getListeArticles);
router.post("/:dbName/filtrerListeArticle", filtrerListeArticle);
router.get("/:dbName/getToutCodesArticle", getToutCodesArticle);


















// router.post("/:dbName/articles/:code/updateConfig", updateConfig);
// router.get(
//   "/search/:searchType/:dbName/:searchTerm",
//   getSearchResultsByClientOrNumbl
// );

// router.get("/code/:dbName", getAllCodeCli);
// router.get("/:dbName/last-numbl", getLastNumbl);

module.exports = router;
