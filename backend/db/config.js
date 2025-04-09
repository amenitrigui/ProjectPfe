const { Sequelize } = require("sequelize");
require("dotenv").config();

// * Informations d'accès au serveur de bases des données
// * commentaire de machine 1
const defaultDbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  dialectOptions: {
    connectTimeout: 10000,
  },
};

// * Récupère la connexion avec une base des données donnée (dbName)
// todo: Remplacer cette méthode par celle dans le fichier "common methods"
const getSequelizeConnection = (dbName = "") => {
  // * Si le mot de passe est défini dans le fichier .env, on l'ajoute à la chaîne de connexion.
  // * Sinon, on utilise une chaîne vide.
  const passwordPart = process.env.DB_PASSWORD
    ? `:${process.env.DB_PASSWORD}`
    : "";

  // * Chaîne de connexion dynamique :
  // * - Si une base de données (dbName) est spécifiée, la connexion est établie avec elle.
  // * - Sinon, la connexion est établie avec le serveur MySQL sans base spécifique.
  const connectionString = dbName
    ? `mysql://${process.env.DB_USER}${passwordPart}@${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`
    : `mysql://${process.env.DB_USER}${passwordPart}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

  // * Retourne l'objet de connexion Sequelize pour la base de données spécifiée (ou le serveur MySQL).
  return new Sequelize(connectionString, {
    ...defaultDbConfig,
    database: dbName || undefined,
  });
};

// * Connexion avec le serveur MYSQL (sans base de données spécifique)
const sequelize = getSequelizeConnection(); //conxexion avexc serveur mysql

// * Connexion avec la base des données "usererpsole"
const sequelizeUserERP = getSequelizeConnection("usererpsole"); ///connexion specifiquenmrnt le non de la base de donnnes

// * Teste la connexion avec le serveur MySQL et la base "usererpsole"
const testConnections = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion réussie à les base des données .");

    await sequelizeUserERP.authenticate();
    console.log("Connexion réussie à la base de données usererpsole.");
  } catch (error) {
    console.error(
      "Erreur lors de la connexion à l'une des bases de données :",
      error.message
    );
  }
};

// * Appelle de la méthode de test de connexion ci-dessus
testConnections();

// * Méthode pour récupérer la liste des TOUTES bases de données disponibles sur le serveur MySQL
const getDatabases = async () => {
  try {
    const result = await sequelize.query("SHOW DATABASES;", {
      type: Sequelize.QueryTypes.SELECT,
    });
    const databases = result.map((db) => db.Database);

    if (databases.length === 0) {
      throw new Error("Aucune base de données disponible."); // xamp mskrrrr
    }

    return databases; // database =0 il nyapas
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des bases de données :",
      error.message
    );
    return [];
  }
};

// * Méthode pour établir une connexion avec toutes les bases de données du serveur MySQL
// ! getDatabases() n'est utilisée qu'ici
const connectToAllDatabases = async () => {
  const databases = await getDatabases();

  if (databases.length === 0) {
    console.log("Aucune base de données disponible.");
    return;
  }

  for (const dbName of databases) {
    try {
      const dbConnection = getSequelizeConnection(dbName);
      await dbConnection.authenticate();

      await dbConnection.close();
    } catch (error) {
      console.error(
        `Erreur lors de la connexion à la base de données ${dbName} :`,
        error.message
      );
    }
  }
};
// ! Cette méthode n'est utilisée qu'ici
connectToAllDatabases();

module.exports = {
  sequelize,
  sequelizeUserERP,
  getSequelizeConnection,
};
