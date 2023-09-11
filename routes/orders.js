const express = require('express');

const router = express.Router();
const { requiredAuth, isAdmin } = require('../middleware/auth');

const {
    createOrder,
    updateOrder,
    getOrders,
    getOrdersById,
    deleteOrder,
} = require('../controller/order');

router.post('/orders', requiredAuth, createOrder);
router.patch('/orders/:id', requiredAuth, updateOrder);
router.get('/orders', requiredAuth, getOrders);
router.get('/orders/:id', requiredAuth, getOrdersById);
router.delete('/orders/:id', requiredAuth, deleteOrder);

module.exports = router;
