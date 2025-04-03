const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: 'safi@gmail.com',
  },
  password: {
    type: String,
    required: true,
    default: 'safi1234',
  },
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
