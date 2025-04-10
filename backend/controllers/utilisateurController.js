const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const Representant = require("../models/representant");
const defineUserModel = require("../models/utilisateur/utilisateur");
const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const handlebars = require("handlebars");
const fs = require("fs");

const {
  getDatabaseConnection,
  verifyTokenValidity,
} = require("../common/commonMethods");

// * initialisation de client OAuth2 avec
// * les paramètres: clientId, clientSecret, redirectUrl
// * clientId: id de l'application, fourni par google
// * clientSecret: secret key associé avec le clientId, fourni par google
// * redirectUrl: rédirection lors de l'accord d'authorisations par l'utilisateur
const oAuth2Client = new google.auth.OAuth2(
  process.env.NODEMAILER_CLIENT_ID,
  process.env.NODEMAILER_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// * initialisation de refresh_token pour qu'on peut s'authentifier avec
// * gmail et obtenir un token d'accès
// * access token : utilisé pour faire des requete api vers gmail autorisé par google
// * refresh token : permet au client OAuth2 de demander un nouveau access token
oAuth2Client.setCredentials({
  refresh_token: process.env.NODEMAILER_REFRESH_TOKEN,
});

// * enregistrer une nouvelle utilisateur
// * dans la base des données ErpSole
// * exemple
// * input : {nom: "testUser", "motpasse": "testUserMotPasse", "email": "testUser@test.test"}
// * output : aucune, l'utilisateur sera enregistré dans la base de données
// * verb : post
// * http://localhost:5000/api/utilisateurs/inscrireUtilisteur
const inscrireUtilisteur = async (req, res) => {
  const { email, motpasse, nom } = req.body;

  try {
    if (!email || !motpasse || !nom) {
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis." });
    }
    const dbConnection = await getDatabaseConnection(process.env.DB_USERS_NAME);
    const User = defineUserModel(dbConnection);
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(motpasse, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
      email,
      motpasse: hashedPassword,
      nom,
      type: "Utilisateur",
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user: {
        codeuser: newUser.codeuser,
        email: newUser.email,
        nom: newUser.nom,
      },
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

// * Generer un jwt d'accès pour un utilisateur déjà inscrit
// * exemple
// * input : {nom: "test", motpasse: "test"}
// * outpout : jwt
// * verb : post
// * http://localhost:5000/api/utilisateurs/loginUtilisateur
const loginUtilisateur = async (req, res) => {
  const { nom, motpasse } = req.body;

  try {
    const dbConnection = await getDatabaseConnection(
      process.env.DB_USERS_NAME,
      res
    );
    const User = defineUserModel(dbConnection);
    // Vérification que tous les champs sont remplis
    if (!nom || !motpasse) {
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis." });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ where: { nom } });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Vérification du mot de passe
    // comparaison de mot de passe donnée
    // avec le hash dans la bd
    const isPasswordMatched = bcrypt.compareSync(motpasse, user.motpasse);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // * Requête pour récupérer les sociétés (rsoc) associées avec le nom d'utilisateur
    // * ceci est pour le composant de  liste des sociétés
    const societies = await dbConnection.query(
      `SELECT us.societe, s.rsoc
       FROM usersoc us
       JOIN societe s ON us.societe = s.code
       WHERE us.codeuser = :codeuser`,
      {
        replacements: { codeuser: user.codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    // Création du token JWT
    const token = jwt.sign(
      { codeuser: user.codeuser },

      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Envoi de la réponse
    return res.status(200).json({
      message: "Connexion réussie.",
      token,
      codeuser: user.codeuser,
      societies: societies.map((s) => ({
        societe: s.societe, // Code de la société
        rsoc: s.rsoc, // Nom de la société
      })),
    });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la connexion." });
  }
};

// * Recupère la liste de devis pour une sociète donnée
// ! useless
// * verb : post
// * http://localhost:5000/api/utilisateurs/select-database
const selectDatabase = async (req, res) => {
  const { databaseName } = req.body;

  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const decoded = verifyTokenValidity(req);
    const codeuser = decoded.codeuser;

    // ! await keyword is VERY important
    const dbConnection = await getDatabaseConnection(databaseName, res);

    const devisList = await dbConnection.query(
      `SELECT YEAR(datebl) AS year, MAX(numbl) AS numbl
       FROM dfp
       WHERE usera = :codeuser
       GROUP BY YEAR(datebl)
       ORDER BY year DESC`,
      {
        replacements: { codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    console.log(devisList);

    return res.status(200).json({
      message: `Connecté à la base ${databaseName}`,
      databaseName,
      devis: devisList,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
    return res
      .status(500)
      .json({ message: "Impossible de se connecter à la base de données." });
  }
};

// * Envoyer un email de réinitialisation de mot de passe
// * pour un email donné si un utilisateur ayant cet email existe
// * verb : post
// * http://localhost:5000/api/utilisateurs/envoyerDemandeReinitialisationMp
const envoyerDemandeReinitialisationMp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "L'Email est requise." });
  }

  try {
    const dbConnection = await getDatabaseConnection(
      process.env.DB_USERS_NAME,
      res
    );
    const User = defineUserModel(dbConnection);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur n'existe pas." });
    }

    const passwordResetToken = jwt.sign(
      {
        codeuser: user.codeuser,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_PASSWORD_RESET_EXPIRATION,
      }
    );

    const accessToken = await oAuth2Client.getAccessToken();
    console.log("Access Token:", accessToken);

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.NODEMAILER_EMAIL_USER,
        accessToken: accessToken.token,
        clientId: process.env.NODEMAILER_CLIENT_ID,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.NODEMAILER_REFRESH_TOKEN, //j'ai pas compris
      },
    });

    const source = fs
      .readFileSync("PasswordResetTemplate.html", "utf-8")
      .toString();
    const template = handlebars.compile(source);
    const replacements = {
      url: `${process.env.FRONTEND_URL}/EmailEnvoye`,
    };

    const htmlToSend = template(replacements);

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: "test",
      html: htmlToSend,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: "Email de réinitialisation envoyé avec succès",
      passwordResetToken,
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de mail de réinitialisation de mot de passe: ",
      error
    );
    return res
      .status(500)
      .json({ message: "Error sending password reset email.", error });
  }
};

// * réinitialiser le mot de passe pour un email donné
// * si un utilisateur ayant cet email existe
// * verb : put
// * http://localhost:5000/api/utilisateurs/reinitialiserMotPasse
const reinitialiserMotPasse = async (req, res) => {
  const { email, password, token } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "L'utilisateur n'est pas authentifié" });
  }

  if (!password) {
    return res.status(500).json({
      message:
        "Le mot de passe à utiliser lors de réinitialisation ne peut pas etre vide",
    });
  }
  const decodedJWT = verifyTokenValidity(req, res);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "Cette email n'est pas associé à aucun utilisateur",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    user.motpasse = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe modifié avec succès" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Un erreur est survenu lors de la réinitialisation de mot de passe",
    });
  }
};

// * récuperer les informations d'un utilisateur par son code
// * verb : get
// * http://localhost:5000/api/utilisateurs/getUtilisateurParCode/1
const getUtilisateurParCode = async (req, res) => {
  const { codeuser } = req.params;

  try {
    const dbConnection = await getDatabaseConnection("usererpsole", res);

    const utilisateur = await dbConnection.query(
      "SELECT * FROM utilisateur WHERE codeuser = :codeuser", // <-- la requête SQL avec un paramètre nommé
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: { codeuser: codeuser },
      }
    );

    console.log(utilisateur);

    if (utilisateur.length > 0) {
      return res.status(200).json({
        message: "Utilisateur récupéré avec succès",
        utilisateur,
      });
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Exporter la méthode
module.exports = {
  inscrireUtilisteur,
  loginUtilisateur,
  selectDatabase,
  envoyerDemandeReinitialisationMp,
  reinitialiserMotPasse,
  getUtilisateurParCode,
};
