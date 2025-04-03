const express = require('express');
const { getAdmin, updateAdmin, createDefaultAdmin } = require('../controller/admincontroller'); // Update with the correct path to your controller file

const router = express.Router();
// Route for getting admin data
router.post('/', createDefaultAdmin);

// Route for getting admin data
router.get('/', getAdmin);

// Route for updating admin data
router.put('/:id', updateAdmin);

module.exports = router;
