const { Sequelize } = require("sequelize");
const defineArticleModel = require("../models/societe/article");
const defineLdfpModel = require("../models/societe/ldfp");
const { getSequelizeConnection } = require("../db/config");

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
      attributes: ["code", "libelle", "unite", "puht", "tauxtva","prix1"],
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
    console.error("Erreur lors de la récupération des articles par famille:", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des articles",
      error: error.message,
    });
  }
};
const getArticleDetailsByCode = async (req, res) => {
  const { dbName, code } = req.params; 

  if (!dbName || !code) {
    return res.status(400).json({
      message: "Le nom de la base de données et le code de l'article sont requis",
    });
  }

  try {
   
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate(); 

    
    const { Article } = initializeDynamicModels(dynamicSequelize);

    
    const article = await Article.findOne({
      attributes: [
        "libelle",
        "unite",
        "nbrunite",
        "code",
        "prix1",
        "tauxtva",
        "CONFIG",
      ], 
      where: { 
        code: code, 
      },
    });

  
    if (!article) {
      return res.status(404).json({
        message: `Aucun article trouvé avec le code ${code}`,
      });
    }

    
    return res.status(200).json({
      message: `Détails de l'article pour le code ${code} récupérés avec succès`,
      article: {
        code: article.code,
        libelle: article.libelle,
        unite: article.unite,
        nbrunite: article.nbrunite,
        prix1: article.prix1,
        tauxtva: article.tauxtva,
        CONFIG: article.CONFIG,
      },
    });
  } catch (error) {
    
    console.error("Erreur lors de la récupération des détails de l'article:", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des détails de l'article",
      error: error.message,
    });
  }
};
module.exports = {
  getFamilles,
  getCodesByFamille,
  getArticleDetailsByCode
};
