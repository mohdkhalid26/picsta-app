const jwt = require("jsonwebtoken");
// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - Request Made to: ${req.method} ${
      req.originalUrl
    }`
  );
  next();
};

// JWT authentication middleware
const jwtAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  // Check if the token is present in cookies
  if (!token) {
    return res.status(401).json({ error: "Token not found or invalid format" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information (from token) to the request object
    req.jwtPayload = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error: ", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT token
const generateToken = (userData) => {
  // Ensure JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Generate a new JWT token using userData
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { logRequest, jwtAuthMiddleware, generateToken, errorHandler };
