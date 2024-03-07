const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const moment = require("moment");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
  sendVerificationMail,
  sendResetMail,
} = require("../emailTemplates/sendVerificationMail");
const Token = require("../models/passWordResetModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //validate request
  if (!email || !password || !firstName || !lastName) {
    res.status(400);
    throw new Error("please fill in all required field");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 character");
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });

  if (user) {
    try {
      const emailContent = sendVerificationMail(
        user.firstName,
        user.emailToken
      );
      const subject = "Verify your Email";
      const send_to = user.email;
      // Send verification email
      await sendEmail(subject, send_to, emailContent);
      // Generate token
      const token = generateToken(user._id);

      // Send user info along with cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true, // Require HTTPS
        sameSite: "None", // Allow cross-site usage
        expires: new Date(Date.now() + 1000 * 86400),
      });

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token, // Include token in the JSON response
      });
    } catch (error) {
      // Handle any errors that occur during the email sending process
      console.error("Failed to send verification email:", error);
      res.status(500).json({ message: "Failed to send verification email." });
    }
  } else {
    res.status(400).throw(new Error("Invalid user data."));
  }
});

//Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password to login.");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist.");
  }
  console.log(`User verified status: ${user.isVerified}`);
  // Ensure the user has verified their email
  if (!user.isVerified) {
    res.status(401); // 401 Unauthorized is more suitable for login failures
    throw new Error("Please verify your email before logging in.");
  }

  console.log("Provided password:", password);
  console.log("Stored hashed password:", user.password);
  // Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  console.log("Password is correct:", passwordIsCorrect);
  if (!passwordIsCorrect) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
  // Generate Token
  const token = generateToken(user._id);
  // Note: Since you're using httpOnly cookies, ensure your frontend can handle this appropriately
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    secure: true, // Require HTTPS
    sameSite: "None", // Allow cross-site usage
  });

  // Send user info (excluding password)
  const newUser = await User.findById(user._id).select("-password");
  res.status(200).json(newUser);
});

//verify email address

const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const { emailToken } = req.body;
    if (!emailToken)
      return res.status(400).json({ message: "Invalid email token" });

    const user = await User.findOne({ emailToken: emailToken });
    if (!user)
      return res
        .status(404)
        .json({ message: "Email verification failed, invalid token!" });

    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    console.log("Received token:", emailToken);

    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
      isVerified: user.isVerified,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    secure: true, // Require HTTPS
    sameSite: "None", // Allow cross-site usage
    expires: new Date(0),
    // secure: true,
    // sameSite: none,
  });
  return res.json({ message: "successfully Logout" });
});

//get all user

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();
  const users = await User.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-createdAt");

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// get user

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

const getUsersLast7Days = asyncHandler(async (req, res) => {
  const today = new Date();
  const last7Days = new Date(today.setDate(today.getDate() - 7));

  const userCount = await User.countDocuments({
    createdAt: { $gte: last7Days },
  });

  res.json({ totalNewUsers: userCount });
});

//get login status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Setting expiration to 1 hour from now in UTC
  // const expiresAt = moment().add(1, "hours").utc().toDate();

  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${user._id}/${resetToken}`;
  // Reset Email

  try {
    const emailContent = sendResetMail(user.firstName, resetUrl);
    const subject = "Password Reset ";
    const send_to = user.email;
    // Send reset email
    await sendEmail(subject, send_to, emailContent);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, resetToken } = req.params;
  console.log("UserId from URL:", userId);
  console.log("ResetToken from URL:", resetToken);
  const { password } = req.body;
  // Then, hash the resetToken to match the hash stored in the database
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log("Hashed Token:", hashedToken);

  // Find the token in the database
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  user.password = password;
  await user.save();

  // Optionally, remove the reset token from the database
  await userToken.remove();

  try {
    // Create email content
    const send_to = user.email;
    const subject = "Your Password Has Been Reset";
    const emailBody = `
      <h1>Password Reset Successfully</h1>
      <p>Your password has been successfully reset. You can now login with your new password.</p>
    `;

    // Send confirmation email to user
    await sendEmail(send_to, subject, emailBody);

    // Return success response
    res.status(200).json({
      message:
        "Password reset successfully. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Failed to send password reset confirmation email:", error);
    // Even if email fails, still return the success response for password reset
    // Adjust according to your error handling policy
    res.status(200).json({
      message:
        "Password reset successfully, but failed to send confirmation email.",
    });
  }
});

// delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).json(deleteUser);
  } else {
    res.status(404);
    throw new Error("can't delete user");
  }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Deconstructing for easier access
  const {
    firstName,
    lastName,
    phone,
    address,
    state,
    country,
    oldPassword,
    newPassword,
  } = req.body;

  // Update basic user information
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  user.state = state || user.state;
  user.country = country || user.country;

  // Optional password change
  if (oldPassword && newPassword) {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password does not match." });
    }
    user.password = newPassword; // The pre-save hook will handle hashing
  }

  await user.save();

  res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    state: user.state,
    country: user.country,
    // other fields as needed, excluding sensitive ones like password
  });
});

//update photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUser,
  getUsersLast7Days,
  deleteUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
};
