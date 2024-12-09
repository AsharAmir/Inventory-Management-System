// server/routes/users.js

import express from 'express';
import { protect, adminMiddleware } from '../middleware/auth.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Apply authentication and admin middleware
router.use(protect);
router.use(adminMiddleware);

router.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router.get('/search', userController.searchUsers);

router.route('/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;