const { getDatabaseConnection } = require("../common/commonMethods");
const defineUtilisateurModel = require("../models/utilisateur/utilisateur");
const defineUserModel = require("../models/utilisateur/utilisateur");
const { sequelizeConnexionDbUtilisateur } = require("../db/config");
// const bcrypt = require("bcryptjs");

// * enregistrer une nouvelle utilisateur
// * dans la base des données ErpSole
// * exemple
// * input : {nom: "testUser", "motpasse": "testUserMotPasse", "email": "testUser@test.test"}
// * output : aucune, l'utilisateur sera enregistré dans la base de données
// * verb : post
// * url :http://localhost:5000/api/utilisateurSystem/AjouterUtilisateur
const AjouterUtilisateur = async (req, res) => {
  const { User } = req.body;
  try {
    if(!User) {
      return res.status(400).json({message: "l'utilisateur n'est pas définit"})
    }
    if (!User.email || !User.motpasse || !User.nom) {
      return res
      .status(400)
      .json({ message: "Tous les champs doivent être remplis." });
    }
    
    const user = defineUserModel(sequelizeConnexionDbUtilisateur);
    const existingUser = await user.findOne({ where: { email: User.email } });

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const newUser = await user.create({
      email: User.email,
      motpasse: User.motpasse,
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
// * http://localhost:5000/api/utilisateurSystem/getDerniereCodeUtilisateur
const getDerniereCodeUtilisateur = async (req, res) => {
  try {
    const derniereCodeUtilisateur = await sequelizeConnexionDbUtilisateur.query(
      `SELECT codeuser FROM utilisateur ORDER BY CAST(codeuser AS UNSIGNED) DESC LIMIT 1`,
      {
        type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
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

//*url: http://localhost:5000/api/utilisateurSystem/ModifierUtilisateur
const ModifierUtilisateur = async (req, res) => {
  const { MajUtilisateur } = req.body;

  try {
    const Utilisateur = defineUtilisateurModel(sequelizeConnexionDbUtilisateur);
    const user = await Utilisateur.findOne({
      where: { codeuser: MajUtilisateur.codeuser },
    });

    if (user) {
      const usermodifie = await Utilisateur.update(
        {
          type: MajUtilisateur.type,
          directeur: MajUtilisateur.directeur,
          email: MajUtilisateur.email,
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
    const Utilisateur = defineUtilisateurModel(sequelizeConnexionDbUtilisateur);

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
/* cette methode elle fait 2 onas elle fais la liste de utilisateur en interface de recherche 3.jsx et aussi pou les bouton suivant eet derniers  */
const getListeUtilisateurParCode = async (req, res) => {
  const { codeuser } = req.query;;
  try {
    //const decoded = verifyTokenValidity(req, res);

    const result = await sequelizeConnexionDbUtilisateur.query(
      `select codeuser,nom,directeur,email,type,motpasse from utilisateur where codeuser = :codeuser `,
      {
        replacements: {
          codeuser: codeuser,
        },
        type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
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
//* url :http://localhost:5000/api/utilisateurSystem/getListeUtilisateurParNom?nom=mariam
const getListeUtilisateurParNom = async (req, res) => {
  const { nom } = req.query;
  try {
    //const decoded = verifyTokenValidity(req, res);

    const result = await sequelizeConnexionDbUtilisateur.query(
      `select codeuser,nom,directeur,type from utilisateur where nom LIKE :nom `,
      {
        replacements: {
          nom: "%" + nom + "%",
        },
        type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
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
//* url : http://localhost:5000/api/utilisateurSystem/getListeUtilisateurParDirecteur?directeur=02
const getListeUtilisateurParDirecteur = async (req, res) => {
  const { directeur } = req.query;

  try {
    //const decoded = verifyTokenValidity(req, res);

    const result = await sequelizeConnexionDbUtilisateur.query(
      `select codeuser,nom,directeur,type from utilisateur where directeur LIKE :directeur `,
      {
        replacements: {
          directeur: "%" + directeur + "%",
        },
        type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "liste utilisteur des directeur recupere",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
//* url : http://localhost:5000/api/utilisateurSystem/getListeUtilisateurParType?type=Utilisateur
const getListeUtilisateurParType = async (req, res) => {
  const { type } = req.query;

  try {
    //const decoded = verifyTokenValidity(req, res);

    const result = await sequelizeConnexionDbUtilisateur.query(
      `select codeuser,nom,directeur,type from utilisateur where type LIKE :type `,
      {
        replacements: {
          type: "%" + type + "%",
        },
        type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "liste utilisteur des type recupere",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// * url: http://localhost:5000/api/utilisateurSystem/getListeUtilisateur
// * verb : get
const getListeUtilisateur = async (req, res) => {
  try {
    //const decoded = verifyTokenValidity(req, res);

    const result = await sequelizeConnexionDbUtilisateur.query(
      `select codeuser,nom,directeur, email ,type from utilisateur `,
      {
        type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
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
//* url :http://localhost:5000/api/utilisateurSystem/filterListeUtilisateur?filters=1
const filterListeUtilisateur = async (req, res) => {
  const { filters } = req.query;

  let whereClauses = [];

  let replacements = {};
 
  if (filters.codeuser) {
    whereClauses.push("codeuser like :codeuser");
    replacements.codeuser = `%${filters.codeuser}%`;
  }
  if (filters.email) {
    whereClauses.push("email like :email");
    replacements.email = `%${filters.email}%`;
  }
  if (filters.type) {
    whereClauses.push("type like :type");
    replacements.type = `%${filters.type}%`;
  }
  if (filters.directeur) {
    whereClauses.push("directeur like :directeur");
    replacements.directeur = `%${filters.directeur}%`;
  }
  if (filters.nom) {
    whereClauses.push("nom like :nom");
    replacements.nom = `%${filters.nom}%`;
  }

  // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
  let whereCondition = whereClauses.join(" AND ");

  // ? Si on on a aucune condition on effectue une requete de select * from dfp
  let query = `SELECT codeuser, email, type, directeur, nom
     FROM utilisateur 
      ${whereCondition ? "WHERE " + whereCondition : ""}`;

  const result = await sequelizeConnexionDbUtilisateur.query(query, {
    replacements: replacements,
    type: sequelizeConnexionDbUtilisateur.QueryTypes.SELECT,
  });
  return res.status(200).json({
    message: "Filtrage réussi",
    data: result,
  });
};
//* url :http://localhost:5000/api/utilisateurSystem/getCodeUtilisateurSuivant
const getCodeUtilisateurSuivant = async (req, res) => {
 
  try {

    // On récupère le code max existant
    const [rows] = await sequelizeConnexionDbUtilisateur.query(`SELECT MAX(codeuser) AS maxCode FROM utilisateur`);

    let codeSuivant = 1; // Valeur par défaut si aucun utilisateur

    if (rows.length > 0 && rows[0].maxCode !== null) {
      codeSuivant = parseInt(rows[0].maxCode) + 1;
    }
    return res.status(200).json({ 
      message: "Code utilisateur suivant récupéré",
      codeSuivant: codeSuivant 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * url : http://localhost:5000/api/utilisateurSystem/getListeCodesUtilisateur
const getListeCodesUtilisateur = async(req, res) => {
  try {
    const Utilisateur = defineUserModel(sequelizeConnexionDbUtilisateur);
    const listeCodesUtilisateur = await Utilisateur.findAll({
      order: [["codeuser", "ASC"]],
      attributes: ["codeuser"],
    })
    if(listeCodesUtilisateur.length == 0) {
      return res.status(400).json({message: "aucun utilisateur n'est trouvé dans la base des données"})
    }
    if(listeCodesUtilisateur.length > 0){
      return res.status(200).json({message: "liste codes utilisateurs récupéré avec succès", listeCodesUtilisateur});
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
}
// * url: http://localhost:5000/api/utilisateurSystem/getUtilisateurParCode?codeuser=01
const getUtilisateurParCode = async(req, res) => {
  const { codeuser } = req.query;

  try{
    const Utilisateur = defineUserModel(sequelizeConnexionDbUtilisateur);
    const utilisateur = await Utilisateur.findOne({
      attributes: ["codeuser", "nom", "email", "type", "directeur", "motpasse"],
      where: {
        codeuser: codeuser
      }
    })

    console.log(utilisateur)

    if(utilisateur) {
      return res.status(200).json({message: "utilisateur recuperé avec succès", utilisateur})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
}

module.exports = {
  AjouterUtilisateur,
  getDerniereCodeUtilisateur,
  ModifierUtilisateur,
  supprimerUtilisateur,
  getListeUtilisateurParCode,
  getListeUtilisateurParNom,
  getListeUtilisateurParDirecteur,
  getListeUtilisateurParType,
  getListeUtilisateur,
  filterListeUtilisateur,
  getCodeUtilisateurSuivant,
  getListeCodesUtilisateur,
  getUtilisateurParCode
};
