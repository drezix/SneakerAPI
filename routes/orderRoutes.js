const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Add sneaker to cart
router.post('/create/:userId/:storeId', orderController.createOrder);

// Update order
router.put('/:orderId/:storeId', orderController.updateOrder);

// Delete order
router.delete('/:orderId', orderController.removeOrder);

// Get order by user
router.get('/:orderId', orderController.getOrderById);

router.put('/finalize/:orderId/:storeId', orderController.finalizeOrder);

module.exports = router;
