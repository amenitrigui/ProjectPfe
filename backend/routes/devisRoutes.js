const express = require("express");
const router = express.Router();

const {
  getTousDevis,
  getNombreDevis,
  getTotalChiffres,
  ajouterDevis,
  getDevisParNUMBL,
  getCodesDevis,
  getDevisParMontant,
  GetDevisListParClient,
  GetDevisParPeriode,
  getInfoUtilisateur,
  getListePointVente,
  getLignesDevis,
  getDevisCreator,
  getDerniereNumbl,
  deleteDevis,
  getListeDevisParCodeClient,
  getListeDevisParNUMBL,
  getNbTotalDevisGeneres,
  getNbTotalDevisGeneresParUtilisateur
} = require("../controllers/devisController");
//devis controller mt3na
router.post("/:dbName/ajouterDevis", ajouterDevis);
router.get("/:dbName/getNombreDevis", getNombreDevis);
router.get("/:dbName/getTotalChiffres", getTotalChiffres);
router.get("/:dbName/getDevisParNUMBL/:NUMBL", getDevisParNUMBL);
router.get("/:dbName/getCodesDevis/:usera", getCodesDevis);
router.get("/:dbName/getDevisParMontant/:montant", getDevisParMontant);
router.get("/:dbName/getDevisParClient", GetDevisListParClient);
router.get("/:dbName/getDevisParPeriode", GetDevisParPeriode);
router.get("/:dbName/getDevisParMontant", getDevisParMontant);
router.get("/:dbName/getInfoUtilisateur", getInfoUtilisateur);
router.get("/:dbName/getListePointVente", getListePointVente);
router.get("/:dbName/getLignesDevis/:NumBL", getLignesDevis);
router.get("/:dbName/getDevisCreator", getDevisCreator);
router.get("/:dbName/getDerniereNumbl", getDerniereNumbl);
router.delete("/:dbName/deleteDevis/:NUMBL", deleteDevis);
router.get("/:dbName/getListePointVente", getListePointVente);
router.get("/:dbName/getInfoUtilisateur", getInfoUtilisateur);
router.get("/:dbName/getListeDevisParCodeClient", getListeDevisParCodeClient);
router.get("/:dbName/getTousDevis", getTousDevis);
router.get("/:dbName/getListeDevisParNUMBL", getListeDevisParNUMBL);
router.get("/:dbName/getNbTotalDevisGeneres", getNbTotalDevisGeneres);
router.get("/:dbName/getNbTotalDevisGeneresParUtilisateur", getNbTotalDevisGeneresParUtilisateur);

module.exports = router;
