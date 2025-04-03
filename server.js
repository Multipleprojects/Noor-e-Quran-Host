const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv').config();
const path = require("path");
// Use packages
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, "build")));

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));
// Routes
app.use('/admin', require('./routes/adminroutes'));
app.use('/uploadvideo', require('./routes/fileuploadroutes'));
app.use('/article', require('./routes/articleroutes'));
app.use('/message', require('./routes/messageroutes'));

// Serve the React app on all routes except API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const url ="mongodb+srv://alyanbhatti688:kW2zxzsVcNfNpe7F@cluster0.2zvzr.mongodb.net/Quranverse?retryWrites=true&w=majority&appName=Cluster0";

//url="mongodb://127.0.0.1:27017/Quranverse";
// Connect to the database
mongoose.connect(url)
  .then(async () => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log("Error occurred in database:", err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
