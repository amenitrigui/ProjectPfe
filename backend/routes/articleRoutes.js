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
  getListeArticleparLibelle,
  getListeArticleParSousFamille,
  getListeArticleParCodeArticle,
  getDerniereCodeArticle
} = require("../controllers/articleController");
//const {  getArticleDetailsByCode } = require("../controllers/articleControllerPlaceholder");
const router = express.Router();

//hthi 5dmtna
router.get("/:dbName/getListeFamilles", getListeFamilles);
// ! ddddd
router.get("/:dbName/codes/famille", getCodesArticlesByFamille);
router.delete("/:dbName/suprimerArticle",suprimerArticle);
router.get("/:dbName/getArticleParCode", getArticleParCode);
router.post("/:dbName/ajouterArticle", ajouterArticle);
router.put("/:dbName/modifierArticle/:code", modifierArticle);
router.get("/:dbName/getListeArticles", getListeArticles);
router.get("/:dbName/filtrerListeArticle", filtrerListeArticle);
router.get("/:dbName/getToutCodesArticle", getToutCodesArticle);
router.get(
  "/:dbName/getDesignationFamilleParCodeFamille",
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
router.get("/:dbName/getListeArticleparFamille", getListeArticleparFamille);
router.get("/:dbName/getListeArticleparLibelle", getListeArticleparLibelle);
router.get("/:dbName/getListeArticleParSousFamille/:SousFamille", getListeArticleParSousFamille);
router.get("/:dbName/getListeArticleParCodeArticle", getListeArticleParCodeArticle);
router.get("/:dbName/getDerniereCodeArticle", getDerniereCodeArticle);

module.exports = router;
