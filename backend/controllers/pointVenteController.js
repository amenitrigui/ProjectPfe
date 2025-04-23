const { getDatabaseConnection } = require("../common/commonMethods");
const defineregionmodels = require("../models/societe/region");
const definePointVentemodels=require("../models/societe/pointvente")
//* récuperer la liste de régions
// * example:
// * input :
// * output : liste de régions
// * http://localhost:5000/api/region/SOLEVO/getListeCodeRegions
const getListeCodeRegions = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName);
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
  console.log(dbName, " ", codeRegion);
  try {
    const dbConnexion = await getDatabaseConnection(dbName);
    const ListRegion = await dbConnexion.query(
      `Select desirgg from region where codergg = :codeRegion`,
      {
        type: dbConnexion.QueryTypes.SELECT,
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

const ajouterpointVente = async (req, res) => {
  const { dbName } = req.params;
  const { PointVenteInfo } = req.body;
  console.log("ajouter PointVenteInfo infos :", PointVenteInfo);

  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const PointVente = definePointVentemodels(dbConnection);
    const newPointVente = await PointVente.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      Code: PointVenteInfo.Code,
      Libelle: PointVenteInfo.Libelle,
    });
    console.log(newPointVente)

    return res
      .status(200)
      .json({ message: "insertion avec succès", newPointVente });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  getListeCodeRegions,
  getVilleParRegion,
  ajouterpointVente,
};
