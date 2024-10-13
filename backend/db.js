const mongoose = require("mongoose");
require("dotenv").config();

// Define MongoDB connection URL
const mongoUrl = process.env.MONGODB_URL_LOCAL || process.env.MONGODB_URL;

// Setup MongoDB connection with options
mongoose.connect(mongoUrl);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Export the database connection
module.exports = db;
