const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const Representant = require("../models/representant");
const defineUserModel = require("../models/utilisateur/utilisateur");
const { sequelizeUserERP } = require("../db/config");
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

const registerUser = async (req, res) => {
  const { email, motpasse, nom } = req.body;

  try {
    if (!email || !motpasse || !nom) {
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis." });
    }

    const User = defineUserModel(sequelizeUserERP);
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
      type: "Utilisateur"
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

const loginUser = async (req, res) => {
  const { nom, motpasse } = req.body;
  console.log(nom," ",motpasse);
  const User = defineUserModel(sequelizeUserERP);
  console.log(User);

  try {
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

    // Requête pour récupérer les sociétés associées avec leur nom (rsoc)
    // ceci est pour le composant de  liste des sociétés
    const societies = await sequelizeUserERP.query(
      `SELECT us.societe, s.rsoc
       FROM usersoc us
       JOIN societe s ON us.societe = s.code
       WHERE us.codeuser = :codeuser`,
      {
        replacements: { codeuser: user.codeuser },
        type: sequelizeUserERP.QueryTypes.SELECT,
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
// ! this does not belong in here
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

/**
 * Description
 * ! this does not belong in here
 * @author Unknown
 * @date 2025-02-07
 * @returns {status}
 */
const getDevisDetails = async (req, res) => {
  const { databaseName, NUMBL } = req.params;

  if (!databaseName || !NUMBL) {
    return res.status(400).json({
      message:
        "Le nom de la base de données et le numéro de devis sont requis.",
    });
  }

  try {
    const decoded = verifyTokenValidity(req, res);
    const codeuser = decoded.codeuser;
    const dbConnection = getDatabaseConnection(databaseName, res);

    const [devisDetails, ldfpDetails] = await Promise.all([
      dbConnection.query(
        `SELECT dfp.NUMBL, dfp.ADRCLI, dfp.CODECLI, dfp.cp , dfp.MTTC, dfp.MHT, dfp.CODEREP, dfp.RSREP ,dfp.comm ,dfp.RSCLI, dfp.usera, dfp.DATEBL
         FROM dfp
         WHERE dfp.NUMBL = :NUMBL AND dfp.usera = :codeuser`,
        {
          replacements: { NUMBL, codeuser },
          type: dbConnection.QueryTypes.SELECT,
        }
      ),
      dbConnection.query(
        `SELECT ldfp.CodeART, ldfp.DesART, ldfp.QteART, ldfp.Remise, ldfp.TauxTVA, ldfp.Unite, ldfp.Conf, ldfp.NLigne, ldfp.famille, ldfp.PUART
         FROM ldfp
         WHERE ldfp.NUMBL = :NUMBL`,
        {
          replacements: { NUMBL },
          type: dbConnection.QueryTypes.SELECT,
        }
      ),
    ]);

    if (devisDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun devis trouvé pour ce numéro de devis." });
    }

    return res.status(200).json({
      message: `Informations du devis ${NUMBL} récupérées avec succès.`,
      databaseName,
      devis: [
        {
          year: new Date(devisDetails[0].DATEBL).getFullYear(),
          numbl: devisDetails[0].NUMBL,
          dfpDetails: devisDetails[0],
          lignes: ldfpDetails.map((article) => ({
            CodeART: article.CodeART,
            DesART: article.DesART,
            QteART: article.QteART,
            Remise: article.Remise,
            TauxTVA: article.TauxTVA,
            Unite: article.Unite,
            Conf: article.Conf,
            NLigne: article.NLigne,
            famille: article.famille,
            PUART: article.PUART,
          })),
        },
      ],
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du devis :",
      error
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des détails du devis.",
    });
  }
};

/**
 * Description
 * retourne la devis ayant l'année la plus récente avec ses lignes d'articles
 * ! this does not belong in here
 * @author Unknown
 * @date 2025-02-10
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
const getLatestDevisByYear = async (req, res) => {
  const { databaseName } = req.params;

  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "En-tête Authorization manquant." });
    }

    const decoded = jwt.verify(
      authHeader.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    const codeuser = decoded.codeuser;

    const dbConnection = getDatabaseConnection(databaseName, res);

    const latestDevis = await dbConnection.query(
      `SELECT 
         YEAR(DATEBL) AS year, 
         MAX(numbl) AS numbl 
       FROM dfp 
       WHERE usera = :codeuser
       GROUP BY YEAR(DATEBL)`,
      {
        replacements: { codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    // ? ?????
    // if (latestDevis.length === 0) {
    //   return res.status(404).json({ message: 'Aucun devis trouvé pour cet utilisateur.' });
    // }

    const devisDetails = await Promise.all(
      latestDevis.map(async ({ year, numbl }) => {
        const dfpDetails = await dbConnection.query(
          `SELECT dfp.numbl, dfp.adrcli, dfp.codecli, dfp.cp, dfp.RSCLI, dfp.usera, dfp.DATEBL
           FROM dfp 
           WHERE numbl = :numbl`,
          {
            replacements: { numbl },
            type: dbConnection.QueryTypes.SELECT,
          }
        );

        const ldfpDetails = await dbConnection.query(
          `SELECT ldfp.CodeART, ldfp.DesART, ldfp.QteART, ldfp.Remise, ldfp.TauxTVA, ldfp.Unite
           FROM ldfp 
           WHERE NumBL = :numbl`,
          {
            replacements: { numbl },
            type: dbConnection.QueryTypes.SELECT,
          }
        );

        return {
          year,
          numbl,
          dfpDetails: dfpDetails[0],
          articles: ldfpDetails,
        };
      })
    );

    return res.status(200).json({
      message: "Derniers devis par année récupérés avec succès.",
      databaseName,
      devis: devisDetails,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des devis par année :",
      error
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des devis." });
  }
};

/**
 * Description
 * récupère la liste des clients d'une societé (databaseName)
 * ! this does not belong in here
 * @author Unknown
 * @date 2025-02-10
 * @param {any} req
 * @param {any} res
 * @returns {clients}
 */
const getAllClients = async (req, res) => {
  const { databaseName } = req.params;

  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const decoded = verifyTokenValidity(req, res);
    const codeuser = decoded.codeuser;

    const dbConnection = getDatabaseConnection(databaseName, res);

    // Récupérer tous les clients
    const clients = await dbConnection.query(
      `SELECT 
         ADRCLI, 
         CODECLI, 
         CODEFACTURE, 
         CP, 
         RSCLI, 
         comm
       FROM dfp
       WHERE usera = :codeuser`,
      {
        replacements: { codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    if (clients.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun client trouvé pour cet utilisateur." });
    }

    return res.status(200).json({
      message: "Liste des clients récupérée avec succès.",
      databaseName,
      clients,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des clients." });
  }
};

/**
 * Description
 * ! this does not belong in here
 * @author Unknown
 * @date 2025-02-07
 * @returns {any}
 */
const getAllSectors = async (req, res) => {
  const { databaseName } = req.params;

  if (!databaseName) {
    return res
      .status(400)
      .json({ message: "Le nom de la base de données est requis." });
  }

  try {
    const dbConnection = getDatabaseConnection(databaseName, res);

    // Récupérer tous les secteurs de la table secteur
    const sectors = await dbConnection.query(
      `SELECT codesec, desisec FROM secteur`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    if (sectors.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun secteur trouvé dans cette base de données." });
    }

    return res.status(200).json({
      message: "Liste des secteurs récupérée avec succès.",
      databaseName,
      sectors,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des secteurs :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des secteurs." });
  }
};

// * Envoyer un email de réinitialisation de mot de passe
// * pour un email donné si un utilisateur ayant cet email existe

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "L'Email est requise." });
  }

  try {
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

const passwordReset = async (req, res) => {
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

// * 
const getUtilisateurParCode = async(req, res) => {
  try{
    const {dbName} = req.params;
    const { codeuser } = req.query;

    const dbConnection = await getDatabaseConnection(dbName, res);
    const utilisateur = await dbConnection.query(
      `SELECT codeuser, nom FROM utilisateur WHERE codeuser = :codeuser`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          codeuser: codeuser
        }
      }
    )

    console.log(utilisateur);

    if(utilisateur) {
      return res.status(200).json({message: "utilisateur récuperé avec succès", utilisateur:utilisateur})
    }
  }catch(error) {
    return res.status(500).json({message: error.message})
  }
}

// Exporter la méthode
module.exports = {
  registerUser,
  loginUser,
  selectDatabase,
  getDevisDetails,
  getLatestDevisByYear,
  getAllClients,
  getAllSectors,
  sendPasswordResetEmail,
  passwordReset,
  getUtilisateurParCode
};
