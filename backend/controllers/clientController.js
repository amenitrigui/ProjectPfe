const { Sequelize, QueryTypes } = require("sequelize");
const defineClientModel = require("../models/client");
const { getSequelizeConnection } = require("../db/config");
const jwt = require("jsonwebtoken");
const { getDatabaseConnection, verifyTokenValidity } = require("../common/commonMethods");

const getlisteclient = async (req, res) => {
  const { dbName } = req.params;
  const decoded = verifyTokenValidity(req, res);
  const dbConnection = await getDatabaseConnection(dbName,res);

  const result = await dbConnection.query(`select * from client`, {
    type: dbConnection.QueryTypes.SELECT,
  });
  return res.status(200).json({
    message: "liste client recupere",
    result,
  });
};


const getlisteclientsfilter = async (req, res) => {
  const { dbName } = req.params
  const { filters } = req.query
  console.log(filters)

  const dbConnection = new Sequelize(
    `mysql://root:@127.0.0.1:3306/${dbName}`,
    {
      dialect: "mysql",
      logging: console.log(),
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  );

  await dbConnection.authenticate();
  // ? liste des conditions
  // ? exemple : ["NUML like :numbl, "libpv like :libpv"...]
  let whereClauses = [];
  // ? object contenant les noms des paramètres de requete sql avec leurs remplacements
  // ? exemple : {{numbl: %dv2401%}, {libpv: %kasserine% }}
  let replacements = {};

  // ? ajout de chaque condition quand la valeur n'est pas vide
  if (filters.code) {
    whereClauses.push('code like :code');
    replacements.code = `%${filters.code}%`;
  }
  if (filters.cp) {
    whereClauses.push('cp like :cp');
    replacements.cp = `%${filters.cp}%`;
  }
  if (filters.adresse) {
    whereClauses.push('adresse like :adresse');
    replacements.adresse = `%${filters.adresse}%`;
  }
  if (filters.email) {
    whereClauses.push('email like :email');
    replacements.email = `%${filters.email}%`;
  }
  if (filters.rsoc) {
    whereClauses.push('rsoc like :rsoc');
    replacements.rsoc = `%${filters.rsoc}%`;
  }


  // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
  let whereCondition = whereClauses.join(' AND ');

  // ? Si on on a aucune condition on effectue une requete de select * from dfp
  let query = `SELECT code, rsoc, email, cp, adresse 
     FROM client 
    
        ${whereCondition ? 'WHERE ' + whereCondition : ''}
      `;

  const result = await dbConnection.query(query, {
    replacements: replacements,
    type: dbConnection.QueryTypes.SELECT,
  });

  // Correct response format
  return res.status(200).json({
    message: "Filtrage réussi",
    data: result
  });



}

module.exports = {
  getlisteclient,
  getlisteclientsfilter

}
