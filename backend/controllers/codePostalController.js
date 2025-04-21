const { getDatabaseConnection } = require("../common/commonMethods");
const defineCodePostalemodels= require("../models/societe/cpostal")
//* récuperer la ville associé à un code postal
// * example:
// * input : 1000
// * output : beb el bhar
// * http://localhost:5000/api/codePostal/SOLEVO/getVilleParCodePostale/1000
const getVilleParCodePostale = async (req, res) => {
  const { dbName, cp } = req.params;
  try {
    console.log(dbName, " ", cp);
    const dbConnection = await getDatabaseConnection(dbName);
    const ville = await dbConnection.query(
      `SELECT desicp from cpostal where CODEp = :cp`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          cp: cp,
        },
      }
    );
    return res.status(200).json({
      message: "liste ville de code postale récuperé avec succès",
      ville: ville,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* récuperer la liste de codes posteaux
// * example:
// * input :
// * output : liste de codes posteaux
// * http://localhost:5000/api/codePostal/SOLEVO/getListeCodesPosteaux
const getListeCodesPosteaux = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const listeCodesPosteaux = await dbConnection.query(
      `SELECT CODEp from cpostal`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "liste de codes posteaux récuperée avec succès",
      listeCodesPosteaux,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* récuperer un code postal par ville
// * example:
// * input : beb el bhar
// * output : 1000
// * http://localhost:5000/api/codePostal/SOLEVO/getCodePostalParVille
const getCodePostalParVille = async (req, res) => {
  const { dbName } = req.params;
  const { ville } = req.query;

  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const codePostal = await dbConnection.query(
      `
          SELECT CODEp from cpostal where desicp = :ville
        `,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          ville: ville,
        },
      }
    );

    if (codePostal) {
      return res
        .status(200)
        .json({ message: "code postal récuperé avec succès", codePostal });
    } else {
      return res
        .status(401)
        .json({ message: "aucun code postal n'est trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const ajouterCodePostal = async (req, res) => {
  const { dbName } = req.params;
  const { CodePostalInfo } = req.body;
  console.log("ajouter Code postal :", CodePostalInfo);

  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const CodePostale = defineCodePostalemodels(dbConnection);
    const newCodePostal = await CodePostale.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      CODEp: CodePostalInfo.CODEp,
      desicp: CodePostalInfo.desicp,
    });
    console.log("sssss",newCodePostal)

    return res
      .status(200)
      .json({ message: "insertion avec succès", newCodePostal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getListeCodesPosteaux,
  getVilleParCodePostale,
  getCodePostalParVille,
  ajouterCodePostal
};
