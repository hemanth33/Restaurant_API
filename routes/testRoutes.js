const express = require('express');
const { testUserController } = require('../controllers/testController.js');

// Router Object
const router = express.Router();

// Routes
router.get('/test-user', testUserController);

// Export
module.exports = router;