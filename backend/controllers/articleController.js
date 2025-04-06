const { Sequelize } = require("sequelize");
const defineArticleModel = require("../models/societe/article");
const defineFamilleModel = require("../models/societe/famille");
const defineLdfpModel = require("../models/societe/ldfp");
const defineSousFamilleModel = require("../models/societe/sousfamille");
const { getSequelizeConnection } = require("../db/config");
const { getDatabaseConnection } = require("../common/commonMethods");
const article = require("../models/societe/article");

const initializeDynamicModels = (sequelize) => {
  const Article = defineArticleModel(sequelize);
  const Ldfp = defineLdfpModel(sequelize);

  return { Article, Ldfp };
};
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
    const dbConnection = await getDatabaseConnection(dbName, res);

    const Familles = defineFamilleModel(dbConnection);

    console.log("Familles: ", Familles);

    const familles = await Familles.findAll({
      attributes: ["code", "libelle"],
    });

    console.log(familles);

    if (familles.length === 0) {
      return res.status(404).json({
        message: "Aucune famille d'article trouvée.",
      });
    }

    return res.status(200).json({
      message: "Familles d'articles récupérées avec succès.",
      familles: familles,
    });
  } catch (error) {
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
const getCodesArticlesByFamille = async (req, res) => {
  const { dbName, famille } = req.params;

  if (!dbName || !famille) {
    return res.status(400).json({
      message: "Le nom de la base de données et la famille sont requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    const { Article } = initializeDynamicModels(dynamicSequelize);

    const articles = await Article.findAll({
      attributes: ["code", "libelle", "unite", "puht", "tauxtva", "prix1"],
      where: {
        famille: famille,
      },
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

//*suprimer le article voici un exemple  url
// * http://localhost:5000/api/article/SOLEVO/suprimerArticle/FFSTR-3D
//* output: suppression de  la ligne FFSTR-3D
const suprimerArticle = async (req, res) => {
  const { dbName, code } = req.params;

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const article = await dbConnection.query(
      `Delete  FROM ARTICLE WHERE code = :code`,
      {
        replacements: {
          code,
        },
        type: dbConnection.QueryTypes.DELETE,
      }
    );
    return res.status(200).json({ message: "suprime article avec succes" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* url : http://localhost:5000/api/article/SOLEVO/getArticleParCode/YDKITV1
//* tous donnes d'article ayant le code YDKITV1
// * output : un seul article
const getArticleParCode = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
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
//* vic url http://localhost:5000/api/article/SOLEVO/ajouterArticle
const ajouterArticle = async (req, res) => {
  const { dbName } = req.params;
  const { articleAjoute } = req.body;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
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
        cons: articleAjoute.cons,
        nomenclature: articleAjoute.nomenclature,
        gestionstock: articleAjoute.gestionstock,
        avecconfig: articleAjoute.avecconfig,
        ventevrac: articleAjoute.ventevrac,
        usera: articleAjoute.usera,
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
// *url : http://localhost:5000/api/article/SOLEVO/modifierArticle/BL-MR16-6W
//* resultat attendu :  les infomation d'un code BL-MR16-6W seront modifie

const modifierArticle = async (req, res) => {
  const { dbName } = req.params;
  const { article } = req.body;
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
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
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeArticles = await dbConnection.query(`SELECT * FROM ARTICLE`, {
      type: dbConnection.QueryTypes.SELECT,
    });

    console.log(listeArticles);
    console.log(
      await dbConnection.query(`SELECT COUNT(*) FROM ARTICLE`, {
        type: dbConnection.QueryTypes.SELECT,
      })
    );
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
//     const dbConnection = await getDatabaseConnection(dbName, res)
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
};

//* récuperer la liste de codes articles
// * example:
// * input : ""
// * output : liste codes articles
// * http://localhost:5000/api/article/SOLEVO/getToutCodesArticle
const getToutCodesArticle = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);

    const listeCodesArticles = await dbConnection.query(
      `SELECT code FROM article ORDER BY code`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

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
// * http://localhost:5000/api/article/SOLEVO/getDesignationFamilleParCodeFamille/02-MAT
const getDesignationFamilleParCodeFamille = async (req, res) => {
  const { dbName, codeFamille } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
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
    const dbConnection = await getDatabaseConnection(dbName, res);
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
    if (!dbName || !desFamille) {
      return res
        .status(400)
        .json({ message: "dbName et desFamille sont réquises" });
    }
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Familles = defineFamilleModel(dbConnection);
    const codesFamillesTrouves = await Familles.findAll({
      attributes: ["code"],
      where: { libelle: desFamille },
    });
    if (codesFamillesTrouves.length == 1) {
      return res
        .status(200)
        .json({
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
      return res
        .status(400)
        .json({
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
    const dbConnection = await getDatabaseConnection(dbName, res);
    console.log("ok");
    const SousFamilles = defineSousFamilleModel(dbConnection);
    const sousFamillesTrouves = await SousFamilles.findAll({
      attributes: ["code"],
      where: { libelle: desSousFamille },
    });
    if (sousFamillesTrouves.length == 1) {
      return res
        .status(200)
        .json({
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
      return res
        .status(400)
        .json({
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
// * url : http://localhost:5000/api/article/SOLEVO/getArticleParLibelle/Logicom Test
const getArticleParLibelle = async (req, res) => {
  const { dbName, libelle } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Article = defineArticleModel(dbConnection);
    const articlesTrouves = await Article.findAll({
      where: { libelle: { [Sequelize.like]: libelle } },
      order: ["libelle", "ASC"],
    });
    if (articlesTrouves.length == 1) {
      return res
        .status(200)
        .json({
          message:
            "article rélative au désignation donnée récuperé avec succès",
          articlesTrouves,
        });
    }
    if (articlesTrouves.length == 0) {
      return res
        .status(404)
        .json({ message: "aucun article est rélative à la désignation donné" });
    }
    if (articlesTrouves.length > 1) {
      return res
        .status(400)
        .json({
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
    const dbConnection = await getDatabaseConnection(dbName, res);

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
//* http://localhost:5000/api/article/SOLEVO/getListeArticleparFamille/02-SP
//*06/04/2025
const getListeArticleparFamille = async (req, res) => {
  const { dbName, codeFamille } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const ListecodeFamille = await dbConnection.query(
      `select code , famille, libelle,codesousfam from article where famille =:famille`,
      {
        replacements: {
          famille: codeFamille,
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
  const { dbName, listelibelle } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const ListelibelleArticle = await dbConnection.query(
      `Select code, famille, libelle ,codesousfam from article where libelle like :libelle`,

      {
        replacements: {
          libelle: "%"+listelibelle+"%",
        },

        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ message: "liste article par  libelle  recupere avec succes", ListelibelleArticle });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  //*apartient l'interface devis
  getListeFamilles,
  //*appartient l'interface devis
  getCodesArticlesByFamille,
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
};
