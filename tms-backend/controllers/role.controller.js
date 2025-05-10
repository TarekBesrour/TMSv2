//const Role = require('../models/role.model.js');  // Assumes you have a Role model


// controllers/roles.controller.js
import pool from '../db.js';

export const getRoles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM role');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

export const getRoleById = async (req, res) => {
  const { rolid } = req.params;
  try {
    const result = await pool.query('SELECT * FROM role WHERE rolid = $1', [rolid]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
export const createRole = async (req, res) => {
  const { rolcode, rolnom,rolactif } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO role (rolcode, rolnom,rolactif) VALUES ($1, $2, $3) RETURNING *',
      [rolcode, rolnom,rolactif]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { rolcode, rolnom,rolactif } = req.body;

  try {
    const result = await pool.query(
      'UPDATE role SET rolcode=$1, rolnom=$2, rolactif=$3 WHERE rolid=$3 RETURNING *',
      [rolcode, rolnom,rolactif, rolid]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

export const deleteRole = async (req, res) => {
  const { rolid } = req.params;

  try {
    const result = await pool.query('DELETE FROM role WHERE rolid=$1 RETURNING rolid', [rolid]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json({ message: 'Rôle supprimé', id });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};


module.exports = { createRole, getAllRoles, getRoleById, updateRole, deleteRole };
