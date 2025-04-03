const express = require('express');
const {
  createUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
  updateUserPassword
} = require('../controller/usercontroller'); // Update with the correct path to your controller file

const router = express.Router();

// Route for creating a new user
router.post('/', createUser);

// Route for getting all users
router.get('/', getUsers);

// Route for logging in a user
router.post('/login', loginUser);

// Route for updating a user by ID
router.put('/:id', updateUser);

// Route for deleting a user by ID
router.delete('/:id', deleteUser);
// Route for put a user by ID
router.put('/updatepassword/:id', updateUserPassword);
module.exports = router;
