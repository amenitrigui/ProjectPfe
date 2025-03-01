const defineClientModel = require("../models/client");
const {
  getDatabaseConnection,
  verifyTokenValidity,
} = require("../common/commonMethods");

// * récupèrer la liste des clients à partir de la base des données
// * dbName donnée comme paramètre de requete

const getListeClients = async (req, res) => {
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

// * retourner une liste des clients filtrée, selon le table
// * filters données par le client
const filtrerListeClients = async (req, res) => {
  const { dbName } = req.params;
  const { filters } = req.query;

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
};

// * Inserer les informations d'un client clientInfos
// * dans la base des données dbName donnée comme paramètre de requete

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

// * supprimer un client ou plusieurs clients par leurs codes
// * qui se trouvent dans le tableau clients envoyé par le client
// * de la base des données dbName donnée comme paramètre de requete

const supprimerClient = async (req, res) => {
  const { dbName } = req.params;
  // ? tableau contenant les codes des clients à supprimer
  const { clients } = req.body;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);

    await Client.destroy({ where: { code: clients } });

    return res
      .status(200)
      .json({ message: "client(s) supprimé(s) avec succès" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "un erreur est survenu lors de suppression de client" });
  }
};

// * récupere un client à partir de la base des données
// * dbName donnée comme paramètre de requete
// * par son code, aussi donnée comme paramètre de requete

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
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du client.",
      error,
    }); // Correct French
  }
};

// * mettre à jour un client d'une societé donnée comme paramètre de requete (dbName)

const majClient = async (req, res) => {
  const { dbName } = req.params;
  const { clientUpdate } = req.body;

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);
    const client = await Client.findOne({ where: { code: clientUpdate.code } });

    if (client) {
      await Client.update(
        {
          rsoc: clientUpdate.rsoc,
          adresse: clientUpdate.adresse,
          cp: clientUpdate.cp,
          email: clientUpdate.email,
          telephone: clientUpdate.telephone,
          desrep: clientUpdate.desrep,
        },
        { where: { code: clientUpdate.code } }
      );
      return res
        .status(200)
        .json({ message: "Client mise à jour avec succès" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "un erreur est survenu lors de mise à jour de client ",
      error: error.message,
    });
  }
};

module.exports = {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  getClient,
  majClient,
};
