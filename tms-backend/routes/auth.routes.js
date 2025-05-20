// routes/auth.routes.js
import express from 'express';
import { login } from '../controllers/auth.controller.js';

// import {
//   getRoles,
//   getRoleById,
//   createRole,
//   updateRole,
//   deleteRole
// } from '../controllers/role.controller.js';

const router = express.Router();

router.post('/login', login);





// router.get('/test', getRoles);
// //router.get('/test', (req, res) => res.json({ ok: true }));
// router.get('/:rolid', getRoleById);
// router.post('/', createRole);
// router.put('/:id', updateRole);
// router.delete('/:id', deleteRole);
export default router;
