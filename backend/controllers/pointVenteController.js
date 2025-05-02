const { getDatabaseConnection } = require("../common/commonMethods");
const { getConnexionBd } = require("../db/config")
const defineregionmodels = require("../models/societe/region");
const definePointVentemodels=require("../models/societe/pointvente");


const ajouterpointVente = async (req, res) => {
  const { dbName } = req.params;
  const { PointVenteInfo } = req.body;

  try {
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const PointVente = definePointVentemodels(dbConnection);
    const newPointVente = await PointVente.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      Code: PointVenteInfo.Code,
      Libelle: PointVenteInfo.Libelle,
    });

    return res
      .status(200)
      .json({ message: "insertion avec succès", newPointVente });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//* url :http://localhost:5000/api/pointvente/SOLEVO/getLibellePointVneteparPVente?Code=01
//* { "message": "Libellé récupéré avec succès", "data": [   {     "Libelle": "SIEGE LOCAL"   } ]}
const getLibellePointVneteparPVente = async (req, res) => {
  const { Code } = req.query;

  try {
    const dbConnection = await getConnexionBd();

    const libellePointVente = await dbConnection.query(
      `SELECT Libelle FROM pointvente WHERE Code = :Code`,
      {
        replacements: { Code },
        type: dbConnection.QueryTypes.SELECT
      }
    );

    return res.status(200).json({
      message: "Libellé récupéré avec succès",
      data: libellePointVente
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération du libellé",
      error: error.message
    });
  }
};
//*url :http://localhost:5000/api/pointvente/SOLEVO/getListePointVente
//*{"message": "Liste point de vente récupérée avec succès", "data": [   {     "Code": "01"   },        "Code": "0   },   {     "Code": "03"   },
 
const getListePointVente = async (req, res) => {
  try {
    const dbConnection = await getConnexionBd();
    const listePointVente = await dbConnection.query(
      `SELECT Code FROM pointvente`,
      {
        type: dbConnection.QueryTypes.SELECT
      }
    );

    return res.status(200).json({
      message: "Liste point de vente récupérée avec succès",
      data: listePointVente
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération de la liste",
      error: error.message
    });
  }
};
module.exports = {

  ajouterpointVente,
  getListePointVente,
  getLibellePointVneteparPVente
};
