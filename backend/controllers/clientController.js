const defineClientModel = require("../models/client");
const jwt = require("jsonwebtoken");
const {
  getDatabaseConnection,
  verifyTokenValidity,
} = require("../common/commonMethods");

/**
 * Description
 * Récuperer la liste des clients à partir de bd
 * @author Ameni
 * @date 2025-02-13
 * @param {String} dbName
 * @returns {ListeClients}
 */
const getlisteclient = async (req, res) => {
  const { dbName } = req.params;
  try {
    //const decoded = verifyTokenValidity(req, res);
    const dbConnection = await getDatabaseConnection(dbName, res);

    const result = await dbConnection.query(`select * from client`, {
      type: dbConnection.QueryTypes.SELECT,
    });

    return res.status(200).json({
      message: "liste client recupere",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/**
 * Description
 * Filtrer la liste des clients
 * @author Ameni
 * @date 2025-02-13
 * @param {any} req
 * @param {any} res
 * @returns {ListeClientsFiltre}
 */
const getlisteclientsfilter = async (req, res) => {
  const { dbName } = req.params;
  const { filters } = req.query;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    // ? liste des conditions
    // ? exemple : ["NUML like :numbl, "libpv like :libpv"...]
    let whereClauses = [];
    // ? object contenant les noms des paramètres de requete sql avec leurs remplacements
    // ? exemple : {{numbl: %dv2401%}, {libpv: %kasserine% }}
    let replacements = {};

    // ? ajout de chaque condition quand la valeur n'est pas vide
    if (filters.code) {
      whereClauses.push("code like :code");
      replacements.code = `%${filters.code}%`;
    }
    if (filters.cp) {
      whereClauses.push("cp like :cp");
      replacements.cp = `%${filters.cp}%`;
    }
    if (filters.adresse) {
      whereClauses.push("adresse like :adresse");
      replacements.adresse = `%${filters.adresse}%`;
    }
    if (filters.email) {
      whereClauses.push("email like :email");
      replacements.email = `%${filters.email}%`;
    }
    if (filters.rsoc) {
      whereClauses.push("rsoc like :rsoc");
      replacements.rsoc = `%${filters.rsoc}%`;
    }

    // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
    let whereCondition = whereClauses.join(" AND ");

    // ? Si on on a aucune condition on effectue une requete de select * from dfp
    let query = `SELECT code, rsoc, email, cp, adresse 
     FROM client 
      ${whereCondition ? "WHERE " + whereCondition : ""}`;

    const result = await dbConnection.query(query, {
      replacements: replacements,
      type: dbConnection.QueryTypes.SELECT,
    });

    return res.status(200).json({
      message: "Filtrage réussi",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

/**
 * Description
 * Ajouter Un client
 * @author Ameni
 * @date 2025-02-13
 * @param {String} dbName
 * @param {String} code
 * @param {String} rsoc
 * @param {String} adresse
 * @param {String} cp
 * @param {String} email
 * @param {String} telephone
 * @param {String} desrep
 * @returns {any}
 */
const AjouterClient = async (req, res) => {
  const { dbName } = req.params;
  const { clientInfos } = req.body;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);
    const newClient = await Client.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      code: clientInfos.code,
      email: clientInfos.email,
      rsoc: clientInfos.rsoc,
      cp: clientInfos.cp,
      telephone: clientInfos.telephone,
      desrep: clientInfos.desrep,
      adresse: clientInfos.adresse,
    });

    return res.status(200).json({ message: "insertion avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/**
 * Description
 * Supprimer un client de la bd
 * @author Mahdi
 * @date 2025-02-13
 * @param {Strign} dbName
 * @param {String} code
 * @returns {status}
 */
const supprimerClient = async (req, res) => {
  const { dbName, code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);

    await Client.destroy({ where: { code: code } });
    console.log(code);

    return res.status(200).json({ message: "client supprimé avec succès" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "un erreur est survenu lors de suppression de client" });
  }
};

/**
 * Description
 * Récuperer un client par son code
 * @author Mahdi
 * @date 2025-02-13
 * @param {String} dbName
 * @param {String} code
 * @returns {client}
 */
const getClient = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);
    const client = await Client.findOne({ where: { code: code } });
    if (client) return res.status(200).json({ client });

    return res.status(404).json({ message: "Client introuvable" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la récupération du client.",
        error,
      }); // Correct French
  }
};

/**
 * Description
 * @author Mahdi
 * @date 2025-02-13
 * @param {String} dbName
 * @param {String} code
 * @param {String} telephone
 * @param {String} desrep
 * @param {String} email
 * @param {String} cp
 * @param {String} adresse
 * @param {String} rsoc
 * @returns {nouvClient}
 */
const updateClient = async (req, res) => {
  const { dbName } = req.params;
  const { code, rsoc, adresse, cp, email, telephone, desrep } = req.body;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);
    const client = await Client.findOne({ where: { code: code } });
    if (client) {
      await Client.update(
        {
          rsoc: rsoc,
          adresse: adresse,
          cp: cp,
          email: email,
          telephone: telephone,
          desrep,
        },
        { where: { code: code } }
      );
      return res
        .status(200)
        .json({ message: "Client mise à jour avec succès" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "un erreur est survenu lors de mise à jour de client" });
  }
};

module.exports = {
  getlisteclient,
  getlisteclientsfilter,
  AjouterClient,
  supprimerClient,
  getClient,
  updateClient,
};
