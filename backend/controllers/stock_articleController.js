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
const getListedepotdeStockparpcodepointvente = async (req, res) => {
  const { dbName } = req.params;
  const { codepv } = req.query;
  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis .",
    });
  }
  if (!codepv) {
    return res.status(400).json({
      message: "Le query codepv est requis .",
    });
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

module.exports = {
  getlistepointvente,
  getListedepotdeStockparpcodepointvente
};
