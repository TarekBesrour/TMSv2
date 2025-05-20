// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';
//const { Pool } = require('pg');
//require('dotenv').config();

dotenv.config();

//const { Pool } = pkg;

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: { rejectUnauthorized: false }, // utile pour Neon
});

/* const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  }); */

//   pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Erreur de connexion à la base de données :', err);
//   } else {
//     console.log('Connexion réussie à la base de données :', res.rows[0]);
//   }
//   process.exit();
  
// });

export default pool;
