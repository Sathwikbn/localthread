// backend/src/routes/vendor.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

// Create new product (vendor upload)
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Vendor product creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Edit existing product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const updatedProduct = await Product.findByPk(id);
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Vendor product update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
