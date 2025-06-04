const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Import des routes
const devisRoutes = require("./routes/devisRoutes");
const articleRoutes = require("./routes/articleRoutes");
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const clientRoutes = require("./routes/clientRoutes");
const codePostalRoutes = require("./routes/codePostalRoutes");
const regionRoutes = require("./routes/regionRoutes");
const secteurRoutes = require("./routes/secteurRoutes");
const familleRoutes = require("./routes/familleRoutes");
const sousfamilleRoutes = require("./routes/sousfamilleRoutes");
const Stock_ArticleRoutes = require("./routes/Stock_ArticleRoutes");
const Valorisation_ArticleRoutes = require("./routes/Valorisation_ArticleRoutes");
const utilisateurSystemRoutes = require("./routes/utilisateurSystemRoutes");
const pointventeRoutes = require("./routes/pointVenteRoutes");
const { getDatabaseConnection } = require("./common/commonMethods");

// Création de l'application Express
const app = express();

// Configuration CORS
const corsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_DISTANT],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration Multer pour les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'user-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, gif)'));
  }
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} from ${req.headers.origin}`);
  next();
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API
app.use("/api/devis", devisRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/codePostal", codePostalRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/secteur", secteurRoutes);
app.use("/api/famille", familleRoutes);
app.use("/api/sousfamille", sousfamilleRoutes);
app.use("/api/Stock_Article", Stock_ArticleRoutes);
app.use("/api/Valorisation_Article", Valorisation_ArticleRoutes);
app.use("/api/utilisateurSystem", utilisateurSystemRoutes);
app.use("/api/pointvente", pointventeRoutes);

// Health check endpoint
app.get("/", async (req, res) => {
  try {
    await getDatabaseConnection(process.env.DB_USERS_NAME);
    console.log("> Connexion à la base de données réussie !");
    res.status(200).json({
      status: "success",
      message: "Connexion réussie à l'API et à la base de données",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    res.status(500).json({
      status: "error",
      message: "Erreur de connexion à la base de données",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Une erreur est survenue",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nServeur en écoute sur le port: ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`URL: http://localhost:${PORT}\n`);
});