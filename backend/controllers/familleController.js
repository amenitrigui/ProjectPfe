const defineFamilleModel = require("../models/societe/famille");
const { getDatabaseConnection } = require("../common/commonMethods");
const { Sequelize } = require("sequelize");
// * méthode pour récuperer la liste de familles d'articles
// * exemple :
// * input : 02-SP
// * output : [{code: "02-SP", libelle: "SPART"}]
// * url: http://localhost:5000/api/famille/SOLEVO/getListeFamillesParCodeFamille/?codeFamille=02-SP

//* récuperer la désignation d'un famille par code famille
// * example:
// * input : 02-MAT
// * output : {"libelle": "MATELAS"}
// * url : http://localhost:5000/api/famille/SOLEVO/getListeFamillesParCodeFamille/?codeFamille=02-SP
const getListeFamillesParCodeFamille = async (req, res) => {
  const { dbName } = req.params;
  const { codeFamille } = req.query;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const getListeFamillesParCodeFamille = await dbConnection.query(
      `select code , libelle from famille where code LIKE :code`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          code:`%${codeFamille}%`,
        },
      }
    );
    return res.status(200).json({
      message: "code recupere avec succes",
      getListeFamillesParCodeFamille,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* url http://localhost:5000/api/famille/SOLEVO/getListeFamillesParLibelleFamille/MATELAS
//* input Matelas
//* output : libelle : Matelas ,code: 02.MAT
const getListeFamillesParLibelleFamille = async (req, res) => {
  const { dbName, LibelleFamille } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const result = await dbConnection.query(
      "SELECT code, libelle FROM famille WHERE libelle LIKE :libelle",
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          libelle: `%${LibelleFamille}%`,
        },
      }
    );
    return res.status(200).json({
      message: "Libellé récupéré avec succès",
      familles: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListeFamillesParCodeFamille,
  getListeFamillesParLibelleFamille
};
