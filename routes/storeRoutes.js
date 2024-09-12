const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Create store (admin)
router.post('/create', adminMiddleware, storeController.createStore);

// Add sneaker to store (admin)
router.post('/:storeId/sneakers/:sneakerId',adminMiddleware, storeController.addSneakerToStore);

// List all stores 
router.get('/', storeController.listStores);

// List all sneakers in a store 
router.get('/:storeId/sneakers', storeController.listSneakersInStore);

module.exports = router;
