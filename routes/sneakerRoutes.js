const express = require('express');
const router = express.Router();
const sneakerController = require('../controllers/sneakerController');
const { adminMiddleware, authMiddleware } = require('../middlewares/authMiddleware');

// Authentication middleware
router.use(authMiddleware);

// POST /sneaker
router.post('/', adminMiddleware, sneakerController.saveSneaker);
  
// PUT /sneaker/:id
router.put('/:id', adminMiddleware, sneakerController.updateSneaker);
  
// DELETE /sneaker/:id
router.delete('/:id', adminMiddleware, sneakerController.removeSneaker);

// GET /sneaker/:id
router.get('/', sneakerController.listSneaker);

module.exports = router;