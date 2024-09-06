const express = require('express');
const router = express.Router();
const installDB = require('../controllers/installController');

router.get('/', installDB.installDB); // Install data in the database
router.delete('/', installDB.dropDB); // Delete all data in the database

module.exports = router;