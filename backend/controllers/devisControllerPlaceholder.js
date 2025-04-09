const { Sequelize, QueryTypes } = require("sequelize");
const defineClientModel = require("../models/societe/client");

const { getSequelizeConnection } = require("../db/config");




const defineDfpModel = require("../models/societe/dfp");

const defineLdfpModel = require("../models/societe/ldfp");

const getAllClients = async (req, res) => {
  const { dbName } = req.params;
//* testttttttt
  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    console.log(`Connecté à la base de données : ${dbName}`);

    const Client = defineClientModel(dynamicSequelize);

    const clients = await Client.findAll({
      attributes: ["code", "rsoc"],
    });

    if (clients.length === 0) {
      return res.status(404).json({
        message: "Aucun client trouvé dans cette base de données.",
      });
    }

    return res.status(200).json({
      message: "Clients récupérés avec succès.",
      clients,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des clients :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des clients.",
      error: error.message,
    });
  }
};

const getClientByCode = async (req, res) => {
  const { dbName, code } = req.params;

  if (!dbName || !code) {
    return res.status(400).json({
      message: "Le nom de la base de données et le code du client sont requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);

    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    const Client = defineClientModel(dynamicSequelize);

    const client = await Client.findOne({
      where: { code: code },
      attributes: ["code", "rsoc", "adresse", "cp", "email", "tel1"],
    });

    if (!client) {
      return res.status(404).json({
        message: "Client non trouvé",
      });
    }

    return res.status(200).json({
      message: "Détails du client récupérés avec succès",
      client,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du client :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des détails du client",
      error: error.message,
    });
  }
};

const getClientByRsoc = async (req, res) => {
  const { dbName, rsoc } = req.params;

  if (!dbName || !rsoc) {
    return res.status(400).json({
      message: "Le nom de la base de données et la raison sociale sont requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    // création d'une instance du modèle client
    const Client = defineClientModel(dynamicSequelize);
    
    const client = await Client.findOne({
      where: { rsoc: rsoc },
      attributes: ["code", "rsoc", "adresse", "cp", "email", "tel1"],
    });

    if (!client) {
      return res.status(404).json({
        message: "Client non trouvé",
      });
    }

    return res.status(200).json({
      message: "Détails du client récupérés avec succès",
      client,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du client :", error.message);
    return res.status(500).json({
      message: "Erreur lors de la récupération du client",
      error: error.message,
    });
  }
};



const getLibpvByNumbl = async (req, res) => {
  const { dbName, numbl } = req.params;

  if (!dbName || !numbl) {
    return res.status(400).json({
      message: "Le nom de la base de données et le NUMBL sont requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    const result = await dynamicSequelize.query(
      `SELECT libpv FROM dfp WHERE NUMBL = :numbl`,
      {
        replacements: { numbl },
        type: QueryTypes.SELECT,
      }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: `Aucun devis trouvé avec le NUMBL : ${numbl}`,
      });
    }

    return res.status(200).json({
      message: "libpv récupéré avec succès",
      libpv: result[0].libpv,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du libpv :", error.message);
    return res.status(500).json({
      message: "Erreur lors de la récupération du libpv.",
      error: error.message,
    });
  }
};

const formatDevisData = (result) => {
  const formattedDevis = result.reduce((acc, item) => {
    const numbl = item.NUMBL;
    if (!numbl) return acc;
    if (!acc[numbl]) {
      acc[numbl] = {
        NUMBL: numbl,
        client: {
          ADRCLI: item["client.ADRCLI"] || null,
          libpv: item["client.libpv"] || null,
          CODECLI: item["client.CODECLI"] || null,
          DATEBL: item["client.DATEBL"] || null,
          CP: item["client.CP"] || null,
          RSCLI: item["client.RSCLI"] || null,
          MTTC: item["client.MTTC"] || null,
        },
        articles: [],
      };
    }

    if (item["articles.CodeART"]) {
      acc[numbl].articles.push({
        famille: item["articles.famille"],
        CodeART: item["articles.CodeART"],
        DesART: item["articles.DesART"] || null,
        QteART: item["articles.QteART"] || 0,
        Remise: item["articles.Remise"] || 0,
        TauxTVA: item["articles.TauxTVA"] || 0,
      });
    }

    return acc;
  }, {});

  return Object.values(formattedDevis);
};

const getDevisWithDetails = async (req, res) => {
  const dbName = req.params.dbName;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    const result = await dynamicSequelize.query(
      `
      SELECT 
        Devis.NUMBL, 
        Devis.libpv AS "client.libpv", 
        Devis.ADRCLI AS "client.ADRCLI", 
        Devis.CODECLI AS "client.CODECLI", 
        Devis.CP AS "client.CP", 
        Devis.RSCLI AS "client.RSCLI", 
        Devis.MTTC AS "client.MTTC",
         Devis.DATEBL AS "client.DATEBL",

         articles.famille AS "articles.famille", 
        articles.CodeART AS "articles.CodeART", 
        articles.DesART AS "articles.DesART", 
        articles.QteART AS "articles.QteART", 
        articles.Remise AS "articles.Remise", 
        articles.TauxTVA AS "articles.TauxTVA"
      FROM dfp AS Devis
      LEFT JOIN ldfp AS articles ON Devis.NUMBL = articles.NUMBL
      `,
      { type: QueryTypes.SELECT }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucun devis trouvé.",
      });
    }

    const formattedDevis = formatDevisData(result);

    res.status(200).json(formattedDevis);
  } catch (error) {
    console.error("Erreur lors de la récupération des devis :", error.message);
    res.status(500).json({
      message: "Erreur lors de la récupération des devis.",
      error: error.message,
    });
  }
};



const getDevisCountByMonthAndYear = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    const sqlQuery = `
      SELECT 
        YEAR(DATEBL) AS year,
        MONTH(DATEBL) AS month,
        COUNT(DISTINCT NUMBL) AS totalDevis
      FROM dfp
      GROUP BY YEAR(DATEBL), MONTH(DATEBL)
      ORDER BY year DESC, month DESC;
    `;
    console.log("Exécution de la requête SQL : ", sqlQuery);

    const result = await dynamicSequelize.query(sqlQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucun devis trouvé.",
      });
    }

    console.log("Résultats de la requête (devis par mois et année) :", result);

    return res.status(200).json({
      message: "Nombre de devis par mois et année récupéré avec succès.",
      devisCountByMonthAndYear: result,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre de devis par mois et année :",
      error.message
    );
    return res.status(500).json({
      message:
        "Erreur lors de la récupération du nombre de devis par mois et année.",
      error: error.message,
    });
  }
};

const getDevisValidees = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    const result = await dynamicSequelize.query(
      `SELECT NumBL, DateBL, PFvalide, cloturer FROM dfp WHERE PFvalide = 1`,
      { type: QueryTypes.SELECT }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucun devis validé trouvé.",
      });
    }

    return res.status(200).json({
      message: "Devis validés trouvés avec succès",
      devisValidees: result,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des devis validés :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des devis validés.",
      error: error.message,
    });
  }
};

