// routes/users.routes.js
import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// GET /api/users (protégé)
router.get('/', authenticate, getUsers);

// GET by id /api/users (protégé)
router.get('/:id', getUserById);


// POST /api/users (protégé)
router.post('/', authenticate, createUser);

// Mettre à jour un utilisateur
router.put('/:id', authenticate, updateUser);

// Supprimer un utilisateur
router.delete('/:id', authenticate, deleteUser);

export default router;
