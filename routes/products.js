const express = require('express');

const router = express.Router();
const { requiredAuth, isAdmin } = require('../middleware/auth');

const {
  createProduct,
  updateProduct,
  getProducts,
  getProductsById,
  deleteProduct,
} = require('../controller/products');

router.post('/products', requiredAuth, isAdmin, createProduct);
router.patch('/products/:id', requiredAuth, isAdmin, updateProduct);
router.get('/products', requiredAuth, getProducts);
router.get('/products/:id', requiredAuth, getProductsById);
router.delete('/products/:id', requiredAuth, isAdmin, deleteProduct);

module.exports = router;
