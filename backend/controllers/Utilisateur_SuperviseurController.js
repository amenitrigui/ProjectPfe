const { Sequelize } = require("sequelize");
const defineArticleModel = require("../models/societe/article");
const defineFamilleModel = require("../models/societe/famille");
const defineLdfpModel = require("../models/societe/ldfp");
const defineSousFamilleModel = require("../models/societe/sousfamille");
const { getSequelizeConnection } = require("../db/config");
const { getDatabaseConnection } = require("../common/commonMethods");
const article = require("../models/societe/article");
const defineUtilisateurModel = require("../models/utilisateur/utilisateur");
const defineUserModel = require("../models/utilisateur/utilisateur");
const { sequelizeUserERP } = require("../db/config");

const bcrypt = require("bcryptjs");

// * enregistrer une nouvelle utilisateur
// * dans la base des données ErpSole
// * exemple
// * input : {nom: "testUser", "motpasse": "testUserMotPasse", "email": "testUser@test.test"}
// * output : aucune, l'utilisateur sera enregistré dans la base de données
// * verb : post
// *    url :http://localhost:5000/api/Utilisateur_Superviseur/AjouterUtilisateur
const AjouterUtilisateur = async (req, res) => {
  const { User } = req.body;
  console.log(User);
  // User.motpasse = "ter"
  try {
    if (!User.email || !User.motpasse || !User.nom) {
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis." });
    }

    const user = defineUserModel(sequelizeUserERP);
    const existingUser = await user.findOne({ where: { email: User.email } });

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(User.motpasse, 10);
    console.log(hashedPassword);

    const newUser = await user.create({
      email: User.email,
      motpasse: User.hashedPassword,
      nom: User.nom,
      type: User.type,
      directeur: User.directeur,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user: newUser,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur:",
      error.message || error
    );
    return res.status(500).json({
      message: "Une erreur est survenue lors de la création de l'utilisateur.",
      error: error.message,
    });
  }
};
//* récuperer le dernièr code de client dans la base
// * example: le dernier code client dans la base est 2000
// * input :
// * output : 123
// * http://localhost:5000/api/Utilisateur_Superviseur/getDerniereCodeUtilisateur
const getDerniereCodeUtilisateur = async (req, res) => {
  try {
    const dbConnection = await getDatabaseConnection("usererpsole", res);
    const derniereCodeUtilisateur = await dbConnection.query(
      `SELECT codeuser FROM utilisateur ORDER BY CAST(codeuser AS UNSIGNED) DESC LIMIT 1`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "dernière code utilisateur récuperé avec succès",
      derniereCodeUtilisateur: derniereCodeUtilisateur[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//*url: http://localhost:5000/api/Utilisateur_Superviseur/ModifierUtilisateur
const ModifierUtilisateur = async (req, res) => {
  const { MajUtilisateur } = req.body;

  try {
    const dbConnection = await getDatabaseConnection("usererpsole", res);
    const Utilisateur = defineUtilisateurModel(dbConnection);
    const user = await Utilisateur.findOne({
      where: { codeuser: MajUtilisateur.codeuser },
    });
    
    if (user) {
      const usermodifie =  await Utilisateur.update(
        {
          type: MajUtilisateur.type,
          directeur: MajUtilisateur.directeur,
          email:  MajUtilisateur.email,
          nom: MajUtilisateur.nom,
          motpasse: MajUtilisateur.motpasse,
        },
        { where: { codeuser: MajUtilisateur.codeuser } }
      );
      return res
        .status(200)
        .json({ message: "utilisateur mise à jour avec succès", usermodifie });
    } else {
      return res
        .status(500)
        .json({ message: "le utilisateur n'est pas définit" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "un erreur est survenu lors de mise à jour de utilisateur ",
      error: error.message,
    });
  }
};
const supprimerUtilisateur = async (req, res) => {
  const { codeuser } = req.query;
  try {
    const dbConnection = await getDatabaseConnection("usererpsole", res);
    const Utilisateur = defineUtilisateurModel(dbConnection);

    await Utilisateur.destroy({ where: { codeuser: codeuser } });

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé(s) avec succès" });
  } catch (error) {
    return res.status(500).json({
      message: "un erreur est survenu lors de suppression de utilisateur",
    });
  }
};
const getCodeUtilisateurParCode = async (req, res) => {
  const { codeuser } = req.query;
  console.log(codeuser);
  try {
    //const decoded = verifyTokenValidity(req, res);
    const dbConnection = await getDatabaseConnection("usererpsole", res);

    const result = await dbConnection.query(
      `select codeuser,nom,directeur from utilisateur where codeuser = :codeuser `,
      {
        replacements: {
          codeuser: codeuser,
        },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "liste utilisteur recupere",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  AjouterUtilisateur,
  getDerniereCodeUtilisateur,
  ModifierUtilisateur,
  supprimerUtilisateur,
  getCodeUtilisateurParCode,
};
