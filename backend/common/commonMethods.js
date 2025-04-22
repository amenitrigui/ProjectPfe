const jwt = require("jsonwebtoken");
const { Sequelize, QueryTypes } = require("sequelize");

// * fonction pour vérifier la validité d'un jwt
// * critères :
// * entete "Authorization" existantes
// * durée de validité encore valable

function verifyTokenValidity(req, res) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "En-tête Authorization manquant." });
  }

  const decodedJWT = jwt.verify(
    authHeader.replace("Bearer ", ""),
    process.env.JWT_SECRET_KEY
  );

  // ? decodedJWT.exp s'exprime en secondes d'ou *1000
  if (Date.now() > decodedJWT.exp * 1000) {
    return res
      .status(401)
      .json({ message: "Session expiré, veuillez reconnectez svp" });
  }

  return decodedJWT;
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