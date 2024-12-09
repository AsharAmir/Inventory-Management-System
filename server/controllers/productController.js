// server/controllers/productController.js

import Product from '../models/Product.js';

// Add new product with categories and stock levels
export const createProduct = async (req, res) => {
  try {
    const { name, sku, category, quantity, price, reorderPoint, imageUrl } = req.body;

    // Check if product with SKU already exists for this owner
    const productExists = await Product.findOne({ 
      owner: req.user.uid,
      sku: sku 
    });

    if (productExists) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const product = new Product({
      name,
      sku,
      category,
      quantity,
      price,
      reorderPoint,
      imageUrl,
      owner: req.user.uid
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search products by name or category
export const searchProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = { owner: req.user.uid };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product details
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: Date.now()
    };

    const product = await Product.findOneAndUpdate(
      { _id: id, owner: req.user.uid },
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOneAndDelete({
      _id: id,
      owner: req.user.uid
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.uid })
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};