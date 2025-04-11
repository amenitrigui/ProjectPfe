const { QueryTypes, Op } = require("sequelize");
const defineDfpModel = require("../models/societe/dfp");
const defineLdfpModel = require("../models/societe/ldfp");
const { getDatabaseConnection } = require("../common/commonMethods");

// * récuperer la liste des dévis d'une societé donnée (dbName)
// * example:
// * input :
// * output : liste devis
// * http://localhost:5000/api/devis/SOLEVO/getTousDevis
const getTousDevis = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);

    const result = await dbConnection.query(
      `SELECT NUMBL, DATEBL,libpv, datt,CODECLI,ADRCLI,RSCLI,MTTC,CODEFACTURE,usera,RSREP,codesecteur FROM dfp `,
      { type: QueryTypes.SELECT }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucun devis trouvé.",
      });
    }

    return res.status(200).json({
      message: "Devis trouvés avec succès",
      devisList: result,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des devis :", error.message);
    return res.status(500).json({
      message: "Erreur lors de la récupération des devis.",
      error: error.message,
    });
  }
};

// * récuperer la somme de colonne MTTC pour une societé donnée (dbName)
// * example:
// * input :
// * output : total de chiffres généré par toutes les devis
// * http://localhost:5000/api/devis/SOLEVO/getTotalChiffres
const getTotalChiffres = async (req, res) => {
  const { dbName } = req.params;
  if (!dbName) {
    return res.status(400).json({
      message: "le nom de la base de donnes est requis",
    });
  }
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Devis = defineDfpModel(dbConnection);
    const totalchifre = await Devis.sum("MTTC");

    return res.status(200).json({
      message: "Total de chifre  de devis récupéré avec succès.",
      totalchifre: totalchifre,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du total de chifre  de devis :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération du total de chifre de devis.",
      error: error.message,
    });
  }
};

// * récuperer le nombre de dévis genérer pour une societé donnée (dbName)
// * example:
// * input :
// * output : nombre total de devis générés
// * http://localhost:5000/api/devis/SOLEVO/getNombreDevis
const getNombreDevis = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }
  
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Devis = defineDfpModel(dbConnection);
    const devisCount = await Devis.count({
      distinct: true,
      col: "NUMBL",
    });

    return res.status(200).json({
      message: "Total des devis récupéré avec succès.",
      totalDevis: devisCount,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre total des devis :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération du total des devis.",
      error: error.message,
    });
  }
};

