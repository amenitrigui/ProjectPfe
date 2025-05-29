const { Op } = require("sequelize");
const defineArticleModel = require("../models/societe/article");
const defineFamilleModel = require("../models/societe/famille");
const defineLdfpModel = require("../models/societe/ldfp");
const defineSousFamilleModel = require("../models/societe/sousfamille");
const {
  getDatabaseConnection,
  verifyTokenValidity,
} = require("../common/commonMethods");
const { getConnexionBd } = require("../db/config");

// * méthode pour récuperer la liste de familles (code+libelle)
// * exemple :
// * input : ""
// * output: liste des famille :  [{"code": "02-MAT", "libelle": "MATELAS"}]
// * http://localhost:5000/api/article/SOLEVO/getListeFamilles
const getListeFamilles = async (req, res) => {
  const { dbName } = req.params;
  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const decoded = verifyTokenValidity(req);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    const Familles = defineFamilleModel(dbConnection);

    const familles = await Familles.findAll({
      attributes: ["code", "libelle"],
    });

    if (familles.length === 0) {
      return res.status(404).json({
        message: "Aucune famille d'article trouvée.",
      });
    }

    return res.status(200).json({
      message: "Familles d'articles récupérées avec succès.",
      familles: familles,
    });
  } 
  catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des familles des articles.",
      error: error.message,
    });
  }
};

// * récupere la liste d'articles ayant un famille donné
// * exemple :
// * input : 02-SP
// * output : liste d'articles ayant le code famille 02-SP
// * http://localhost:5000/api/article/SOLEVO/codes/famille?famille=test
const getListeArticlesParFamille = async (req, res) => {
  const { dbName } = req.params;
  const { famille } = req.query;
  if (!dbName || !famille) {
    return res.status(400).json({
      message: "Le nom de la base de données et la famille sont requis.",
    });
  }

  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const Article = defineArticleModel(dbConnection);

    const articles = await Article.findAll({
      attributes: ["code", "libelle", "unite", "puht", "tauxtva", "prix1"],
      where: {
        famille: { [Op.like]: "%" + famille + "%" },
      },
      order: [["libelle", "ASC"]],
    });

    if (articles.length === 0) {
      return res.status(404).json({
        message: `Aucun article trouvé pour la famille ${famille}`,
      });
    }

    return res.status(200).json({
      message: `Articles pour la famille ${famille} récupérés avec succès`,
      articles: articles.map((article) => ({
        code: article.code,
        libelle: article.libelle,
        unite: article.unite,
        prix1: article.prix1,
        tauxtva: article.tauxtva,
      })),
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles par famille:",
      error
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des articles",
      error: error.message,
    });
  }
};

// * suprimer le article voici un exemple  url
// * http://localhost:5000/api/article/SOLEVO/suprimerArticle/?code=FFSTR-3D
// * output: suppression de  la ligne FFSTR-3D
const suprimerArticle = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.query;

  if (!dbName || !code) {
    return res
      .status(400)
      .json({ message: "l'un ou les deux paramètres sont nulles" });
  }

  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const article = await dbConnection.query(
      `Delete FROM ARTICLE WHERE code = :code`,
      {
        replacements: {
          code,
        },
        type: dbConnection.QueryTypes.DELETE,
      }
    );
    return res
      .status(200)
      .json({ message: "suprime article avec succes", article });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* url : http://localhost:5000/api/article/SOLEVO/getArticleParCode?code=YDKITV1
