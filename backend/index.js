const express = require("express");
require("dotenv").config();
const db = require("./db"); // Database connection
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const PORT = process.env.PORT || 8000;
const { errorHandler, logRequest } = require("./middlewares");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve /uploads

// Error Handling Middleware
app.use(errorHandler, logRequest);

// Routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
