const { getDatabaseConnection } = require("../common/commonMethods");
const defineregionmodels = require("../models/societe/region");
const { getConnexionBd } = require("../db/config")

//* récuperer la liste de régions
// * example:
// * input :
// * output : liste de régions
// * http://localhost:5000/api/region/SOLEVO/getListeCodeRegions
const getListeCodeRegions = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const listeCodesRegion = await dbConnection.query(
      `SELECT codergg from region`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "liste de codes posteaux récuperée avec succès",
      listeCodesRegion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* récuperer la liste de villes d'un région
// * example:
// * input : Ariana
// * output : liste de villes de région d'Ariana
// * http://localhost:5000/api/region/SOLEVO/getVilleParRegion/Ariana
const getVilleParRegion = async (req, res) => {
  const { dbName, codeRegion } = req.params;
  try {
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const ListRegion = await dbConnection.query(
      `Select desirgg from region where codergg = :codeRegion`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          codeRegion,
        },
      }
    );
    return res
      .status(200)
      .json({ message: "region recupere avec suucess", ListRegion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const ajouterRegion = async (req, res) => {
  const { dbName } = req.params;
  const { RegionInfo } = req.body;

  try {
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const Region = defineregionmodels(dbConnection);
    const newRegion = await Region.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      codergg: RegionInfo.codergg,
      desirgg: RegionInfo.desirgg,
    });

    return res
      .status(200)
      .json({ message: "insertion avec succès", newRegion });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  getListeCodeRegions,
  getVilleParRegion,
  ajouterRegion,
};
