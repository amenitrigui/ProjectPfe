const jwt = require("jsonwebtoken");
const { Sequelize, QueryTypes } = require("sequelize");

// * fonction pour vérifier la validité d'un jwt
// * critères :
// * entete "Authorization" existantes
// * durée de validité encore valable

function verifyTokenValidity(req) {
  const authHeader = req.header("Authorization");
  console.log(req.header);
  if (!authHeader) {
    return false;
  }

  const decodedJWT = jwt.verify(
    authHeader.replace("Bearer ", ""),
    process.env.JWT_SECRET_KEY
  );
  console.log(decodedJWT);
  console.log(Date.now(), decodedJWT.exp);
  // ? decodedJWT.exp s'exprime en secondes d'ou *1000
  if (Date.now() < decodedJWT.exp * 1000) {
    return decodedJWT;
  }
}
// * obtention d'un objet Sequelize qui établit la connexion
// * avec une base des données databaseName donnée en paramètres

const getDatabaseConnection = async (databaseName) => {
  const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
  const dbConnection = new Sequelize(
    `mysql://${process.env.DB_USER}:${encodedPassword}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}`,
    {
      dialect: "mysql",
      dialectModule: require("mysql2"),
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
  await dbConnection.authenticate();
  return dbConnection;
};

module.exports = {
  getDatabaseConnection,
  verifyTokenValidity,
};