// * créer un devis dans une societé donnée (dbName)
// * example:
// * input : devis
// * output : un nouveau devis est ajouté au base de données
// * http://localhost:5000/api/devis/SOLEVO/creerDevis
const creerDevis = async (req, res) => {
  const { dbName } = req.params;
  const {
    NUMBL,
    libpv,
    ADRCLI,
    CODECLI,
    cp,
    DATEBL,
    MREMISE,
    MTTC,
    comm,
    RSREP,
    CODEREP,
    usera,
    RSCLI,
    codesecteur,
    MHT,
    articles,
  } = req.body.devisInfo;

  console.log("NUMBL reçu:", NUMBL);
  console.log("Code client reçu:", CODECLI);
  console.log("Articles reçus :", articles);
  console.log("CODECLI: ", CODECLI);
  console.log("ADRCLI: ", ADRCLI);

  articles.map((article) => {
    article.NumBL = NUMBL;
  });

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);

    const Dfp = defineDfpModel(dbConnection);
    const ldfp = defineLdfpModel(dbConnection);

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (existingDevis) {
      return res.status(400).json({
        message: `Le devis avec le numéro ${NUMBL} existe déjà.`,
      });
    }

    const dateCreation = new Date();
    const dateFormatte = dateCreation.toISOString().split("T")[0];
    const mlettre = `Devis En Cours -- crée le : ${dateFormatte} / par : ${
      usera || "N/A"
    }`;

    const dfpData = {
      NUMBL,
      libpv,
      ADRCLI,
      CODECLI,
      DATEBL,
      MREMISE,
      MTTC,
      RSREP,
      CODEREP,
      MHT,
      codesecteur,
      cp,
      comm,
      RSCLI,
      MLETTRE: mlettre,
    };

    const devis = await Dfp.create(dfpData);
    articles.map(async (article) => {
      article.NLigne = articles.length;
      article.CodeART = article.code;
      const ligneDevis = await ldfp.create(article);
      console.log(ligneDevis);
    });

    return res.status(201).json({
      message: "Devis créé avec succès.",
      devis,
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

//* recupere les lignes de devis d'un devis
// * example:
// * input : DV2300002
// * output : la liste de lignes de devis
// * http://localhost:5000/api/devis/SOLEVO/getLignesDevis/DV2300002
const getLignesDevis = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { NumBL } = req.params;
    console.log(NumBL);
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeArticle = await dbConnection.query(
      `Select CodeART,Remise,Unite,QteART,DesART,TauxTVA,famille,PUART from ldfp where NumBL = :NumBL`,
      {
        replacements: { NumBL },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "ligne Article regupere avec succe",
      listeArticle: listeArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer la liste de devis créés dans une date spécifique (DATEBL)
// * pour une societé donnée (dbName)
const GetDevisParPeriode = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { DATEBL, codeuser } = req.query;

    const dbConnection = await getDatabaseConnection(dbName, res);

    if (!DATEBL || !codeuser) {
      return res.status(400).json({ message: "DATEBL ou codeuser est manquant" });
    }

    const devis = await dbConnection.query(
      `SELECT NUMBL, libpv, ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT 
       FROM dfp 
       WHERE DATEBL LIKE :DATEBL AND usera = :codeuser`,
      {
        replacements: {
          DATEBL: `%${DATEBL}%`, // Utilise LIKE pour faire une recherche partielle
          codeuser,
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Période récupérée avec succès par devis",
      devis: devis
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// * récuperer la liste de devis créés pour un client spécifique (CODECLI)
// * pour une societé donnée (dbName)
//* url http://localhost:5000/api/devis/SOLEVO/getDevisParClient?CODECLI=41102630&codeuser=4
const GetDevisListParClient = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { CODECLI, codeuser } = req.query;

    console.log(dbName, " ", CODECLI, " ", codeuser);
    
    const dbConnection = await getDatabaseConnection(dbName, res);

    const devis = await dbConnection.query(
      `SELECT 
         NUMBL, libpv, ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, 
         comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT 
       FROM dfp 
       WHERE CODECLI LIKE :codecli AND usera = :codeuser`,
      {
        replacements: {
          codecli: `%${CODECLI}%`,  // LIKE sur CODECLI
          codeuser,
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Code client récupéré avec succès par devis",
      devis: devis,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// * récuperer la liste des codes de devis (NUMBL)
// * pour une societé donnée (dbName)
// * example:
// * input : 4
// * output : la liste de codes devis généré par l'utilisateur 4
// * http://localhost:5000/api/devis/SOLEVO/getCodesDevis/4
const getCodesDevis = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { usera } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeNUMBL = await dbConnection.query(
      `SELECT NUMBL from dfp where usera = :usera order by CAST(NUMBL AS UNSIGNED) ASC`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          usera: usera,
        },
      }
    );

    return res.status(200).json({
      message: "tout le code devis recupere avec succes",
      listeNUMBL: listeNUMBL,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer un devis par son code (NUMBL)
// * pour une societé donnée (dbName)
// * example:
// * input : NUMBL = DV2300002, usera=4
// * output : le devis ayant le NUMBL DV2300002, créé par l'utilisateur 4
// * http://localhost:5000/api/devis/SOLEVO/getDevisParNUMBL/DV2300002
const getDevisParNUMBL = async (req, res) => {
  try {
    const { dbName, NUMBL } = req.params;
    const { codeuser } = req.query;

    const dbConnection = await getDatabaseConnection(dbName, res);
    console.log(NUMBL, " ", codeuser);

    if (NUMBL && codeuser) {
      const devis = await dbConnection.query(
        `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, 
          comm, RSREP, CODEREP, TIMBRE, usera, RSCLI, codesecteur, MHT 
         FROM dfp 
         WHERE NUMBL LIKE :numbl 
           AND usera = :codeuser`,
        {
          replacements: {
            numbl: `%${NUMBL}%`,  // Ajout du LIKE ici
            codeuser,
          },
          type: dbConnection.QueryTypes.SELECT,
        }
      );
      return res
        .status(200)
        .json({ message: "devis recupere avec succes", devis: devis });
    } else {
      return res.status(500).json({ message: "récupération de devis échoué" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// * récuperer l'utilisateur qui a crée un devis à partir
// * de la base des données ErpSole
// * pour une societé donnée
// ! still haven't tested this
const getDevisCreator = async (req, res) => {
  try {
    const { codea } = req.params;
    const dbConnection = getDatabaseConnection("UserErpSole", res);
    const resultat = await dbConnection.query(
      `SELECT * FROM utlisateur u, dfp d where d.codea = u.codeuser`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (resultat) {
      console.log(resultat);
      return res.status(200).json({ resultat: resultat });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getInfoUtilisateur = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { usera } = req.query;
    console.log(usera);
    const dbConnection = await getDatabaseConnection(dbName, res);
    if (usera) {
      const utilisateur = await dbConnection.query(
        `SELECT NUMBL,libpv,ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT from dfp where usera = :usera`,
        {
          replacements: { usera },
          type: dbConnection.QueryTypes.SELECT,
        }
      );
      return res.status(200).json({
        message: "client recupere avec succes ",
        utilisateur: utilisateur,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// * récuperer toutes les devis par montant
// * pour une societé donnée (dbName)
// * example:
// * input montant=5664.511, codeuser=4
// * output : le(s) devis ayant(ent) le montant 5664.511 et créé par l'utilisateur 4
// * http://localhost:5000/api/devis/SOLEVO/getDevisParMontant/5664.511
const getDevisParMontant = async (req, res) => {
  try {
    const { dbName, montant } = req.params;
    const { codeuser } = req.query;

    const dbConnection = await getDatabaseConnection(dbName, res);

    if (montant && codeuser) {
      // Ici on convertit le montant en nombre pour s'assurer que la comparaison fonctionne
      const devis = await dbConnection.query(
        `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, 
          comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT 
        FROM dfp 
        WHERE MTTC  LIKE :montant AND usera = :codeuser`,
        {
          replacements: {
            montant: `%${montant}%`,  // LIKE avec wildcard
            codeuser
          },
          type: dbConnection.QueryTypes.SELECT,
        }
      );
      return res
        .status(200)
        .json({ message: "devis recupere avec succes", devis: devis });
    } else {
      return res
        .status(500)
        .json({ message: "erreur lors de récupération de devis par montant" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// * méthode pour récuperer la liste de points de vente
// * exemple :
// * input :
// * output: liste pointsVenteDistincts: [{libelle: "ptVente1"},{libelle: "ptVente2"},{libelle: "ptVente3"},{libelle: "ptVente4"},...]
// * http://localhost:5000/api/devis/SOLEVO/getListePointVente
const getListePointVente = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const pointsVenteDistincts = await dbConnection.query(
      `SELECT DISTINCT(Libelle) from pointvente`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "points de vente recupérés avec succès",
      pointsVenteDistincts: pointsVenteDistincts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer le NUMBL de dernier devis généré
// * cette itération de la solution ne compte pas
// * l'année courante du système, ie: implémentation basique
// * example:
// * input
// * output : NUMBL du dernier devis généré
// * http://localhost:5000/api/devis/SOLEVO/getDerniereNumbl
const getDerniereNumbl = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const derniereNumbl = await dbConnection.query(
      `SELECT NUMBL from dfp where DateBl = (SELECT MAX(DATEBL) from dfp) ORDER BY (NUMBL) DESC LIMIT 1`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    console.log(derniereNumbl[0]);
    // ? derniereNumbl: derniereNumbl[0] || {}
    // ? pour que le backend ne plantera pas si derniereNumbl retourne aucune résultat
    // ? c'est à dire un tableau vide: []
    return res.status(200).json({
      message: "dernièr numbl récuperé avec succès",
      derniereNumbl: derniereNumbl[0] || {},
    });
  } catch (error) {
    return res.status(500).json({ messasge: error.message });
  }
};

//* suprimer un devis par son NUMBL
// * example:
// * input : NUMBL = DV2500155
// * output : Devis ayant NUMBL = DV2500155 est supprimé
// * http://localhost:5000/api/devis/SOLEVO/deleteDevis/DV2500155
const deleteDevis = async (req, res) => {
  const { dbName, NUMBL } = req.params;
  if (!NUMBL || NUMBL.trim() === "") {
    return res
      .status(400)
      .json({ message: "Le numéro du devis (NUMBL) est requis." });
  }
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);

    const Dfp = defineDfpModel(dbConnection);
    const Ldfp = defineLdfpModel(dbConnection);

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (!existingDevis) {
      return res
        .status(404)
        .json({ message: `Aucun devis trouvé avec le numéro ${NUMBL}.` });
    }

    const transaction = await dbConnection.transaction();

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

// * méthode pour récuperer la liste de devis par code client
// * url : http://localhost:5000/api/devis/SOLEVO/getListeDevisParCodeClient?codeClient=2
const getListeDevisParCodeClient = async (req, res) => {
  const { dbName } = req.params;
  const { codeClient } = req.query;
  if (!dbName || !codeClient) {
    return res
      .status(400)
      .json({ message: "l'un ou les deux paramètres sont nulles" });
  }

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Devis = defineDfpModel(dbConnection);
    const listeDevis = await Devis.findAll({
      where: {
        CODECLI: { [Op.like]: `%${codeClient}%` },
      },
      order: [["NUMBL", "ASC"]],
    });

    console.log(listeDevis);
    if (!listeDevis || listeDevis.length == 0) {
      return res
        .status(404)
        .json({ message: "aucun devis trouvé pour cet code client" });
    }
    if (listeDevis) {
      return res
        .status(200)
        .json({ message: "liste devis récuperé avec succès", listeDevis });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTousDevis,
  getNombreDevis,
  getTotalChiffres,
  creerDevis,
  getDevisParNUMBL,
  getCodesDevis,
  getDevisParMontant,
  GetDevisListParClient,
  GetDevisParPeriode,
  getListePointVente,
  getInfoUtilisateur,
  getListePointVente,
  getLignesDevis,
  getDevisCreator,
  getDerniereNumbl,
  deleteDevis,
  getListeDevisParCodeClient,
};
