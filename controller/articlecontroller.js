
// controllers/yourModelController.js

const YourModel = require('../models/Article');

// Create a new document with validation for unique title
exports.createDocument = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if the title already exists
    const existingDocument = await YourModel.findOne({ title });
    if (existingDocument) {
      return res.status(400).json({ success: false, message: 'Title already taken' });
    }

    // Create and save the new document
    const newDocument = new YourModel({ title, description });
    await newDocument.save();
    res.status(201).json({ success: true, data: newDocument });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await YourModel.find();
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a single document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await YourModel.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Update a document by ID with validation for unique title
exports.updateDocument = async (req, res) => {
    try {
      const { title, description } = req.body;
      const documentId = req.params.id;
  
      // Check if the title already exists for another document
      const existingDocument = await YourModel.findOne({ title, _id: { $ne: documentId } });
      if (existingDocument) {
        return res.status(400).json({ success: false, message: 'Title already taken' });
      }
  
      // Update the document
      const updatedDocument = await YourModel.findByIdAndUpdate(
        documentId,
        { title, description },
        { new: true, runValidators: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ success: false, message: 'Document not found' });
      }
      res.status(200).json({ success: true, data: updatedDocument });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
// Delete a document by ID
exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await YourModel.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
