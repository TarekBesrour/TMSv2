const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Configuration de la connexion PostgreSQL Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // requis pour Neon
});

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

app.listen(port, () => {
  console.log(`✅ Serveur Node.js démarré sur port ${port}`);
});