//* tous donnes d'article ayant le code YDKITV1
// * output : un seul article
const getArticleParCode = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.query;
  if (!dbName || !code) {
    return res
      .status(400)
      .json({ message: "l'un ou les deux paramètres sont nulles" });
  }
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const article = await dbConnection.query(
      `SELECT * FROM ARTICLE WHERE code = :code`,
      {
        replacements: {
          code,
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    if (article)
      return res
        .status(200)
        .json({ message: "article récuperé avec succès", article });
    return res.status(404).json({ message: "Article Introuvable" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* ajouter un artile  lorsque tu veux ajoute un meme code d'article il s'affiche erreur
//* voici url http://localhost:5000/api/article/SOLEVO/ajouterArticle
//* input: {"articleAjoute": {  "code": "122",  "libelle": "bnn" }}
//* il va etre ajouter
const ajouterArticle = async (req, res) => {
  const { dbName } = req.params;
  const { articleAjoute } = req.body;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const Article = defineArticleModel(dbConnection);
    const article = await Article.findOne({
      where: {
        code: articleAjoute.code,
      },
    });
    if (article) {
      return res
        .status(500)
        .json({ message: "article deja existant on ne peut pas le reajoute" });
    } else {
      const articleCree = await Article.create({
        code: articleAjoute.code,
        libelle: articleAjoute.libelle,
        unite: articleAjoute.unite,
        famille: articleAjoute.famille,
        codesousfam: articleAjoute.codesousfam,
        codebarre: articleAjoute.codebarre,
        nbrunite: articleAjoute.nbrunite,
        comptec: articleAjoute.comptec,
        type: articleAjoute.type,
        typeart: articleAjoute.typeart,
        remmax: articleAjoute.remmax,
        colisage: articleAjoute.colisage,
        import: articleAjoute.import,
        tauxtva: articleAjoute.tauxtva,
        prixbrut: articleAjoute.prixbrut,
        prixnet: articleAjoute.prixnet,
        fodec: articleAjoute.fodec,
        CONFIG: articleAjoute.CONFIG,
        reforigine: articleAjoute.reforigine,
        lieustock: articleAjoute.lieustock,
        NGP: articleAjoute.NGP,
        sav: articleAjoute.sav,
        PrixPub: articleAjoute.PrixPub,
        cons: articleAjoute.cons,
        nomenclature: articleAjoute.nomenclature,
        gestionstock: articleAjoute.gestionstock,
        avecconfig: articleAjoute.avecconfig,
        ventevrac: articleAjoute.ventevrac,
        usera: articleAjoute.usera,
        Dtcons: articleAjoute.Dtcons,
        prix1TTC: articleAjoute.prix1TTC,
        prix2TTC: articleAjoute.prix2TTC,
        prix3TTC: articleAjoute.prix3TTC,
        prix4TTC: articleAjoute.prix4TTC,
        prix1: articleAjoute.prix1,
        prix2: articleAjoute.prix2,
        prix3: articleAjoute.prix3,
        prix4: articleAjoute.prix4,
        datecreate: new Date().toISOString().split("T")[0],
      });

      return res
        .status(200)
        .json({ message: "article ajoute avec succes", articleCree });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* Article Modifie
// *url : http://localhost:5000/api/article/SOLEVO/modifierArticle?code=BL-MR16-6W
//* resultat attendu :  les infomation d'un code BL-MR16-6W seront modifie

const modifierArticle = async (req, res) => {
  const { dbName } = req.params;
  const { article } = req.body;
  // * code article
  const { code } = req.query;
  console.log("code: ", code)
  console.log("------------------------",article)
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const Article = defineArticleModel(dbConnection);

    const articleAModifier = await Article.findOne({
      where: {
        code: code,
      },
    });
    if (articleAModifier) {
      const ArticleModifier = await Article.update(
        {
          libelle: article.libelle,
          unite: article.unite,
          famille: article.famille,
          codesousfam: article.codesousfam,
          codebarre: article.codebarre,
          nbrunite: article.nbrunite,
          comptec: article.comptec,
          type: article.type,
          typeart: article.typeart,
          colisage: article.colisage,
          import: article.import,
          tauxtva: article.tauxtva,
          prixbrut: article.prixbrut,
          prixnet: article.prixnet,
          fodec: article.fodec,
          CONFIG: article.CONFIG,
          reforigine: article.reforigine,
          lieustock: article.lieustock,
          NGP: article.NGP,
          sav: article.sav,
          cons: article.cons,
          nomenclature: article.nomenclature,
          gestionstock: article.gestionstock,
          avecconfig: article.avecconfig,
          ventevrac: article.ventevrac,
          userm: article.userm,
          datemaj: new Date().toISOString().split("T")[0],
        },
        { where: { code: code } }
      );
      return res.status(200).json({ message: "Article Modife avec succes" });
    } else {
      return res
        .status(500)
        .json({ message: "échec de modification de l'article" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// * méthode pour récuperer la liste d'articles
// * exemple :
// * input : ""
// * output: liste d'articles :  [{"code": "art1", "libelle": "desart1", ...}, ...]
// * http://localhost:5000/api/article/SOLEVO/getListeArticles
const getListeArticles = async (req, res) => {
  const { dbName } = req.params;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const listeArticles = await dbConnection.query(`SELECT * FROM ARTICLE`, {
      type: dbConnection.QueryTypes.SELECT,
    });

    if (listeArticles) {
      return res.status(200).json({
        message: "liste d'articles récuperé avec succès",
        listeArticles: listeArticles,
      });
    } else {
      return res.status(500).json({
        message: "erreur lors de la récupération de la liste d'articles",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const getArticleParLIbelle = async(req, res) => {
//   const { dbName, libelle } = req.params;

//   try{
//     const dbConnection = await getDatabaseConnection(dbName)
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

// * méthode pour filtrer la liste d'articles
// * exemple :
// * input : filters[{libelle: "test"}]
// * output: liste d'articles :  [{"code": "02-MAT", "libelle": "pentest"},{"code": "01-SP", "libelle": "intest"}]
// * http://localhost:5000/api/article/SOLEVO/filtrerListeArticle
const filtrerListeArticle = async (req, res) => {
  const { dbName } = req.params;
  const { filters } = req.query;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
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
    if (filters.libelle) {
      whereClauses.push("libelle like :libelle");
      replacements.libelle = `%${filters.libelle}%`;
    }
    if (filters.famille) {
      whereClauses.push("famille like :famille");
      replacements.famille = `%${filters.famille}%`;
    }
    if (filters.type) {
      whereClauses.push("type like :type");
      replacements.type = `%${filters.type}%`;
    }
    if (filters.typeart) {
      whereClauses.push("typeart like :typeart");
      replacements.typeart = `%${filters.typeart}%`;
    }
    if (filters.codesousfam) {
      whereClauses.push("codesousfam like :codesousfam");
      replacements.codesousfam = `%${filters.codesousfam}%`;
    }

    // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
    let whereCondition = whereClauses.join(" AND ");

    // ? Si on on a aucune condition on effectue une requete de select * from dfp
    let query = `SELECT code, libelle, famille, type, typeart, codesousfam
     FROM article 
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
    return res
      .status(500)
      .json({ message: "erreur est survenur lors de recupération de filters" });
  }
};

//* récuperer la liste de codes articles
// * example:
// * input : ""
// * output : liste codes articles
// * http://localhost:5000/api/article/SOLEVO/getToutCodesArticle
const getToutCodesArticle = async (req, res) => {
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const { dbName } = req.params;
    const { codeFamille } = req.query;

    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    let listeCodesArticles;

    if (!codeFamille) {
      listeCodesArticles = await dbConnection.query(
        `SELECT code FROM article ORDER BY datecreate ASC`,
        {
          type: dbConnection.QueryTypes.SELECT,
        }
      );
    }

    if (codeFamille) {
      listeCodesArticles = await dbConnection.query(
        `SELECT code FROM article where famille = :famille ORDER BY code`,
        {
          type: dbConnection.QueryTypes.SELECT,
          replacements: {
            famille: codeFamille,
          },
        }
      );
    }
    return res.status(200).json({
      message: "Codes Articles récupéré avec succès",
      listeCodesArticles: listeCodesArticles,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* récuperer la désignation d'un famille par code famille
// * example:
// * input : 02-MAT
// * output : {"libelle": "MATELAS"}
// * http://localhost:5000/api/article/SOLEVO/getDesignationFamilleParCodeFamille
const getDesignationFamilleParCodeFamille = async (req, res) => {
  const { dbName } = req.params;
  const { codeFamille } = req.query;
  if (!dbName || !codeFamille) {
    return res
      .status(400)
      .json({ message: "l'un ou les deux paramètres sont nulles" });
  }
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const getDesignationFamilleParCodeFamille = await dbConnection.query(
      `select libelle from famille where code = :code`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          code: codeFamille,
        },
      }
    );
    return res.status(200).json({
      message: "Libelle recupere avec succes",
      getDesignationFamilleParCodeFamille,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* de la base de donnes sous famille
//* url : http://localhost:5000/api/article/SOLEVO/getListecodesousFamille?codeSousFamille=SUP-MOD
//* input : SUP-MOD
//* output : SUP-MOD
const getListecodesousFamille = async (req, res) => {
  const { dbName } = req.params;

  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const getcodesousFamille = await dbConnection.query(
      `select code from sousfamille`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ message: "recuperation de code famille ", getcodesousFamille });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récupere un code famille par son désignation
// * exemple
// * input : MATELAS, SOLEVO
// * output : testCodeArticle
// * url : http://localhost:5000/api/article/SOLEVO/getCodeFamilleParDesignationFamille/MATELAS
const getCodeFamilleParDesignationFamille = async (req, res) => {
  const { dbName, desFamille } = req.params;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    if (!dbName || !desFamille) {
      return res
        .status(400)
        .json({ message: "dbName et desFamille sont réquises" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const Familles = defineFamilleModel(dbConnection);
    const codesFamillesTrouves = await Familles.findAll({
      attributes: ["code"],
      where: { libelle: desFamille },
    });
    if (codesFamillesTrouves.length == 1) {
      return res.status(200).json({
        message: "code rélative au désignation donnée récuperé avec succès",
        codesFamillesTrouves,
      });
    }
    if (codesFamillesTrouves.length == 0) {
      return res
        .status(404)
        .json({ message: "aucun code est rélative à la désignation donné" });
    }
    if (codesFamillesTrouves.length > 1) {
      return res.status(400).json({
        message: "plusieurs codes trouvées pour la désignation donnée",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récupere un code famille par son désignation
// * exemple
// * input : MATELAS, SOLEVO
// * output : testCodeArticle
// * url : http://localhost:5000/api/article/SOLEVO/getCodeSousFamilleParDesignationSousFamille/MATELAS
const getCodeSousFamilleParDesignationSousFamille = async (req, res) => {
  const { dbName, desSousFamille } = req.params;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const SousFamilles = defineSousFamilleModel(dbConnection);
    const sousFamillesTrouves = await SousFamilles.findAll({
      attributes: ["code"],
      where: { libelle: desSousFamille },
    });
    if (sousFamillesTrouves.length == 1) {
      return res.status(200).json({
        message: "code rélative au désignation donnée récuperé avec succès",
        sousFamillesTrouves,
      });
    }
    if (sousFamillesTrouves.length == 0) {
      return res
        .status(404)
        .json({ message: "aucun code est rélative à la désignation donné" });
    }
    if (sousFamillesTrouves.length > 1) {
      return res.status(400).json({
        message: "plusieurs codes trouvées pour la désignation donnée",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récupere un code famille par son désignation
// * exemple
// * input : MATELAS, SOLEVO
// * output : informations article
// * url : http://localhost:5000/api/article/SOLEVO/getArticleParLibelle/Logicom
const getArticleParLibelle = async (req, res) => {
  const { dbName, libelle } = req.params;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const Article = defineArticleModel(dbConnection);
    const articlesTrouves = await Article.findAll({
      where: { libelle: { [Op.like]: "%" + libelle + "%" } },
      order: [["libelle", "ASC"]],
    });
    if (articlesTrouves.length == 1) {
      return res.status(200).json({
        message: "article rélative au désignation donnée récuperé avec succès",
        articlesTrouves,
      });
    }
    if (articlesTrouves.length == 0) {
      return res
        .status(404)
        .json({ message: "aucun article est rélative à la désignation donné" });
    }
    if (articlesTrouves.length > 1) {
      return res.status(400).json({
        message: "plusieurs articles trouvées pour la désignation donnée",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* url http://localhost:5000/api/article/SOLEVO/getdesignationSousFamillebycodeSousFamille/SUP-MOD
//* la recuperation de libele parport le code de dous famille
//* input :SUP-MOD
//*output :SUPPORT MODULE
const getdesignationSousFamillebycodeSousFamille = async (req, res) => {
  const { dbName, codeSousFamille } = req.params;

  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);

    const result = await dbConnection.query(
      `SELECT libelle FROM sousfamille WHERE code = :code`,
      {
        replacements: {
          code: codeSousFamille,
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Libellé récupéré avec succès.",
      libelle: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//* dans recherche.jsx : dans recupere la famille
//* http://localhost:5000/api/article/SOLEVO/getListeArticleparFamille
//*06/04/2025
const getListeArticleparFamille = async (req, res) => {
  const { dbName } = req.params;
  const { codeFamille } = req.query;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const ListecodeFamille = await dbConnection.query(
      `select * from article where famille LIKE :famille`,
      {
        replacements: {
          famille: `%${codeFamille}%`,
        },

        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ message: "famille recupere avec succes", ListecodeFamille });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//*http://localhost:5000/api/article/SOLEVO/getListeArticleparLibelle/SPOT A BASE LED COB 5WW SILVER YBD6707
//*au niveau de la recherche.jsx
const getListeArticleparLibelle = async (req, res) => {
  const { dbName } = req.params;
  const { libelle } = req.query;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const ListelibelleArticle = await dbConnection.query(
      `Select * from article where libelle like :libelle`,

      {
        replacements: {
          libelle: "%" + libelle + "%",
        },

        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      message: "liste article par  libelle  recupere avec succes",
      ListelibelleArticle,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getListeArticleParSousFamille = async (req, res) => {
  const { dbName, SousFamille } = req.params;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    const ListeArticleSousFamille = await dbConnection.query(
      `Select * from article where codesousfam like :codesousfam`,

      {
        replacements: {
          codesousfam: "%" + SousFamille + "%",
        },

        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      message: "liste article par  code famille  recupere avec succes",
      ListeArticleSousFamille,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* au niveau de la recherche.jsx url : http://localhost:5000/api/article/SOLEVO/getListeArticleParCodeArticle/PR
//* input Code : pr
//* output plusieurs code pr "ListecodeArticle": [ {  "code": "PRZ2002",  "famille": "02-IN",  "libelle": "PROFILE EN ACIER GALVA 41X21  SIBEC",  "codesousfam": " "  ,
const getListeArticleParCodeArticle = async (req, res) => {
  const { dbName } = req.params;
  const { codeArticle, codeFamille } = req.query;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    const dbConnection = getConnexionBd(); //await getDatabaseConnection(dbName);
    let ListecodeArticle;
    if (!codeFamille) {
      ListecodeArticle = await dbConnection.query(
        `select * from article where code LIKE :code`,
        {
          replacements: {
            code: `%${codeArticle}%`,
          },

          type: dbConnection.QueryTypes.SELECT,
        }
      );
    }
    if (codeFamille) {
      ListecodeArticle = await dbConnection.query(
        `select * from article where code LIKE :code and famille LIKE :famille`,
        {
          replacements: {
            code: `%${codeArticle}%`,
            famille: `%${codeFamille}%`,
          },

          type: dbConnection.QueryTypes.SELECT,
        }
      );
    }
    return res
      .status(200)
      .json({ message: "code Articlerecupere avec succes", ListecodeArticle });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// * récuperer le code article de derniere article inseré dans la base de données
// * url : http://localhost:5000/api/article/SOLEVO/getDerniereCodeArticle
const getDerniereCodeArticle = async (req, res) => {
  const { dbName } = req.params;
  let dbConnection;
  try {
    const decoded = verifyTokenValidity(req);
    console.log("dd", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "utilisateur non authentifie" });
    }
    dbConnection = await getDatabaseConnection(dbName);
    const derniereCodeArticle = await dbConnection.query(
      `SELECT code FROM article WHERE datecreate = (SELECT MAX(datecreate) FROM article)`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    if (!derniereCodeArticle) {
      return res.status(400).json({ message: "erreur" });
    }
    if (derniereCodeArticle.length == 0) {
      return res.status(404).json({ message: "aucun article est trouvé" });
    }
    if (derniereCodeArticle && derniereCodeArticle.length > 0) {
      // ?? ?????? ? ?? ? ??? ??? ?? ?? ? ?? ???
      return res.status(200).json({
        message: "succès",
        derniereCodeArticle:
          derniereCodeArticle[derniereCodeArticle.length - 1],
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    dbConnection.close();
  }
};

module.exports = {
  //*apartient l'interface devis
  getListeFamilles,
  //*appartient l'interface devis
  getListeArticlesParFamille,
  //*appartient La base de donnes c'est a dire l'interface d'article
  suprimerArticle,
  getArticleParCode,
  ajouterArticle,
  getListeArticles,
  modifierArticle,
  filtrerListeArticle,
  getToutCodesArticle,
  getDesignationFamilleParCodeFamille,
  getListecodesousFamille,
  getCodeFamilleParDesignationFamille,
  getdesignationSousFamillebycodeSousFamille,
  getCodeSousFamilleParDesignationSousFamille,
  getArticleParLibelle,
  getListeArticleparFamille,
  getListeArticleparLibelle,
  getListeArticleParSousFamille,
  getListeArticleParCodeArticle,
  getDerniereCodeArticle,
};
