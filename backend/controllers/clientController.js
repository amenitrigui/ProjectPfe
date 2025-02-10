const { Sequelize, QueryTypes } = require("sequelize");
const defineClientModel = require("../models/client");
const { getSequelizeConnection } = require("../db/config");
const jwt = require("jsonwebtoken");
const { getDatabaseConnection, verifyTokenValidity } = require("../common/commonMethods");

const getlisteclient = async (req, res) => {
  const { dbName } = req.params;
  const decoded = verifyTokenValidity(req, res);
  const dbConnection = await getDatabaseConnection(dbName);

  const result = await dbConnection.query(`select * from client`, {
    type: dbConnection.QueryTypes.SELECT,
  });
  return res.status(200).json({
    message: "liste client recupere",
    result,
  });
};
const getlisteclientsfilter = async (req, res) => {
  const { dbName } = req.params;

  const dbConnection = new Sequelize(`mysql://root:@127.0.0.1:3306/${dbName}`, {
    dialect: "mysql",
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  });

  await dbConnection.authenticate();
  const resultat = await dbConnection.query(
    `select code,rsoc,email,cp from client where    `,
    {
      type: dbConnection.QueryTypes.SELECT,
    }
  );
};

module.exports = {
  getlisteclient,
  getlisteclientsfilter,
};
