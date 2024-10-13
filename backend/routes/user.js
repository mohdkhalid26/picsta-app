const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const upload = require("../config/multerConfig");
const {
  createUser,
  loginUser,
  handleCheckAuth,
  handleLogout,
  handleUpdateProfilePwd,
  handleGetUserProfile,
  handleImageUpload,
  handleUploadUserImage,
  handleUpdateUserImage,
} = require("../controllers/user");
const { jwtAuthMiddleware } = require("../middlewares");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save with a unique filename
  },
});

const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL || "http://localhost:5173",
};

router.use(cors(corsOptions));

// Route for user signup
router.route("/signup").post(createUser);

// Route for user login
router.route("/login").post(loginUser);

// Route for checking Auth
router.route("/check-auth").get(jwtAuthMiddleware, handleCheckAuth);

// Route for logout
router.route("/logout").get(handleLogout);

// Route for Resetting Password
router
  .route("/update/password")
  .patch(jwtAuthMiddleware, handleUpdateProfilePwd);

// Route for Getting UserProfile
router.route("/profile").get(jwtAuthMiddleware, handleGetUserProfile);

// Route for Uploading Profile Image
router
  .route("/profile/uploadImage")
  .post(jwtAuthMiddleware, upload.single("image"), handleUploadUserImage);

// Route for Updating Profile Image
router
  .route("/profile/updateImage")
  .patch(jwtAuthMiddleware, upload.single("image"), handleUpdateUserImage);

// Route for uploading Feed-post images
router.post(
  "/upload",
  jwtAuthMiddleware,
  upload.single("image"),
  handleImageUpload
);

module.exports = router;
