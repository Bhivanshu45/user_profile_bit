const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Add parental contacts route
router.post('/add', contactController.addContacts);

// Get parental contacts route
router.get('/:userId', contactController.getContacts);

module.exports = router;
