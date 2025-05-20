// controllers/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM utilisateur WHERE usremail = $1', [email]);
    console.log('Résultat de la requête :', result.rows);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.usrpassword);
    console.log('bcrypt.compare');
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.usrid, role: user.usrrolid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.usrrolid, email: user.usremail, nom: user.usrnom } });
  } catch (err) {
    console.error('Erreur lors de la requête SQL :', err);
    res.status(500).json({ message: 'Erreur serveur...', error: err.message });
  }
};
