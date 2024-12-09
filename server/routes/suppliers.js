// server/routes/suppliers.js

import express from 'express';
import { protect } from '../middleware/auth.js';
import * as supplierController from '../controllers/supplierController.js';

const router = express.Router();

router.use(protect);

// CRUD routes
router.route('/')
  .get(supplierController.getAllSuppliers)
  .post(supplierController.createSupplier);

router.get('/search', supplierController.searchSuppliers);

router.route('/:id')
  .put(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);

export default router;