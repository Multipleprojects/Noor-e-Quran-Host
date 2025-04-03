const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Video } = require('../models/Fileuploadmodel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Set up Multer for temporary file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB file size limit
    fileFilter: (req, file, cb) => {
        const ext = file.mimetype;
        if (ext !== 'video/mp4' && ext !== 'video/x-matroska') {
            return cb(new Error('Only MP4 and MKV formats are supported'), false);
        }
        cb(null, true);
    }
}).single('file');

// Route to upload a video
router.post("/uploadfiles", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ success: false, err });
        }

        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'video', // Specify that the file is a video
                folder: 'videos' // Optional: store in a specific folder
            });

            // Remove file from local storage after uploading
            fs.unlinkSync(req.file.path);

            return res.json({ 
                success: true, 
                filePath: result.secure_url, // Cloudinary URL
                public_id: result.public_id 
            });
        } catch (uploadErr) {
            return res.status(500).json({ success: false, error: uploadErr.message });
        }
    });
});

// Route to create a new video document in the database
router.post("/uploadVideo", async (req, res) => {
    try {
        const { filePath, title } = req.body;

        // Check if a video with the same filePath or title already exists
        const existingVideo = await Video.findOne({ $or: [{ filePath }, { title }] });
        if (existingVideo) {
            return res.status(400).json({ success: false, message: 'A video with this file path or title already exists.' });
        }

        // If not, create a new video document
        const video = new Video(req.body);
        const savedVideo = await video.save();

        return res.status(200).json({ success: true, video: savedVideo });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'An error occurred while uploading the video.', err });
    }
});

// Route to fetch all videos
router.get("/getVideos", (req, res) => {
    Video.find()
        .exec((err, videos) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).json({ success: true, videos });
        });
});

// Route to delete a video by ID
router.delete("/deleteVideo/:id", async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        // Delete from MongoDB
        await Video.findByIdAndDelete(req.params.id);

        return res.status(200).json({ success: true, message: 'Video deleted successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
