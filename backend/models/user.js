const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  dateUploaded: {
    type: Date,
    default: Date.now,
  },
});

// Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    images: [imageSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const person = this;

  // Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Override the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    // Actually compare hoga ese ki purane password se hash nikal ke ,new password me hash mix
    //  karega,then compare krega saved hashpassword se
    return isMatch;
  } catch (error) {}
};

const User = mongoose.model("User", userSchema);
module.exports = User;
