const { QueryTypes, Op } = require("sequelize");
const defineDfpModel = require("../models/societe/dfp");
const defineLdfpModel = require("../models/societe/ldfp");
const { getDatabaseConnection } = require("../common/commonMethods");
const { getConnexionBd } = require("../db/config");

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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    const result = await dbConnection.query(
      `SELECT NUMBL, DATEBL,libpv, datt,CODECLI,ADRCLI,RSCLI,MTTC,CODEFACTURE,usera,RSREP,codesecteur ,delailivr  , transport FROM dfp `,
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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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
    // const dbConnection = getConnexionBd()//await getDatabaseConnection(dbName);
    const dbConnection = getConnexionBd();
    console.log("database: ", dbConnection);

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
// * http://localhost:5000/api/devis/SOLEVO/ajouterDevis
const ajouterDevis = async (req, res) => {
  const { dbName } = req.params;
  const {
    NUMBL,
    libpv,
    ADRCLI,
    CODECLI,
    cp,
    DATEBL,
    MREMISE,
    delailivr,
    MTTC,
    comm,
    RSREP,
    CODEREP,
    REFCOMM,
    usera,
    RSCLI,
    transport,
    codesecteur,
    MHT,
    articles,
  } = req.body.devisInfo;

  console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[", req.body.devisInfo)
  articles.map((article) => {
    article.NumBL = NUMBL;
  });

  try {
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

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
      delailivr,
      REFCOMM,
      usera,
      transport,
      comm,
      RSCLI,
      mlettre,
    };

    console.log(dfpData);

    const devis = await Dfp.create(dfpData);
    articles.map(async (article) => {
      article.NLigne = articles.length;
      article.CodeART = article.code;
      const ligneDevis = null; //await ldfp.create(article);
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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    if (!DATEBL || !codeuser) {
      return res
        .status(400)
        .json({ message: "DATEBL ou codeuser est manquant" });
    }

    const devis = await dbConnection.query(
      `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI,  DATEBL, MREMISE, MTTC, mlettre,
          comm, RSREP, CODEREP, TIMBRE, usera, RSCLI, codesecteur, MHT ,transport,REFCOMM,delailivr
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
      devis: devis,
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

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    const devis = await dbConnection.query(
      `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI,  DATEBL, MREMISE, MTTC, mlettre,
          comm, RSREP, CODEREP, TIMBRE, usera, RSCLI, codesecteur, MHT ,transport,REFCOMM,delailivr
       FROM dfp 
       WHERE CODECLI LIKE :codecli AND usera = :codeuser`,
      {
        replacements: {
          codecli: `%${CODECLI}%`, // LIKE sur CODECLI
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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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
// * http://localhost:5000/api/devis/SOLEVO/getDevisParNUMBL/DV2300002?codeuser=4
const getDevisParNUMBL = async (req, res) => {
  try {
    const { dbName, NUMBL } = req.params;
    const { codeuser } = req.query;

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    console.log(NUMBL, " ", codeuser);

    if (NUMBL && codeuser) {
      const devis = await dbConnection.query(
        `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI,  DATEBL, MREMISE, MTTC, mlettre,
          comm, RSREP, CODEREP, TIMBRE, usera, RSCLI, codesecteur, MHT ,transport,REFCOMM,delailivr
         FROM dfp 
         WHERE NUMBL LIKE :numbl 
           AND usera = :codeuser`,
        {
          replacements: {
            numbl: `${NUMBL}`,
            codeuser,
          },
          type: dbConnection.QueryTypes.SELECT,
        }
      );

      if (devis && devis.length > 0) {
        return res
          .status(200)
          .json({ message: "devis recupere avec succes", devis: devis });
      } else {
        return res.status(404).json({ message: "aucun devis n'est trouvé" });
      }
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
    const dbConnection = getDatabaseConnection(process.env.DB_USERS_NAME);
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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    if (montant && codeuser) {
      // Ici on convertit le montant en nombre pour s'assurer que la comparaison fonctionne
      const devis = await dbConnection.query(
        `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI,  DATEBL, MREMISE, MTTC, mlettre,
          comm, RSREP, CODEREP, TIMBRE, usera, RSCLI, codesecteur, MHT ,transport,REFCOMM,delailivr
        FROM dfp 
        WHERE MTTC  LIKE :montant AND usera = :codeuser`,
        {
          replacements: {
            montant: `%${montant}%`, // LIKE avec wildcard
            codeuser,
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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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
// * http://localhost:5000/api/devis/SOLEVO/getDerniereNumbl?codeuser=04
const getDerniereNumbl = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { codeuser } = req.query;
    console.log("codeuser: ", codeuser);
    let derniereNumbl;

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    if (codeuser) {
      derniereNumbl = await dbConnection.query(
        `SELECT MAX(NUMBL) as derniereNumbl from dfp where usera = :codeuser`,
        {
          type: dbConnection.QueryTypes.SELECT,
          replacements: {
            codeuser,
          },
        }
      );
    }
    if (!codeuser) {
      derniereNumbl = await dbConnection.query(
        `SELECT MAX(NUMBL) as derniereNumbl from dfp`,
        {
          type: dbConnection.QueryTypes.SELECT,
        }
      );
    }

    console.log(derniereNumbl);

    // ? derniereNumbl: derniereNumbl[0] || {}
    // ? pour que le backend ne plantera pas si derniereNumbl retourne aucune résultat
    // ? c'est à dire un tableau vide: []
    if (derniereNumbl.length != 0) {
      return res.status(200).json({
        message: "dernièr numbl récuperé avec succès",
        derniereNumbl: derniereNumbl[0].derniereNumbl,
      });
    }

    if (derniereNumbl.length == 0) {
      return res.status(400).json({
        message: "aucun numbl trouvé pour cet utilisateur",
      });
    }
  } catch (error) {
    return res.status(500).json({ messasge: error.message });
  }
};

//* suprimer un devis par son NUMBL
// * example:
// * input : NUMBL = DV2500155
// * output : Devis ayant NUMBL = DV2500155 est supprimé
// * http://localhost:5000/api/devis/SOLEVO/annulerDevis/DV2500155
const annulerDevis = async (req, res) => {
  const { dbName, NUMBL } = req.params;
  const { codeuser } = req.query;
  if (!NUMBL || NUMBL.trim() === "") {
    return res
      .status(400)
      .json({ message: "Le numéro du devis (NUMBL) est requis." });
  }
  try {
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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

// * récuperer un devis par son code (NUMBL)
// * pour une societé donnée (dbName)
// * example:
// * input : NUMBL = DV2300, usera=4
// * output : la liste de devis ayant le NUMBL DV2300%, créés par l'utilisateur 4
// * http://localhost:5000/api/devis/SOLEVO/getListeDevisParNUMBL/?NUMBL=DV2300&codeuser=4
const getListeDevisParNUMBL = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { codeuser, NUMBL } = req.query;

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    if (NUMBL && codeuser) {
      const listeDevis = await dbConnection.query(
        `SELECT 
          NUMBL, libpv, ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, 
          comm, RSREP, CODEREP, TIMBRE, usera, RSCLI, codesecteur, MHT , transport,delailivr,modepaie
         FROM dfp 
         WHERE NUMBL LIKE :numbl 
           AND usera = :codeuser`,
        {
          replacements: {
            numbl: `%${NUMBL}%`,
            codeuser,
          },
          type: dbConnection.QueryTypes.SELECT,
        }
      );

      if (listeDevis && listeDevis.length > 0) {
        return res.status(200).json({
          message: "Liste de devis récuperé avec succes",
          listeDevis: listeDevis,
        });
      } else {
        return res.status(404).json({ message: "aucun devis n'est trouvé" });
      }
    } else {
      return res.status(500).json({ message: "récupération de devis échoué" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    const sqlQuery = `
      SELECT 
        YEAR(DATEBL) AS year,
        MONTH(DATEBL) AS month,
        COUNT(DISTINCT NUMBL) AS totalDevis
      FROM dfp
      GROUP BY YEAR(DATEBL), MONTH(DATEBL)
      ORDER BY year DESC, month DESC;
    `;

    const result = await dbConnection.query(sqlQuery, {
      type: dbConnection.QueryTypes.SELECT,
    });

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucun devis trouvé.",
      });
    }

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

// * récuperer le nombre total de devis générés
// * pour une societé donnée (dbName)
// * example:
// * input : dbName = SOLEVO
// * output : 972 devis générés
// * http://localhost:5000/api/devis/SOLEVO/getNbTotalDevisGeneres
const getNbTotalDevisGeneres = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    const nbDevisGeneresTotal = await Devis.count({
      where: {
        [Op.and]: [
          {
            [Op.not]: {
              executer: "N",
            },
          },
          {
            [Op.not]: {
              executer: "",
            },
          },
          {
            [Op.not]: {
              executer: "A",
            },
          },
          {
            [Op.not]: {
              executer: null,
            },
          },
        ],
      },
    });
    console.log(nbDevisGeneresTotal);
    return res.status(200).json({
      message: "Nombre total de devis générés récupéré",
      nbDevisGeneresTotal: nbDevisGeneresTotal,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};
// * récuperer le nombre de devis générés pour un utilisateur données
// * pour une societé donnée (dbName)
// * example:
// * input : dbName = SOLEVO, codeuser = 02
// * output : 472 devis générés
// * http://localhost:5000/api/devis/SOLEVO/getNbTotalDevisGeneresParUtilisateur
const getNbTotalDevisGeneresParUtilisateur = async (req, res) => {
  const { dbName } = req.params;
  const { codeuser } = req.query;
  let dbConnection;
  if (!codeuser) {
    return res.status(400).json({ message: "le code utilisateur est requis" });
  }
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);

    const nbDevisGeneresTotal = await Devis.count({
      where: {
        [Op.and]: [
          {
            [Op.not]: {
              executer: "N",
            },
          },
          {
            [Op.not]: {
              executer: "",
            },
          },
          {
            [Op.not]: {
              executer: "A",
            },
          },
          {
            [Op.not]: {
              executer: "C",
            },
          },
          {
            [Op.not]: {
              executer: null,
            },
          },
          {
            usera: codeuser,
          },
        ],
      },
    });
    console.log(nbDevisGeneresTotal);
    return res.status(200).json({
      message: `Nombre total de devis générés par l'utilisateur ${codeuser} récupéré`,
      nbDevisGeneresTotal: nbDevisGeneresTotal,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};

// * récuperer le nombre de devis non générés pour un utilisateur données
// * pour une societé donnée (dbName)
// * example:
// * input : dbName = SOLEVO, codeuser = 02
// * output : 472 devis non générés
// * http://localhost:5000/api/devis/SOLEVO/getNbDevisNonGeneresParUtilisateur?codeuser=02
const getNbDevisNonGeneresParUtilisateur = async (req, res) => {
  const { dbName } = req.params;
  const { codeuser } = req.query;
  if (!codeuser) {
    return res.status(400).json({ message: "le code utilisateur est requis" });
  }
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    const nbDevisNonGeneresParUtilisateur = await Devis.count({
      where: {
        [Op.and]: [
          {
            [Op.not]: {
              executer: "G",
            },
          },
          {
            usera: codeuser,
          },
        ],
      },
    });
    return res.status(200).json({
      message: `nombre de devis non générés par l'utilisateur ${codeuser} récupérés`,
      nbDevisNonGeneresParUtilisateur,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};

// * récuperer le nombre de devis annulées
// * pour une societé donnée (dbName)
// * example:
// * input : dbName = SOLEVO
// * output : 472 devis non générés
// * http://localhost:5000/api/devis/SOLEVO/getNbTotalDevisAnnulees
const getNbTotalDevisAnnulees = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    const nbDevisANnulees = await Devis.count({
      where: {
        executer: "A",
      },
    });

    if (nbDevisANnulees) {
      return res.status(200).json({
        message: "nombre de devis annulées récupérés avec succès",
        nbDevisANnulees,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};

// * récuperer le nombre de devis en cours
// * pour une societé donnée (dbName)
// * example:
// * input : dbName = SOLEVO
// * output : 472 devis non générés
// * http://localhost:5000/api/devis/SOLEVO/getNbTotalDevisEnCours
const getNbTotalDevisEnCours = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    const nbDevisEncours = await Devis.count({
      where: {
        executer: "N",
      },
    });

    if (nbDevisEncours) {
      return res.status(200).json({
        message: "nombre de devis en cours récupérés avec succès",
        nbDevisEncours,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};
// * récuperer le nombre de devis sans status
// * pour une societé donnée (dbName)
// * example:
// * input : dbName = SOLEVO
// * output : 472 devis non générés
// * http://localhost:5000/api/devis/SOLEVO/getNbTotalDevisSansStatus
const getNbTotalDevisSansStatus = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    const nbDevisSansStatus = await Devis.count({
      where: {
        executer: {
          [Op.and]: {
            [Op.notLike]: "G",
            [Op.notLike]: "A",
            [Op.notLike]: "C",
            [Op.notLike]: "N",
          },
        },
      },
    });

    if (nbDevisSansStatus) {
      return res.status(200).json({
        message: "nombre de devis sans status récupérés avec succès",
        nbDevisSansStatus,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};
// * url : http://localhost:5000/api/devis/SOLEVO/getListeDevisAvecPagination?page=1&limit=10
const getListeDevisAvecPagination = async (req, res) => {
  const { dbName } = req.params;
  const { page, limit } = req.query;
  if (!dbName) {
    return res
      .status(400)
      .json({ message: "le nom de la base de données est requis" });
  }

  try {
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    const devis = await Devis.findAll({
      attributes: ["numbl"],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    return res.status(200).json({
      message: "Liste de devis récupérée avec succès",
      devis: devis,
      totalDevis: devis.count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// * récupere les années distinctes de devis générés
// * pour une societé donnée (dbName)
// * url : http://localhost:5000/api/devis/SOLEVO/getAnneesDistinctGenerationDevis
const getAnneesDistinctGenerationDevis = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    // ? ?????????????
    const annees = await Devis.findAll({
      attributes: [
        [dbConnection.fn("YEAR", dbConnection.col("DateBL")), "year"],
      ],
      group: ["year"],
      raw: true,
    });

    return res.status(200).json({
      message:
        "annees distinctes de generation de devis recuperées avec succès",
      annees,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};

const getDirecteursDevis = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
  } catch (error) {
    return res.statuss(500).json({ message: error.message });
  } finally {
    if (dbConnection) {
      dbConnection.close();
    }
  }
};

// * récupere le nombre de devis générés par mois selon l'année
// * pour une societé donnée (dbName)
// * url : http://localhost:5000/api/devis/SOLEVO/getNbDevisGeneresParAnnee?annee=2023
const getNbDevisGeneresParAnnee = async (req, res) => {
  const { dbName } = req.params;
  const { annee } = req.query;
  let dbConnection;
  try {
    dbConnection = await getDatabaseConnection(dbName);
    const Devis = defineDfpModel(dbConnection);
    let nbDevisParAnne = [];
    for (let i = 1; i <= 12; i++) {
      const nbDevis = await Devis.count({
        where: {
          [Op.and]: [
            dbConnection.where(
              dbConnection.fn("YEAR", dbConnection.col("DATEBL")),
              annee
            ),
            dbConnection.where(
              dbConnection.fn("MONTH", dbConnection.col("DATEBL")),
              i
            ),
            { executer: "G" },
          ],
        },
      });
      nbDevisParAnne.push({ mois: i, nombreDevis: nbDevis });
    }
    return res.status(200).json({
      message: `nombre de devis générés en ${annee} récupéré avec succès`,
      nbDevisParAnne: nbDevisParAnne,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};
//* url :http://localhost:5000/api/devis/SOLEVO/getListeSecteur
//*message": "Secteur recupérés avec succès", "pointssecteurDistincts": [ { "desisec": "SOLEVO" },

const getListeSecteur = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const secteurDistincts = await dbConnection.query(
      `SELECT DISTINCT(desisec),codesec from secteur`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Secteur recupérés avec succès",
      secteurDistincts: secteurDistincts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getTousDevis,
  getNombreDevis,
  getTotalChiffres,
  ajouterDevis,
  getDevisParNUMBL,
  getCodesDevis,
  getDevisParMontant,
  GetDevisListParClient,
  GetDevisParPeriode,
  getListePointVente,
  getInfoUtilisateur,
  getListeSecteur,
  getLignesDevis,
  getDevisCreator,
  getDerniereNumbl,
  annulerDevis,
  getListeDevisParCodeClient,
  getListeDevisParNUMBL,
  getNbTotalDevisGeneres,
  getNbTotalDevisGeneresParUtilisateur,
  getDevisCountByMonthAndYear,
  getNbDevisNonGeneresParUtilisateur,
  getNbTotalDevisAnnulees,
  getNbTotalDevisEnCours,
  getNbTotalDevisSansStatus,
  getListeDevisAvecPagination,
  getAnneesDistinctGenerationDevis,
  getNbDevisGeneresParAnnee,
};
