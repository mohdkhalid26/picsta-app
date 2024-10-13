// backend/config/multerConfig.js
const multer = require("multer");
const path = require("path");

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Path to uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix); // Use original name with timestamp
  },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

module.exports = upload;
