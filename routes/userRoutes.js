const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// Authentication middleware
router.use(authMiddleware, adminMiddleware);

// POST /user
router.put('/:id', adminMiddleware, userController.updateUser);

// DELETE /user/:id
router.delete('/:id', adminMiddleware, userController.removeUser);

// GET /user
router.get('/', adminMiddleware, userController.listUser);

// GET /user/:id
router.get('/:id', adminMiddleware, userController.getByID);

module.exports = router;