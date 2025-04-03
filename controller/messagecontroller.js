const MessageModel = require("../models/Message");

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const newMessage = new MessageModel({ message });
        
        await newMessage.save();
        
        res.status(201).json({ success: true, message: "Message created successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating message", error: error.message });
    }
};
// Get all messages
exports.getMessage= async (req, res) => {
    try {
        const messages = await MessageModel.find();
        
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving messages", error: error.message });
    }
};

// Update a message
exports.updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        
        // Find the message by id and update it
        const updatedMessage = await MessageModel.findByIdAndUpdate(
            id,
            { $set: { message } },
            { new: true, runValidators: true } // Returns the updated document and validates input
        );

        if (!updatedMessage) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        res.status(200).json({ success: true, message: "Message updated successfully", data: updatedMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating message", error: error.message });
    }
};