/**
 * Description
 * Création et insertion d'un entité devis
 * @author Unknown
 * @date 2025-02-13
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
const createDevis = async (req, res) => {
  const { dbName } = req.params;
  const {
    NUMBL,
    libpv,
    adresse,
    code,
    cp,
    DATEBL,
    MREMISE,
    MTTC,
    comm,
    RSREP,
    CODEREP,
    usera,
    rsoc,
    codesecteur,
    MHT,
    articles,
  } = req.body;

  console.log("NUMBL reçu:", NUMBL);
  console.log("Code client reçu:", code);
  console.log("Articles reçus :", articles);

  if (!NUMBL || NUMBL.trim() === "") {
    return res.status(400).json({ message: "Le champ NUMBL est manquant." });
  }
  if (!code || code.trim() === "") {
    return res.status(400).json({ message: "Le code client est manquant." });
  }
  if (!adresse || adresse.trim() === "") {
    return res
      .status(400)
      .json({ message: "L'adresse du client est manquante ou vide." });
  }
  if (!Array.isArray(articles)) {
    return res
      .status(400)
      .json({ message: "Le champ 'articles' doit être un tableau." });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    const Dfp = defineDfpModel(dynamicSequelize);
    const Ldfp = defineLdfpModel(dynamicSequelize);
    const Client = defineClientModel(dynamicSequelize);

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (existingDevis) {
      return res.status(400).json({
        message: `Le devis avec le numéro ${NUMBL} existe déjà.`,
      });
    }

    const client = await Client.findOne({ where: { code } });
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    console.log("Données du client récupérées :", client);

    const clientAdresse =
      client.adresse && client.adresse.trim() !== "" ? client.adresse : adresse;

    if (!clientAdresse || clientAdresse.trim() === "") {
      return res.status(400).json({
        message:
          "L'adresse du client est manquante ou vide même après vérification.",
      });
    }

    const transaction = await dynamicSequelize.transaction();

    const creationDate = new Date();
    const formattedDate = creationDate.toISOString().split("T")[0];
    const mlettre = `Devis En Cours -- crée le : ${formattedDate} / par : ${
      usera || "N/A"
    }`;

    const dfpData = {
      NUMBL,
      libpv,
      ADRCLI: clientAdresse,
      CODECLI: client.code,
      DATEBL,
      MREMISE,
      MTTC,
      RSREP,
      CODEREP,
      MHT,
      codesecteur,
      CP: client.cp,
      comm,
      RSCLI: client.rsoc,
      MLETTRE: mlettre,
    };

    const devis = await Dfp.create(dfpData, { transaction });

    const insertedArticles = [];

    for (const article of articles) {
      if (
        !article.code ||
        !article.libelle ||
        !article.nbrunite ||
        !article.prix1 ||
        !article.tauxtva
      ) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Tous les champs nécessaires pour l'article doivent être fournis.",
        });
      }

      const articleData = {
        NUMBL,
        CodeART: article.code,
        DesART: article.libelle,
        QteART: article.nbrunite,
        PUART: article.prix1,

        TauxTVA: article.tauxtva,
        Unite: article.unite || "unité",
        Conf: article.CONFIG || "",
        famille: article.famille || "",
        nbun: article.nbrunite,
      };

      const insertedArticle = await Ldfp.create(articleData, { transaction });
      insertedArticles.push(insertedArticle);
    }

    await transaction.commit();

    return res.status(201).json({
      message: "Devis créé avec succès.",
      devis,
      articles: insertedArticles,
      mlettre,
    });
  } catch (error) {
    console.error("Erreur lors de la création du devis :", error);
    return res.status(500).json({
      message: "Erreur lors de la création du devis.",
      error: error.errors ? error.errors : error.message,
    });
  }
};

// * méthode pour supprimer un devis par son NUMBL
const deleteDevis = async (req, res) => {
  const { dbName } = req.params;
  const { NUMBL } = req.query;

  if (!NUMBL || NUMBL.trim() === "") {
    return res
      .status(400)
      .json({ message: "Le numéro du devis (NUMBL) est requis." });
  }
  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    const Dfp = defineDfpModel(dynamicSequelize);
    const Ldfp = defineLdfpModel(dynamicSequelize);

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (!existingDevis) {
      return res
        .status(404)
        .json({ message: `Aucun devis trouvé avec le numéro ${NUMBL}.` });
    }

    const transaction = await dynamicSequelize.transaction();

    try {
      await Ldfp.destroy({ where: { NUMBL }, transaction });

      await Dfp.destroy({ where: { NUMBL }, transaction });

      await transaction.commit();

      return res
        .status(200)
        .json({ message: `Le devis ${NUMBL} a été supprimé avec succès.` });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du devis :", error);
    return res.status(500).json({
      message: "Erreur lors de la suppression du devis.",
      error: error.errors ? error.errors : error.message,
    });
  }
};

const updateDevis = async (req, res) => {
  const { dbName } = req.params;
  const { NUMBL, code, rsoc, articles } = req.body;

  console.log("NUMBL reçu:", NUMBL);
  console.log("Code client reçu:", code);
  console.log("Articles reçus :", articles);

  if (!NUMBL || NUMBL.trim() === "") {
    return res.status(400).json({ message: "Le champ NUMBL est manquant." });
  }
  if (!code || code.trim() === "") {
    return res.status(400).json({ message: "Le code client est manquant." });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    const Dfp = defineDfpModel(dynamicSequelize);
    const Ldfp = defineLdfpModel(dynamicSequelize);
    const Client = defineClientModel(dynamicSequelize);

    const transaction = await dynamicSequelize.transaction();

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (!existingDevis) {
      return res
        .status(404)
        .json({ message: `Le devis avec le numéro ${NUMBL} n'existe pas.` });
    }

    const client = await Client.findOne({ where: { code } });
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    const updatedDevis = await existingDevis.update(
      {
        CODECLI: client.code,
        rsoc,
      },
      { transaction }
    );

    await Ldfp.destroy({ where: { NUMBL }, transaction });

    const updatedArticles = [];

    for (const article of articles) {
      if (
        !article.code ||
        !article.libelle ||
        !article.nbrunite ||
        !article.prix1 ||
        !article.tauxtva
      ) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Tous les champs nécessaires pour l'article doivent être fournis.",
        });
      }

      const articleData = {
        NUMBL,
        CodeART: article.code,
        DesART: article.libelle,
        QteART: article.nbrunite,
        PUART: article.prix1,

        TauxTVA: article.tauxtva,
        Unite: article.unite || "unité",
        Conf: article.CONFIG || "",
        famille: article.famille || "",
        nbun: article.nbrunite,
      };

      const updatedArticle = await Ldfp.create(articleData, { transaction });
      updatedArticles.push(updatedArticle);
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Devis modifié avec succès.",
      devis: {
        NUMBL: updatedDevis.NUMBL,
        CODECLI: updatedDevis.CODECLI,

        articles: updatedArticles,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la modification du devis :", error);
    await transaction.rollback();
    return res.status(500).json({
      message: "Erreur lors de la modification du devis.",
      error: error.errors ? error.errors : error.message,
    });
  }
};

const getCodeRepAndRsRep = async (req, res) => {
  const { databaseName } = req.params;
  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const dbConnection = new Sequelize(
      `mysql://root:@127.0.0.1:3306/${databaseName}`,
      {
        dialect: "mysql",
        logging: false,
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      }
    );

    await dbConnection.authenticate();

    const result = await dbConnection.query(
      `SELECT dfp.CODEREP, dfp.RSREP
       FROM dfp`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucune information trouvée dans la base de données.",
      });
    }

    res.status(200).json({
      message: "Informations CODEREP et RSREP récupérées avec succès.",
      data: result,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations CODEREP et RSREP :",
      error
    );
    res.status(500).json({
      message:
        "Erreur lors de la récupération des informations CODEREP et RSREP.",
    });
  }
};

/**
 * Description
 * Filtrer les données en permettant
 * la filtre par plusieurs champs
 * @author Mahdi
 * @date 2025-02-07
 * @param {searchTerm} req
 * @param {filter} req
 * @param {databaseName} req
 * @returns {filterDevis}
 */
