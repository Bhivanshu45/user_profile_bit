const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Add parental contacts route (userId in params)
router.post('/add/:userId', contactController.addContacts);

// Get parental contacts route
router.get('/:userId', contactController.getContacts);

module.exports = router;
