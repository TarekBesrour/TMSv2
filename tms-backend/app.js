const express = require("express");
const cors = require('cors');

const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// Configuration de la connexion PostgreSQL Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // requis pour Neon
});

// Activation de CORS ici
app.use(cors());
// Middleware pour parser le JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌱 Serveur backend connecté à PostgreSQL Neon");
});

app.get("/now", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur PostgreSQL");
  }
});

// Routes de l'API
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Meriem' },
    { id: 3, name: 'Sami' }
  ];
  res.json(users);
});


app.listen(port, () => {
  console.log(`✅ Serveur Node.js démarré sur port ${port}`);
});
