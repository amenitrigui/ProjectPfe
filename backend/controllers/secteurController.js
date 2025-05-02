const { getDatabaseConnection } = require("../common/commonMethods");
const { getConnexionBd } = require("../db/config")
const defineSecteurModel = require("../models/societe/secteur")
//* récuperer la liste de codes secteurs
// * example:
// * input :
// * output : liste de codes secteurs
// * verb : get
// * http://localhost:5000/api/secteur/SOLEVO/getListeCodesSecteur
const getListeCodesSecteur = async (req, res) => {
    const { dbName } = req.params;
    try {
      const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
      const listeCodesSecteurs = await dbConnection.query(
        `SELECT codesec from secteur`,
        {
          type: dbConnection.QueryTypes.SELECT,
        }
      );
  
      return res
        .status(200)
        .json({
          message: "liste de codes secteurs récuperée avec succès",
          listeCodesSecteurs,
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  //* récuperer la désignation d'un secteur par son code
  // * example:
  // * input : 002
  // * output : SHZ
  // * verb : get
  // * http://localhost:5000/api/secteur/SOLEVO/getDesignationSecteurparCodeSecteur/002
  const getDesignationSecteurparCodeSecteur = async (req, res) => {
    const { dbName, codesecteur } = req.params;
    try {
      const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
      const secteurInfo = await dbConnection.query(
        `Select codesec, desisec from secteur where codesec = :codesecteur `,
        {
          type: dbConnection.QueryTypes.SELECT,
          replacements: {
            codesecteur: codesecteur,
          },
        }
      );
  
      return res
        .status(200)
        .json({ message: "secteur récupéré avec succès", secteurInfo });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
//* http://localhost:5000/api/secteur/SOLEVO/ajouterSecteur
//* {"secteurInfo": { "codesec": "323",   "desisec": "ddd" }}

const ajouterSecteur=async (req,res)=>{
const { dbName } = req.params;
  const { secteurInfo } = req.body;
  
  try {
    const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const Secteur = defineSecteurModel(dbConnection);
    const newSecteur = await Secteur.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      codesec: secteurInfo.codesec,
      desisec: secteurInfo.desisec, 
      
      
    });
    

    return res.status(200).json({ message: "insertion avec succès" ,newSecteur});
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  getDesignationSecteurparCodeSecteur,
  getListeCodesSecteur,
  ajouterSecteur,
};
