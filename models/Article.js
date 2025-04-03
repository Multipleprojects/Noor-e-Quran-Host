// models/YourModel.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

module.exports = ArticleModel;
