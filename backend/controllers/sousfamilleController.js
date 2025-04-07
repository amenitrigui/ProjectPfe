const defineFamilleModel = require("../models/societe/famille");
const { getDatabaseConnection } = require("../common/commonMethods");
const { Sequelize } = require("sequelize");

//* url :http://localhost:5000/api/sousfamille/SOLEVO/getListeSousFamillesParCodeSousFamille/PAN
//* input CODE :Pan
//* output libelle, code : "code": "PAN-JA", "libelle": "PANNEAUX PV JA SOLAR""code": "PAN-SOLU", "libelle": "PANNEAUX PV SOLUXTEC"//*
const getListeSousFamillesParCodeSousFamille = async (req, res) => {
  const { dbName, codeSousFamille } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);

    const result = await dbConnection.query(
      `SELECT code, libelle FROM sousfamille WHERE code LIKE :code`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          code: `%${codeSousFamille}%`, // recherche partielle
        },
      }
    );

    return res.status(200).json({
      message: "Code sous-famille récupéré avec succès",
      sousFamilles: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* url :http://localhost:5000/api/sousfamille/SOLEVO/getListeSousFamillesParLibelleSousFamille/Supp
//* input :Supp c'est une libelle
 //* output  :"LibellesousFamilles": [{   "code": "SUP-MOD",  "libelle": "SUPPORT MODULE"}
const getListeSousFamillesParLibelleSousFamille = async (req, res) => {
  const { dbName, LibelleSousFamille } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);

    const result = await dbConnection.query(
      `SELECT code, libelle FROM sousfamille WHERE libelle LIKE :libelle`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          libelle: `%${LibelleSousFamille}%`, // recherche partielle
        },
      }
    );

    return res.status(200).json({
      message: "Libelle  sous-famille récupéré avec succès",
      LibellesousFamilles: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListeSousFamillesParCodeSousFamille,
  getListeSousFamillesParLibelleSousFamille,
};