const filterDevis = async (req, res) => {
  // ? tableau contenant les champs de filtre et leurs valeurs
  const { filters } = req.query;
  const { databaseName } = req.query;
  try {
    const dbConnection = new Sequelize(
      `mysql://root:@127.0.0.1:3306/${databaseName}`,
      {
        dialect: "mysql",
        // crucial crutial step indeed
        logging: console.log,
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      }
    );

    await dbConnection
      .authenticate()
      .then(() => {
        console.log(
          `devisController/filterDevis> connexion à la base de données ${databaseName}`
        );
      })
      .catch((err) => {
        console.log(err);
      });

      // ? liste des conditions
      // ? exemple : ["NUML like :numbl, "libpv like :libpv"...]
      let whereClauses = [];
      // ? object contenant les noms des paramètres de requete sql avec leurs remplacements
      // ? exemple : {{numbl: %dv2401%}, {libpv: %kasserine% }}
      let replacements = {};
      
      // ? ajout de chaque condition quand la valeur n'est pas vide
      if (filters.NUMBL) {
        whereClauses.push('NUMBL like :numbl');
        replacements.numbl = `%${filters.NUMBL}%`;
      }
      if (filters.DATT) {
        whereClauses.push('datt like :datt');
        replacements.datt = `%${filters.DATT}%`;
      }
      if (filters.libpv) {
        whereClauses.push('libpv like :libpv');
        replacements.libpv = `%${filters.libpv}%`;
      }
      if (filters.ADRCLI) {
        whereClauses.push('adrcli like :adrcli');
        replacements.adrcli = `%${filters.ADRCLI}%`;
      }
      if (filters.CODECLI) {
        whereClauses.push('codecli like :codecli');
        replacements.codecli = `%${filters.CODECLI}%`;
      }
      if (filters.RSCLI) {
        whereClauses.push('rscli like :rscli');
        replacements.rscli = `%${filters.RSCLI}%`;
      }
      if (filters.MTTC) {
        whereClauses.push('mttc like :mttc');
        replacements.mttc = `%${filters.MTTC}%`;
      }
      
      // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
      let whereCondition = whereClauses.join(' AND ');
      
      // ? Si on on a aucune condition on effectue une requete de select * from dfp
      let query = `
        SELECT NUMBL, libpv, datt, CODECLI, ADRCLI, RSCLI, MTTC
        FROM dfp
        ${whereCondition ? 'WHERE ' + whereCondition : ''}
      `;

      const result = await dbConnection.query(query, {
        replacements: replacements,
        type: dbConnection.QueryTypes.SELECT,
      });

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// * récupere les détails d'un devis créé par l'utilisateur
// * courament connecté
// ! does NOT belong in here
// * verb : get
// * http://localhost:5000/api/utilisateurs/get-devis-details/SOLEVO/DV2500155
const getDevisDetails = async (req, res) => {
  const { databaseName, NUMBL } = req.params;

  if (!databaseName || !NUMBL) {
    return res.status(400).json({
      message:
        "Le nom de la base de données et le numéro de devis sont requis.",
    });
  }

  try {
    const decoded = verifyTokenValidity(req, res);
    const codeuser = decoded.codeuser;
    const dbConnection = getDatabaseConnection(databaseName, res);

    const [devisDetails, ldfpDetails] = await Promise.all([
      dbConnection.query(
        `SELECT dfp.NUMBL, dfp.ADRCLI, dfp.CODECLI, dfp.cp , dfp.MTTC, dfp.MHT, dfp.CODEREP, dfp.RSREP ,dfp.comm ,dfp.RSCLI, dfp.usera, dfp.DATEBL
         FROM dfp
         WHERE dfp.NUMBL = :NUMBL AND dfp.usera = :codeuser`,
        {
          replacements: { NUMBL, codeuser },
          type: dbConnection.QueryTypes.SELECT,
        }
      ),
      dbConnection.query(
        `SELECT ldfp.CodeART, ldfp.DesART, ldfp.QteART, ldfp.Remise, ldfp.TauxTVA, ldfp.Unite, ldfp.Conf, ldfp.NLigne, ldfp.famille, ldfp.PUART
         FROM ldfp
         WHERE ldfp.NUMBL = :NUMBL`,
        {
          replacements: { NUMBL },
          type: dbConnection.QueryTypes.SELECT,
        }
      ),
    ]);

    if (devisDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun devis trouvé pour ce numéro de devis." });
    }

    return res.status(200).json({
      message: `Informations du devis ${NUMBL} récupérées avec succès.`,
      databaseName,
      devis: [
        {
          year: new Date(devisDetails[0].DATEBL).getFullYear(),
          numbl: devisDetails[0].NUMBL,
          dfpDetails: devisDetails[0],
          lignes: ldfpDetails.map((article) => ({
            CodeART: article.CodeART,
            DesART: article.DesART,
            QteART: article.QteART,
            Remise: article.Remise,
            TauxTVA: article.TauxTVA,
            Unite: article.Unite,
            Conf: article.Conf,
            NLigne: article.NLigne,
            famille: article.famille,
            PUART: article.PUART,
          })),
        },
      ],
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du devis :",
      error
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des détails du devis.",
    });
  }
};

// * retourne la devis ayant l'année la plus récente avec ses lignes d'articles
// * pour une société donnée
// ! this does not belong in here
// * verb : get
// * http://localhost:5000/api/utilisateurs/get-devis-details/SOLEVO
const getLatestDevisByYear = async (req, res) => {
  const { databaseName } = req.params;

  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "En-tête Authorization manquant." });
    }

    const decoded = jwt.verify(
      authHeader.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    const codeuser = decoded.codeuser;

    const dbConnection = getDatabaseConnection(databaseName, res);

    const latestDevis = await dbConnection.query(
      `SELECT 
         YEAR(DATEBL) AS year, 
         MAX(numbl) AS numbl 
       FROM dfp 
       WHERE usera = :codeuser
       GROUP BY YEAR(DATEBL)`,
      {
        replacements: { codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    // ? ?????
    // if (latestDevis.length === 0) {
    //   return res.status(404).json({ message: 'Aucun devis trouvé pour cet utilisateur.' });
    // }

    const devisDetails = await Promise.all(
      latestDevis.map(async ({ year, numbl }) => {
        const dfpDetails = await dbConnection.query(
          `SELECT dfp.numbl, dfp.adrcli, dfp.codecli, dfp.cp, dfp.RSCLI, dfp.usera, dfp.DATEBL
           FROM dfp 
           WHERE numbl = :numbl`,
          {
            replacements: { numbl },
            type: dbConnection.QueryTypes.SELECT,
          }
        );

        const ldfpDetails = await dbConnection.query(
          `SELECT ldfp.CodeART, ldfp.DesART, ldfp.QteART, ldfp.Remise, ldfp.TauxTVA, ldfp.Unite
           FROM ldfp 
           WHERE NumBL = :numbl`,
          {
            replacements: { numbl },
            type: dbConnection.QueryTypes.SELECT,
          }
        );

        return {
          year,
          numbl,
          dfpDetails: dfpDetails[0],
          articles: ldfpDetails,
        };
      })
    );

    return res.status(200).json({
      message: "Derniers devis par année récupérés avec succès.",
      databaseName,
      devis: devisDetails,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des devis par année :",
      error
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des devis." });
  }
};

// * récuperer la liste des secteurs pour une société donnée
// ! this does not belong in here
// * verb : get
// * http://localhost:5000/api/utilisateurs/secteurs/SOLEVO
const getAllSectors = async (req, res) => {
  const { databaseName } = req.params;

  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const dbConnection = getDatabaseConnection(databaseName, res);

    // Récupérer tous les secteurs de la table secteur
    const sectors = await dbConnection.query(
      `SELECT codesec, desisec FROM secteur`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    if (sectors.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun secteur trouvé dans cette base de données." });
    }

    return res.status(200).json({
      message: "Liste des secteurs récupérée avec succès.",
      databaseName,
      sectors,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des secteurs :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des secteurs." });
  }
};

module.exports = {
  getAllClients,
  getClientByCode,
  getClientByRsoc,
  getLibpvByNumbl,
  getDevisWithDetails,
  getDevisCountByMonthAndYear,
 
  getDevisValidees,
  createDevis,
  getCodeRepAndRsRep,
  updateDevis,
  deleteDevis,
  filterDevis,

  getDevisDetails,
  getAllSectors,
  getLatestDevisByYear
};
