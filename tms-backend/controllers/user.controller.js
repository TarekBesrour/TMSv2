// controllers/users.controller.js
import pool from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT *  FROM utilisateur');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM utilisateur WHERE usrid = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


export const createUser = async (req, res) => {
    const { nom, email, mot_de_passe, role_id, actif } = req.body;
  
    try {
      const hash = await bcrypt.hash(mot_de_passe, 10);
      const result = await pool.query(
        'INSERT INTO utilisateur (usrnom, usremail, usrpassword, usrrolid,usrActif) VALUES ($1, $2, $3, $4, $5) RETURNING usrid, usrnom, usremail, usrrolid, usractif',
        [nom, email, hash, role_id, actif]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
    }
  };

  export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, email, mot_de_passe, role_id, actif } = req.body;

  try {
    let query, values;
    if (mot_de_passe) {
      const hash = await bcrypt.hash(mot_de_passe, 10);
      query = 'UPDATE utilisateur SET usrnom=$1, usremail=$2, usrpassword=$3, usrrolid"=$4, usractif=$5 WHERE usrid=$6 RETURNING usrid, usrnom, usremail, usrrolid, usractif';
      values = [nom, email, hash, role_id, actif, id];
    } else {
      query = 'UPDATE utilisateur SET usrnom=$1, usremail=$2, usrrolid=$3, usractif=$4 WHERE usrid=$5 RETURNING usrid, usrnom, usremail, usrrolid, usractif';
      values = [nom, email, role_id, actif, id];
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM utilisateur WHERE usrid=$1 RETURNING usrid', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé', id });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};