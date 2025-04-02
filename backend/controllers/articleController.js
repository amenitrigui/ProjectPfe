const { Sequelize } = require("sequelize");
const defineArticleModel = require("../models/societe/article");
const defineLdfpModel = require("../models/societe/ldfp");
const { getSequelizeConnection } = require("../db/config");
const { getDatabaseConnection } = require("../common/commonMethods");
const article = require("../models/societe/article");

const initializeDynamicModels = (sequelize) => {
  const Article = defineArticleModel(sequelize);
  const Ldfp = defineLdfpModel(sequelize);

  return { Article, Ldfp };
};

const getFamilles = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    const { Article } = initializeDynamicModels(dynamicSequelize);

    const familles = await Article.findAll({
      attributes: ["famille"],
      group: ["famille"],
    });

    if (familles.length === 0) {
      return res.status(404).json({
        message: "Aucune famille d'article trouvée.",
      });
    }

    return res.status(200).json({
      message: "Familles d'articles récupérées avec succès.",
      familles: familles.map((famille) => famille.famille),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des familles des articles.",
      error: error.message,
    });
  }
};

const getCodesByFamille = async (req, res) => {
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
//* url : http://localhost:5000/api/article/SOLEVO/getArticle/YDKITV1
//* tous donnes d'article ayant le code YDKITV1
const getArticle = async (req, res) => {
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
        sousfamille: articleAjoute.sousfamille,
        codebarre: articleAjoute.codebarre,
        nbreunite: articleAjoute.nbreunite,
        comptec: articleAjoute.comptec,
        type: articleAjoute.type,
        typeart: articleAjoute.typeart,
        colisage: articleAjoute.colisage,
        import: articleAjoute.import,
        tauxtva: articleAjoute.tauxtva,
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

    const articleAModifier = await Article.findOne({where: {
      code: code
    }})
    if(articleAModifier) {
      const ArticleModifier = await Article.update(
        {
          libelle: article.libelle,
          unite: article.unite,
          famille: article.famille,
          sousfamille: article.sousfamille,
          codebarre: article.codebarre,
          nbreunite: article.nbreunite,
          comptec: article.comptec,
          type: article.type,
          typeart: article.typeart,
          colisage: article.colisage,
          import: article.import,
          tauxtva: article.tauxtva,
        },
        { where: { code: code } }
      );
      return res.status(200).json({ message: "Article Modife avec succes"});
    }else {
      return res.status(500).json({message: "échec de modification de l'article"})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getListeArticles = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeArticles = await dbConnection.query(`SELECT * FROM ARTICLE`, {
      type: dbConnection.QueryTypes.SELECT,
    });

    if (listeArticles) {
      return res
        .status(200)
        .json({ message: "liste d'articles récuperé avec succès" });
    } else {
      return res
        .status(500)
        .json({
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
const filtrerListeArticle = async (req, res) => {
  const { dbName } = req.params;
  const { filters } = req.body;

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
  if (filters.sousfamille) {
    whereClauses.push("sousfamille like :sousfamille");
    replacements.sousfamille = `%${filters.sousfamille}%`;
  }

  // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
  let whereCondition = whereClauses.join(" AND ");

  // ? Si on on a aucune condition on effectue une requete de select * from dfp
  let query = `SELECT code, libelle, famille, type, typeart, sousfamille
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

module.exports = {
  getFamilles,
  getCodesByFamille,
  suprimerArticle,
  getArticle,
  ajouterArticle,
  getListeArticles,
  modifierArticle,
  filtrerListeArticle
};
