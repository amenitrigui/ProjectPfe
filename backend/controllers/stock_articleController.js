const defineLignedepot = require("../models/societe/lignedepot");
const { verifyTokenValidity } = require("../common/commonMethods");
const { getConnexionBd } = require("../db/config");
//* url : http://localhost:5000/api/Stock_Article/SOLEVO/getlistepointvente
const getlistepointvente = async (req, res) => {
  const { dbName } = req.params;
  try {
    if (!dbName) {
      return res.status(400).json({
        message: "Le nom de la base de données est requis.",
      });
    }
    const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const listepointVente = await dbConnection.query(
      `select Code ,Libelle from pointvente `,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      message: "liste point vente recupere avec sucees",
      listepointVente,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// * méthode pour récuperer la liste de dépots pour une point de vente
// * ou un article données a de stock
// * url : http://localhost:5000/api/Stock_Article/SOLEVO/getListedepotdeStockparpcodepointvente?codepv=01&codeArticle=0
const getListedepotdeStockparpcodepointvente = async (req, res) => {
  const { dbName } = req.params;
  const { codepv, codeArticle } = req.query;
  try {
    if (!dbName) {
      return res.status(400).json({
        message: "Le nom de la base de données est requis.",
      });
    }
    if (!codepv) {
      return res.status(400).json({
        message: "Le code de point de vente est requis .",
      });
    }
    if (!codeArticle) {
      return res
        .status(400)
        .json({ message: "Le code d'article est requis ." });
    }
    const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const listedepot = await dbConnection.query(
      `select Code ,Libelle from depot where codepv = :codepv `,

      {
        replacements: {
          codepv: codepv,
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      message: "liste depot recupere avec sucees",
      listedepot,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * méthode pour récuperer le nombre totale de stock d'un article donnée
// * url : http://localhost:5000/api/Stock_Article/SOLEVO/getQteTotalArticle?codeArticle=0
const getQteTotalArticle = async (req, res) => {
  const { dbName } = req.params;
  const { codeArticle } = req.query;

  try {
    if (!dbName) {
      return res
        .status(400)
        .json({ message: "le nom de base de données est requis ." });
    }

    if (!codeArticle) {
      return res
        .status(400)
        .json({ message: "le code d'article est requis ." });
    }
    const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const LigneDepot = defineLignedepot(dbConnection);
    const qteTotal = await LigneDepot.sum("qteart", {
      where: { codeart: codeArticle },
    });

    if (!isNaN(qteTotal)) {
      return res.status(200).json({
        message: "Quantité totales d'article récuperé avec succès",
        qteTotal,
      });
    } else {
      return res.status(400).json({
        message:
          "Erreur lors de la récuperation de la quantité totale de l'article",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * méthode pour récuperer la quantité totale d'un article
// * dans une point de vente
// * url : http://localhost:5000/api/Stock_Article/SOLEVO/getQteTotalArticlParPointVente?codeArticle=0&codePointVente=01
const getQteTotalArticlParPointVente = async (req, res) => {
  const { dbName } = req.params;
  const { codePointVente } = req.query;
  const { codeArticle } = req.query;

  try {
    if (!dbName) {
      return res
        .status(400)
        .json({ message: "le nom de base de données est requis ." });
    }
  
    if (!codePointVente) {
      return res
        .status(400)
        .json({ message: "le code de point de vente est requis ." });
    }
  
    if (!codeArticle) {
      return res.status(400).json({ message: "le code d'article est requis ." });
    }
    const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const LigneDepot = defineLignedepot(dbConnection);

    const qteTotArt = await LigneDepot.sum("qteart", {
      where: {
        codepv: codePointVente,
        codeart: codeArticle,
      },
    });
    console.log(qteTotArt)
    if (qteTotArt) {
      return res.status(200).json({
        message: `qte totale d'article dans la point de vente ${codePointVente} recuperé avec succès`,
        qteTotArt,
      });
    } else {
      return res.status(400).json({
        message:
          "un erreur est survenu lors de la récupération de quantité totale de l'article",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getlistepointvente,
  getListedepotdeStockparpcodepointvente,
  getQteTotalArticle,
  getQteTotalArticlParPointVente,
};
