const defineFamilleModel = require("../models/societe/famille");
const { getDatabaseConnection, verifyTokenValidity } = require("../common/commonMethods");
const { Sequelize } = require("sequelize");
const { getConnexionBd } = require("../db/config");
const famille = require("../models/societe/famille");
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
      const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifié" });
    }
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
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
      const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifié" });
    }
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
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
//* url :http://localhost:5000/api/famille/SOLEVO/ajouterFamille
const ajouterFamille = async(req,res)=>{
const { dbName } = req.params;
  const { FamilleAjoute } = req.body;
  try {
      const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifié" });
    }
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const Famille = defineFamilleModel(dbConnection);
    const famille = await Famille.findOne({
      where: {
        code: FamilleAjoute.code,
      },
    });
    if (famille) {
      return res
        .status(500)
        .json({ message: "famille deja existant on ne peut pas le reajoute" });
    } else {
      const FamilleCree = await Famille.create({
        code: FamilleAjoute.code,
        libelle: FamilleAjoute.libelle,
      });
      return res
        .status(200)
        .json({ message: "Famille ajoute avec succes", FamilleCree });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getListeFamillesParCodeFamille,
  getListeFamillesParLibelleFamille,
  ajouterFamille
  
};
