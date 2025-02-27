const jwt = require("jsonwebtoken");
const { Sequelize, QueryTypes } = require("sequelize");

/**
 * Description
 * Vérifier la validité d'un jwt
 * @author Mahdi
 * @date 2025-02-07
 * @param {request}
 * @returns {decodedToken}
 */
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

/**
 * Description
 * Recuperer un objet de connexion avec un nom d'une base de données donnée
 * @author Unknown
 * @date 2025-02-10
 * @param {any} databaseName
 * @returns {any}
 */
const getDatabaseConnection = async (databaseName, res) => {
  try {
    const dbConnection = new Sequelize(
      `mysql://root:@127.0.0.1:3306/${databaseName}`,
      {
        dialect: "mysql",
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
  } catch (error) {
    return res.status(500).json({
      message: `un erreur est survenu lors de récupération d'une connexion avec db ${databaseName}`,
    });
  }
};

module.exports = {
  getDatabaseConnection,
  verifyTokenValidity,
};
