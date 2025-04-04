const { getDatabaseConnection } = require("../common/commonMethods");

//* récuperer la liste de codes secteurs
// * example:
// * input :
// * output : liste de codes secteurs
// * verb : get
// * http://localhost:5000/api/secteur/SOLEVO/getListeCodesSecteur
const getListeCodesSecteur = async (req, res) => {
    const { dbName } = req.params;
    try {
      const dbConnection = await getDatabaseConnection(dbName, res);
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
    console.log(dbName, " ", codesecteur);
    try {
      const dbConnection = await getDatabaseConnection(dbName, res);
      const secteurInfo = await dbConnection.query(
        `Select codesec, desisec from secteur where codesec = :codesecteur `,
        {
          type: dbConnection.QueryTypes.SELECT,
          replacements: {
            codesecteur: codesecteur,
          },
        }
      );
  
      console.log(secteurInfo);
  
      return res
        .status(200)
        .json({ message: "secteur récupéré avec succès", secteurInfo });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  getDesignationSecteurparCodeSecteur,
  getListeCodesSecteur,
};
