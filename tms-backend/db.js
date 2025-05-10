// db.js
import pkg from 'pg';
import dotenv from 'dotenv';
//const { Pool } = require('pg');
//require('dotenv').config();

dotenv.config();

const { Pool } = pkg;

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

export default pool;
