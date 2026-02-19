const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user details route
router.get('/:userId', userController.getUserDetails);

module.exports = router;
