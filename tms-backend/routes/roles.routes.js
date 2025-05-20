// routes/roles.routes.js
import express from 'express';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from '../controllers/role.controller.js';

const router = express.Router();

router.get('/', getRoles);
//router.get('/test', (req, res) => res.json({ ok: true }));
router.get('/:rolid', getRoleById);
router.post('/', createRole);
router.put('/:rolid', updateRole);
router.delete('/:rolid', deleteRole);

export default router;

