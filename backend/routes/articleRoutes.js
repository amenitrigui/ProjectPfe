const express = require("express");
const {
  getListeFamilles,
  getCodesArticlesByFamille,
  getToutCodesArticle,
  suprimerArticle,
  getArticleParCode,
  ajouterArticle,
  modifierArticle,
  getListeArticles,
  filtrerListeArticle,
  getDesignationFamilleParCodeFamille,
  getListecodesousFamille,
  getCodeFamilleParDesignationFamille,
  getdesignationSousFamillebycodeSousFamille,
  getCodeSousFamilleParDesignationSousFamille,
  getArticleParLibelle,
  getListeArticleparFamille,
  getListeArticleparLibelle
} = require("../controllers/articleController");
const {
  getArticleDetailsByCode,
} = require("../controllers/articleControllerPlaceholder");
//const {  getArticleDetailsByCode } = require("../controllers/articleControllerPlaceholder");
const router = express.Router();

//hthi 5dmtna
router.get("/:dbName/getListeFamilles", getListeFamilles);
// ! ddddd
router.get("/:dbName/codes/famille/:famille", getCodesArticlesByFamille);
router.get("/:dbName/articles/details/:code", getArticleDetailsByCode);
router.delete("/:dbName/suprimerArticle/:code", suprimerArticle);
router.get("/:dbName/getArticleParCode/:code", getArticleParCode);
router.post("/:dbName/ajouterArticle", ajouterArticle);
router.put("/:dbName/modifierArticle/:code", modifierArticle);
router.get("/:dbName/getListeArticles", getListeArticles);
router.get("/:dbName/filtrerListeArticle", filtrerListeArticle);
router.get("/:dbName/getToutCodesArticle", getToutCodesArticle);
router.get(
  "/:dbName/getDesignationFamilleParCodeFamille/:codeFamille",
  getDesignationFamilleParCodeFamille
);
router.get("/:dbName/getListecodesousFamille", getListecodesousFamille);
router.get(
  "/:dbName/getCodeFamilleParDesignationFamille/:desFamille",
  getCodeFamilleParDesignationFamille
);
router.get("/:dbName/getdesignationSousFamillebycodeSousFamille/:codeSousFamille",getdesignationSousFamillebycodeSousFamille);
router.get("/:dbName/getCodeSousFamilleParDesignationSousFamille/:codeSousFamille",getCodeSousFamilleParDesignationSousFamille);
router.get("/:dbName/getArticleParLibelle/:libelle",getArticleParLibelle);
router.get("/:dbName/getListeArticleparFamille/:codeFamille", getListeArticleparFamille);
router.get("/:dbName/getListeArticleparLibelle/:listelibelle", getListeArticleparLibelle);

// router.post("/:dbName/articles/:code/updateConfig", updateConfig);
// router.get(
//   "/search/:searchType/:dbName/:searchTerm",
//   getSearchResultsByClientOrNumbl
// );

// router.get("/code/:dbName", getAllCodeCli);
// router.get("/:dbName/last-numbl", getLastNumbl);

module.exports = router;
