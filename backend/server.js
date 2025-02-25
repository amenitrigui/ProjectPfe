const express = require("express");
const {sequelize} = require("./db/config");
const cors = require("cors");
const devisRoutes = require("./routes/devisRoutes");
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require('./routes/userRoutes');
const path = require("path");
const config = require('./db/config');  
const clientRoutes = require('./routes/clientRoutes');


require("dotenv").config();
const app = express();

const corsOptions = {
  origin : [process.env.FRONTEND_URL, "http://localhost:3000"],
  methods: ["GET","POST","PUT","DELETE"],
  Credentials: true // to allow auth headers as well as cookies
}

app.use(cors(corsOptions));

app.use(express.json());
//midelware
app.use("/api/devis", devisRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/client", clientRoutes);
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();// conexion avec la base de donnes
    console.log(">get server.js: Connexion à la base de données réussie !");
  } catch (error) { 
    res.status(500).send("Impossible de se connecter à la base de données", error);
  }
});

const PORT = process.env.PORT || 5000  
app.listen(PORT, () => {
  console.log(`Serveur est en écoute sur le port: ${PORT}`);
});