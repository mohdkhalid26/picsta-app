const { generateToken } = require("../middlewares");
const User = require("../models/user");
const API_URL = process.env.API_URL;
const fs = require("fs");
const path = require("path");

async function createUser(req, res) {
  try {
    const { body } = req;
    const { fullname, username, email, password, tagline } = body;

    if (!fullname || !username || !email || password.length < 6) {
      return res.status(400).json({ error: "Invalid input data" });
    }
    const isEmailAlreadyPresent = await User.findOne({ email });
    if (isEmailAlreadyPresent) {
      return res.status(409).json({ error: "Email already taken" });
    }
    const isUsernameAlreadyPresent = await User.findOne({ username });
    if (isUsernameAlreadyPresent) {
      return res.status(409).json({ error: "Username already taken" });
    }
    // Create and save the user
    const newUser = new User(body);
    const savedUser = await newUser.save();

    // Generate token
    const payload = { id: savedUser.id, username: savedUser.username };
    const token = generateToken(payload);

    // Set the token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res
      .status(201)
      .json({ message: "User Created Successfully", user: savedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetUserProfile(req, res) {
  try {
    // Find all candidates and select only the name and party fields, excluding _id
    const payload = req.jwtPayload;
    if (!payload || !payload.id) {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    const id = payload.id;
    const user = await User.findById(id);

    // Return the list of candidates
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUploadUserImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { id } = req.jwtPayload;

  try {
    // Find the user to get the old image path
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the old image if it exists
    if (user.profileImage) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(user.profileImage)
      );
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
    }

    // Update the user's profile image
    user.profileImage = `${API_URL}/uploads/${req.file.filename}`;
    await user.save();

    return res.status(200).json({
      message: "Image uploaded and saved successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading image", error });
  }
}

async function handleUpdateUserImage(req, res) {
  const { id } = req.jwtPayload;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "Profile image file is required" });
  }

  try {
    // Find the user to get the old image path
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the old image if it exists
    if (user.profileImage) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(user.profileImage)
      );
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
    }

    // Update the user's profile image
    user.profileImage = `${API_URL}/uploads/${file.filename}`;
    await user.save();

    return res.status(200).json({
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating profile image", error });
  }
}

// Auth Controllers
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      tagline: user.tagline,
    };
    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleCheckAuth(req, res) {
  if (req.jwtPayload) {
    try {
      const user = await User.findById(req.jwtPayload.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        isAuthenticated: true,
        user: {
          id: user._id,
          fullname: user.fullname,
          username: user.username,
          tagline: user.tagline,
          profileImage: user.profileImage || "/no-dp.png",
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user data" });
    }
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
}

async function handleLogout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}

async function handleUpdateProfilePwd(req, res) {
  try {
    const { id } = req.jwtPayload;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current password and new password are required" });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the current password is correct
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("User profile updated successfully");
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleImageUpload(req, res) {
  try {
    const payload = req.jwtPayload;
    const filePath = req.file.path;
    // Validate request
    if (!filePath || !req.body.caption) {
      return res.status(400).json({ error: "File and caption are required." });
    }

    const userId = payload.id; // Assuming req.user is set by your JWT middleware
    const imageUrl = `/uploads/${req.file.filename}`;

    // Find user and update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update images array
    user.images.push({ url: imageUrl, caption: req.body.caption });
    await user.save();

    res.status(200).json({
      message: "Image uploaded successfully.",
      imageUrl,
      caption: req.body.caption,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
  createUser,
  loginUser,
  handleCheckAuth,
  handleLogout,
  handleUpdateProfilePwd,
  handleGetUserProfile,
  handleImageUpload,
  handleUpdateUserImage,
  handleUploadUserImage,
};

// Keep a consistent structure in your responses. For example:
// {
//   "status": "success",
//   "data": {
//     // your data here
//   },
//   "message": "Your message here"
// }
