const defineLignedepot = require("../models/societe/lignedepot");
const { getDatabaseConnection } = require("../common/commonMethods");
//* url : http://localhost:5000/api/Stock_Article/SOLEVO/getlistepointvente
const getlistepointvente = async (req, res) => {
  const { dbName } = req.params;
  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listepointVente = await dbConnection.query(
      `select Code ,Libelle from pointvente `,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({
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
  const { codepv,codeArticle } = req.query;
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
  if(!codeArticle) {
    return res.status(400).json({message: "Le code d'article est requis ."})
  }
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listedepot = await dbConnection.query(
      `select Code ,Libelle from depot where codepv = :codepv `,

      { replacements:{
        codepv:codepv

      },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({
        message: "liste depot recupere avec sucees",
        listedepot,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNbTotalArticle = async(req, res) => {
  const { dbName } = req.params;
  const { codeArticle } = req.query;

  if(!dbName) {
    return res.status(400).json({message: "le nom de base de données est requis ."})
  }

  if(!codeArticle) {
    return res.status(400).json({message: "le code d'article est requis ."})
  }
  try{
    const dbConnection = await getDatabaseConnection(dbName, res);
    const LigneDepot = defineLignedepot(dbConnection);

    const nbTotQteArticleDispo = LigneDepot.count({
      attribute
    })
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
}

module.exports = {
  getlistepointvente,
  getListedepotdeStockparpcodepointvente
};
