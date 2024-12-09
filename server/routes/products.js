// server/routes/products.js

import express from 'express';
import { protect } from '../middleware/auth.js';
import * as productController from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

// Main CRUD routes
router.route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router.get('/search', productController.searchProducts);

router.route('/:id')
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

// Image upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = await uploadToImgur(req.file.buffer);
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;