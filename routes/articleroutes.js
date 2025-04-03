// routes/yourModelRoutes.js

const express = require('express');
const {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require('../controller/articlecontroller');

const router = express.Router();

// Route for creating a new document
router.post('/', createDocument);

// Route for getting all documents
router.get('/', getAllDocuments);

// Route for getting a document by ID
router.get('/:id', getDocumentById);

// Route for updating a document by ID
router.put('/:id', updateDocument);

// Route for deleting a document by ID
router.delete('/:id', deleteDocument);

module.exports = router;
