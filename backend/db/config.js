const Sequelize = require("sequelize");
require("dotenv").config();
const configParDefautDb = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: console.log,//false,
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },

  dialectOptions: {
    connectTimeout: 10000,
  },
};

// * Récupère la connexion avec une base des données donnée (dbName)
const connecterAuBaseDonnees = (nomDb = "") => {
  // * Si le mot de passe est défini dans le fichier .env, on l'ajoute à la chaîne de connexion.
  // * Sinon, on utilise une chaîne vide.
  const partieMdp = process.env.DB_PASSWORD
    ? `${encodeURIComponent(process.env.DB_PASSWORD)}`
    : "";

  // * Chaîne de connexion dynamique :
  // * - Si une base de données (nomDb) est spécifiée, la connexion est établie avec elle.
  // * - Sinon, la connexion est établie avec le serveur MySQL sans base spécifique.
  const chaineConnexion = nomDb
    ? `mysql://${process.env.DB_USER}:${partieMdp}@${process.env.DB_HOST}:${process.env.DB_PORT}/${nomDb}`
    : `mysql://${process.env.DB_USER}:${partieMdp}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
  // * Retourne l'objet de connexion Sequelize pour la base de données spécifiée (ou le serveur MySQL).
  const objConnexion = new Sequelize(chaineConnexion, {
    ...configParDefautDb,
    database: nomDb || undefined,
  });
  return objConnexion;
};

// * Connexion avec le serveur MYSQL (sans base de données spécifique)
let dbConnection = connecterAuBaseDonnees(); //conxexion avexc serveur mysql
const setBdConnexion = (nomDb) => {
  dbConnection = connecterAuBaseDonnees(nomDb);
};
const getConnexionBd = () => {
  return dbConnection;
}

// * Connexion avec la base des données "usererpsole"
const sequelizeConnexionDbUtilisateur = connecterAuBaseDonnees(
  process.env.DB_USERS_NAME
); ///connexion specifiquenmrnt le non de la base de donnnes

// * Teste la connexion avec le serveur MySQL et la base "usererpsole"
const testerConnexionUtilisateurSocieteBd = async () => {
  try {
    await dbConnection.authenticate();
    console.log("Connexion réussie à les base des données .");

    await sequelizeConnexionDbUtilisateur.authenticate();
    console.log(
      `Connexion réussie à la base de données ${process.env.DB_USERS_NAME}.`
    );
  } catch (error) {
    console.error(
      "Erreur lors de la connexion à l'une des bases de données :",
      error.message
    );
  }
};

// * Appelle de la méthode de test de connexion ci-dessus
testerConnexionUtilisateurSocieteBd();

module.exports = {
  getConnexionBd,
  setBdConnexion,
  sequelizeConnexionDbUtilisateur
};
