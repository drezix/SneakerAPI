const express = require('express');
const router = express.Router();
const installDB = require('../config/installDB');

router.get('/', installDB.installDB); // Install data in the database

module.exports = router;