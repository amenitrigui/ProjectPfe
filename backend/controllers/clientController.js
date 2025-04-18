const defineClientModel = require("../models/societe/client");
const {
  getDatabaseConnection,
  verifyTokenValidity,
} = require("../common/commonMethods");

// * récupèrer la liste des clients à partir de la base des données
// * dbName donnée comme paramètre de requete
// * example:
// * input :
// * output : liste clients
// * http://localhost:5000/api/client/SOLEVO/getListeClients
const getListeClients = async (req, res) => {
  const { dbName } = req.params;
  try {
    //const decoded = verifyTokenValidity(req, res);
    const dbConnection = await getDatabaseConnection(dbName);

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
// * example:
// * input : liste de filtres
// * output : liste de clients filtrés
// * http://localhost:5000/api/client/SOLEVO/filtrerListeClients
const filtrerListeClients = async (req, res) => {
  const { dbName } = req.params;
  const { filters } = req.query;

  const dbConnection = await getDatabaseConnection(dbName);
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
  if (filters.Matricule) {
    whereClauses.push("Matricule like :Matricule");
    replacements.Matricule = `%${filters.Matricule}%`;
  }
  if (filters.telephone) {
    whereClauses.push("telephone like :telephone");
    replacements.telephone = `%${filters.telephone}%`;
  }
  if (filters.fax) {
    whereClauses.push("fax like :fax");
    replacements.fax = `%${filters.fax}%`;
  }
  if (filters.rsoc) {
    whereClauses.push("rsoc like :rsoc");
    replacements.rsoc = `%${filters.rsoc}%`;
  }
  if (filters.desrep) {
    whereClauses.push("desrep like :desrep");
    replacements.desrep = `%${filters.desrep}%`;
  }

  // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
  let whereCondition = whereClauses.join(" AND ");

  // ? Si on on a aucune condition on effectue une requete de select * from dfp
  let query = `SELECT code, rsoc, desrep, fax, telephone, Matricule
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
// * example:
// * input : client
// * output : client ajouté à la base des données
// * http://localhost:5000/api/client/SOLEVO/AjouterClient
const AjouterClient = async (req, res) => {
  const { dbName } = req.params;
  const { clientInfos } = req.body;
  console.log("ajouterClient infos :",clientInfos)
  
  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const Client = defineClientModel(dbConnection);
    const newClient = await Client.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      code: clientInfos.code,
      typecli: clientInfos.typecli, // ! select à vérifier
      cin: clientInfos.cin,
      rsoc: clientInfos.rsoc,
      adresse: clientInfos.adresse,
      activite: clientInfos.activite,
      cp: clientInfos.cp,
      desicp: clientInfos.desicp,
      nature: clientInfos.nature, // !
      desisec: clientInfos.desisec, // !
      desireg: clientInfos.desireg, // ! dans la base: desireg, dans clientInfos : desirgg
      tel1:clientInfos.tel1,
      tel2:clientInfos.tel2,
      email: clientInfos.email,
      fax: clientInfos.fax,
      nom1: clientInfos.nom1,
      nom2: clientInfos.nom2,
      nom3: clientInfos.nom3,
      titre1: clientInfos.titre1,
      titre2: clientInfos.titre2,
      titre3: clientInfos.titre3,
      gsm1: clientInfos.gsm1,
      gsm2: clientInfos.gsm2,
      gsm3: clientInfos.gsm3,
      datec:clientInfos.datec,
      nposte1: clientInfos.nposte1,
      nposte2: clientInfos.nposte2,
      nposte3: clientInfos.nposte3,
      Commentaire: clientInfos.Commentaire,
      usera: clientInfos.usera, // ! 
      fact: clientInfos.fact, // ! checkbox à vérifier
      timbref: clientInfos.timbref, // ! checkbox à vérifier
      cltexport: clientInfos.cltexport, // ! checkbox à vérifier
      suspfodec: clientInfos.suspfodec, // ! checkbox à vérifier
      regime: clientInfos.regime, // ! checkbox à vérifier
      exon: clientInfos.exon, // ! checkbox à vérifier
      majotva: clientInfos.majotva, // ! checkbox à vérifier
      fidel: clientInfos.fidel, // ! checkbox à vérifier
      datefinaut: clientInfos.datefinaut,
      datedebaut: clientInfos.datedebaut,
      decision: clientInfos.decision,
      matriculef: clientInfos.matriculef,
      reference: clientInfos.reference,
      srisque: clientInfos.srisque,
      scredit: clientInfos.scredit,
      remise: clientInfos.remise,
      compteb : clientInfos.compteb, // !
      banque:clientInfos.banque,
      contrat:clientInfos.contrat,
      blockage:clientInfos.blockage,
      susptva:clientInfos.susptva,
      tarif:clientInfos.tarif,
      desireg:clientInfos.desireg
      
    });
    

    return res.status(200).json({ message: "insertion avec succès" ,clientInfos});
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// * supprimer un client ou plusieurs clients par leurs codes
// * qui se trouvent dans le tableau clients envoyé par le client
// * de la base des données dbName donnée comme paramètre de requete
// * example:
// * input : 41001080
// * output : client supprimé de la base de données
// * http://localhost:5000/api/client/SOLEVO/Delete/41100020
const supprimerClient = async (req, res) => {
  const { dbName } = req.params;
  // ? tableau contenant les codes des clients à supprimer
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const Client = defineClientModel(dbConnection);

    await Client.destroy({ where: { code: code } });

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
// * example:
// * input : 41001080
// * output : client
// * http://localhost:5000/api/client/SOLEVO/getClientParCode/41001080
const getClientParCode = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const client = await dbConnection.query(
      `select * from client where code LIKE :code`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          code: `%${code}%`,
        },
      }
    );
    console.log(client);
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
// * example:
// * input : nouv infos client
// * output : infos client mis à jour
// * http://localhost:5000/api/client/SOLEVO/majClient
const majClient = async (req, res) => {
  const { dbName } = req.params;
  const { clientMaj } = req.body;
  console.log("majClient: ", clientMaj);
  try {
    const dbConnection = await getDatabaseConnection(dbName);
    const Client = defineClientModel(dbConnection);
    const client = await Client.findOne({ where: { code: clientMaj.code } });

    if (client) {
      await Client.update(
        {
          code: clientMaj.code,
          typecli: clientMaj.typecli, 
          cin: clientMaj.cin,
          rsoc: clientMaj.rsoc,
          adresse: clientMaj.adresse,
          activite: clientMaj.activite,
          cp: clientMaj.cp,
          desicp: clientMaj.desicp,
          nature: clientMaj.nature, 
          desisec: clientMaj.desisec, 
          desireg: clientMaj.desireg, 
          tel1:clientMaj.tel1,
          tel2:clientMaj.tel2,
          email: clientMaj.email,
          fax: clientMaj.fax,
          nom1: clientMaj.nom1,
          nom2: clientMaj.nom2,
          nom3: clientMaj.nom3,
          titre1: clientMaj.titre1,
          titre2: clientMaj.titre2,
          titre3: clientMaj.titre3,
          gsm1: clientMaj.gsm1,
          datemaj:clientMaj.datemaj,
          gsm2: clientMaj.gsm2,
          gsm3: clientMaj.gsm3,
          nposte1: clientMaj.nposte1,
          nposte2: clientMaj.nposte2,
          nposte3: clientMaj.nposte3,
          Commentaire: clientMaj.Commentaire,
          usera: clientMaj.usera, 
          fact: clientMaj.fact, 
          timbref: clientMaj.timbref, 
          cltexport: clientMaj.cltexport, 
          suspfodec: clientMaj.suspfodec,
          regime: clientMaj.regime, 
          exon: clientMaj.exon, 
          majotva: clientMaj.majotva, 
          fidel: clientMaj.fidel,
          datefinaut: clientMaj.datefinaut,
          datedebaut: clientMaj.datedebaut,
          decision: clientMaj.decision,
          matriculef: clientMaj.matriculef,
          reference: clientMaj.reference,
          srisque: clientMaj.srisque,
          scredit: clientMaj.scredit,
          remise: clientMaj.remise,
          compteb : clientMaj.compteb, 
          banque:clientMaj.banque,
          contrat:clientMaj.contrat,
          blockage:clientMaj.blockage,
          susptva:clientMaj.susptva,
          tarif:clientMaj.tarif,
          desireg:clientMaj.desireg
        },
        { where: { code: clientMaj.code } }
      );
      return res
        .status(200)
        .json({ message: "Client mise à jour avec succès" });
    } else {
      return res.status(500).json({ message: "le client n'est pas définit" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "un erreur est survenu lors de mise à jour de client ",
      error: error.message,
    });
  }
};

//* récuperer la liste de codes clients
// * example:
// * input :
// * output : liste codes clients
// * http://localhost:5000/api/client/SOLEVO/getToutCodesClient
const getToutCodesClient = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName);

    const listeCodesClients = await dbConnection.query(
      `SELECT code FROM client ORDER BY code`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Code client récupéré avec succès",
      listeCodesClients: listeCodesClients,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* récuperer un client par type
// * example:
// * input :
// * output : client
// * http://localhost:5000/api/client/SOLEVO/getClientParTypecli/l
const getClientParRaisonSociale = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { rsoc } = req.params;
    const dbConnection = await getDatabaseConnection(dbName);
    const client = await dbConnection.query(
      `SELECT * FROM CLIENT where rsoc LIKE :rsoc`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          rsoc:`%${rsoc}%`,

        },
      }
    );
    console.log(client);

    return res
      .status(200)
      .json({ message: "taison sociale  récuperé avec succès", clients: client });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* récuperer un client par cin
// * example:
// * input : 9780000
// * output : client
// * http://localhost:5000/api/client/SOLEVO/getClientParCin/9780000
const getClientParCin = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { cin } = req.params;
    const dbConnection = await getDatabaseConnection(dbName);
    const client = await dbConnection.query(
      `SELECT * FROM CLIENT where cin LIKE :cin`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          cin: `%${cin}%`,
        },
      }
    );

    return res
      .status(200)
      .json({ message: "client récuperé avec succès", client: client });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* récuperer le dernièr code de client dans la base
// * example: le dernier code client dans la base est 2000
// * input :
// * output : 2000
// * http://localhost:5000/api/client/SOLEVO/getDerniereCodeClient
const getDerniereCodeClient = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName);
    const derniereCodeClient = await dbConnection.query(
      `SELECT code FROM CLIENT ORDER BY CAST(code AS UNSIGNED) DESC LIMIT 1`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "dernière code client récuperé avec succès",
      derniereCodeClient: derniereCodeClient[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  getClientParCode,
  majClient,
  getClientParRaisonSociale,
  getDerniereCodeClient,
  getClientParCin,
  getToutCodesClient
};
