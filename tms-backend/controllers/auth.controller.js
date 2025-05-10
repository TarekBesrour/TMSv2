// controllers/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM utilisateur WHERE utilisateur."usrEmail" = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.usrPassword);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.usrID, role: user.usrRolID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.usrRolID, email: user.usrEmail, nom: user.usrNom } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
