const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
  sendVerificationMail,
} = require("../emailTemplates/sendVerificationMail");

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
  // Await the sending of the verification email
  // const cc = "bayodegbenga@gmail.com@gmail.com";

  if (user) {
    try {
      const emailContent = sendVerificationMail(
        user.firstName,
        user.emailToken
      );
      const subject = "Veriy your Email";
      const send_to = user.email;
      // Send verification email
      await sendEmail(subject, send_to, emailContent);
      // Generate token
      const token = generateToken(user._id);

      // Send user info along with cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        // secure: true, // Uncomment this in production if using HTTPS
        sameSite: "None", // Make sure this is capitalized correctly
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

//Login user
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

  // Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
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
    // Secure and SameSite attributes should be set based on your requirements and environment
    // secure: true,
    // sameSite: 'None',
  });

  // Send user info (excluding password)
  const newUser = await User.findById(user._id).select("-password");
  res.status(200).json(newUser);
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
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
  if (user) {
    const { firstName, lastName, phone, address } = user;
    user.firstName = req.body.firstName || firstName;
    user.lastName = req.body.lastName || lastName;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
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
};
