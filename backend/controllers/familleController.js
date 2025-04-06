const defineFamilleModel = require("../models/societe/famille");
const { getDatabaseConnection } = require("../common/commonMethods");
const { Sequelize } = require("sequelize");
// * méthode pour récuperer la liste de familles d'articles
// * exemple : 
// * input : 02-SP
// * output : [{code: "02-SP", libelle: "SPART"}]
// * url: http://localhost:5000/api/famille/SOLEVO/getListeFamillesParCodeFamille/?codeFamille=02-SP
const getListeFamillesParCodeFamille = async (req, res) => {
  const { dbName } = req.params;
  const { codeFamille } = req.query;

  if (!dbName || !codeFamille) {
    return res
      .status(400)
      .json({ message: "l'un ou les deux paramètres sont nulles" });
  }

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Famille = defineFamilleModel(dbConnection);

    const listeFamilles = await Famille.findAll({

      where: {
        code: { [Sequelize.like] : codeFamille},
      },
    });

    if (!listeFamilles) {
      return res
        .status(404)
        .json({
          message: "aucune famille d'articles trouvé dans la base des données",
        });
    }

    return res
      .status(200)
      .json({
        message: "liste de familles d'articles récuperé avec succès",
        listeFamilles,
      });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListeFamillesParCodeFamille
}