const express = require('express');
const router = express.Router();
const { installDB, dropDB } = require('../controllers/installController');

// GET /install
router.get('/', installDB); // Install data in the database

// DELETE /install/drop
router.delete('/drop', dropDB); // Delete all data in the database

module.exports = router;