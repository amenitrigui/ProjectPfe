const express = require("express");
const { sequelize } = require("./db/config");
const cors = require("cors");
const devisRoutes = require("./routes/devisRoutes");
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const codePostalRoutes = require("./routes/codePostalRoutes");
const regionRoutes = require("./routes/regionRoutes");
const secteurRoutes = require("./routes/secteurRoutes");
require("dotenv").config();

// * Création de l'application Express
const app = express();

// * Options CORS pour permettre l'accès au frontend
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"], // Autorise le frontend local et déployé
  methods: ["GET", "POST", "PUT", "DELETE"], // Autorise ces méthodes HTTP
  credentials: true, // Permet l'envoi des cookies et en-têtes d'authentification
};

// * Application des options CORS définies ci-dessus
app.use(cors(corsOptions));

// * Middleware pour parser les requêtes en JSON
app.use(express.json());

// * Définition des routes de l'API
app.use("/api/devis", devisRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/codePostal", codePostalRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/secteur", secteurRoutes);
// * Test de connexion à la base de données
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate(); // Connexion à la base de données
    console.log("> Connexion à la base de données réussie !");
    res.send("Connexion réussie !");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
    res.status(500).send("Erreur de connexion à la base de données");
  }
});

// * Démarrage du serveur sur le port défini dans le fichier .env
const PORT = process.env.PORT || 5000; // Valeur par défaut si non définie
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port: ${PORT}`);
});
