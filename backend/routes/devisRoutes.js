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
  annulerDevis,
  getListeDevisParCodeClient,
  getListeDevisParNUMBL,
  getNbTotalDevisGeneres,
  getNbTotalDevisGeneresParUtilisateur,
  getDevisCountByMonthAndYear,
  getNbDevisNonGeneresParUtilisateur,
  getNbTotalDevisAnnulees,
  getNbTotalDevisEnCours,
  getNbTotalDevisSansStatus,
  getListeDevisAvecPagination,
  getAnneesDistinctGenerationDevis,
  getNbDevisGeneresParAnnee,getListeSecteur,
  getDevisparRepresentant,getListeCodeVendeur,getrepresentantparcodevendeur,majDevis,filtrerListeDevis
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
router.delete("/:dbName/annulerDevis", annulerDevis);

router.get("/:dbName/getListeSecteur", getListeSecteur);


router.get("/:dbName/getInfoUtilisateur", getInfoUtilisateur);
router.get("/:dbName/getListeDevisParCodeClient", getListeDevisParCodeClient);
router.get("/:dbName/getTousDevis", getTousDevis);
router.get("/:dbName/getListeDevisParNUMBL", getListeDevisParNUMBL);
router.get("/:dbName/getNbTotalDevisGeneres", getNbTotalDevisGeneres);
router.get("/:dbName/getNbTotalDevisGeneresParUtilisateur", getNbTotalDevisGeneresParUtilisateur);
router.get("/:dbName/getNbDevisNonGeneresParUtilisateur", getNbDevisNonGeneresParUtilisateur);
router.get("/:dbName/getDevisCountByMonthAndYear", getDevisCountByMonthAndYear);
router.get("/:dbName/getNbTotalDevisAnnulees", getNbTotalDevisAnnulees)
router.get("/:dbName/getNbTotalDevisEnCours", getNbTotalDevisEnCours)
router.get("/:dbName/getNbTotalDevisSansStatus", getNbTotalDevisSansStatus);
router.get("/:dbName/getListeDevisAvecPagination", getListeDevisAvecPagination);
router.get("/:dbName/getAnneesDistinctGenerationDevis", getAnneesDistinctGenerationDevis);
router.get("/:dbName/getNbDevisGeneresParAnnee", getNbDevisGeneresParAnnee);
router.get("/:dbName/getDevisparRepresentant", getDevisparRepresentant);
router.get("/:dbName/getListeCodeVendeur", getListeCodeVendeur);
router.get("/:dbName/getrepresentantparcodevendeur", getrepresentantparcodevendeur);
router.put("/:dbName/majDevis", majDevis);
router.get("/:dbName/filtrerListeDevis", filtrerListeDevis);
module.exports = router;