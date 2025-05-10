// seed-user.js
import bcrypt from 'bcrypt';
import pool from './db.js';
//const bcrypt = require('bcrypt');
//const pool = require('./db.js');

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Erreur de connexion à la base de données :', err);
//   } else {
//     console.log('Connexion réussie à la base de données :', res.rows[0]);
//   }
//   process.exit();
// });

const seedUser = async () => {
  const hash = await bcrypt.hash('123456', 10);
  //await pool.query('INSERT INTO role(nom) VALUES ($1) ON CONFLICT DO NOTHING', ['admin']);
  const roleRes = await pool.query('SELECT role."rolID" FROM role WHERE role."rolCode" = $1', ['admin']);
  console.log(roleRes.rows[0].rolID);

  await pool.query(
    'INSERT INTO utilisateur ("usrNom", "usrEmail", "usrPassword", "usrRolID") VALUES ($1, $2, $3, $4)',
    ['tarek5', 'tarek@example.com', hash, roleRes.rows[0].rolID]
  );
  console.log('Utilisateur inséré');
  process.exit();
};

seedUser();
