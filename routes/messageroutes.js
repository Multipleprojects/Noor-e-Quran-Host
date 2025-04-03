const express = require('express');
const messageController = require('../controller/messageController'); // Use consistent naming convention
const router = express.Router();

// Route for creating a new message
router.post('/create', messageController.createMessage);

// Route for retrieving all messages
router.get('/get', messageController.getMessage); // Changed to getMessages for consistent naming with the controller

// Route for updating a message by ID
router.put('/update/:id', messageController.updateMessage);

module.exports = router;
