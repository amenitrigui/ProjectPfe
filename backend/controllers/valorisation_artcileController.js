const { Sequelize } = require("sequelize");

const defineArticleModel = require("../models/societe/article");
const defineFamilleModel = require("../models/societe/famille");
const defineLdfpModel = require("../models/societe/ldfp");
const defineSousFamilleModel = require("../models/societe/sousfamille");
const { getSequelizeConnection } = require("../db/config");
const { getDatabaseConnection } = require("../common/commonMethods");
const article = require("../models/societe/article");
//* utl http://localhost:5000/api/Valorisation_Article/SOLEVO/getPrixVente?code=0
const getPrixVente = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.query;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis .",
    });
  }

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const getPrixVente = await dbConnection.query(
      `select prix1,prix2,prix3,prix4, prix1ttc,prix2ttc,prix3ttc,prix4ttc ,remmax,prixpub from article where code =:code `,

      {
        replacements : {
            code:code
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      message: "liste prix de vente recupere avec sucees",
      getPrixVente,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPrixVente,
};
