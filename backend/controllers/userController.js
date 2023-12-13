const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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
  });
  // generate token
  const token = generateToken(user._id);

  if (user) {
    const { _id, firstName, lastName, email, role, address } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //   secure: true,
      //   sameSite: none,
    });

    // send user info
    res.status(201).json({
      _id,
      firstName,
      lastName,
      email,
      role,
      token,
      address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user date");
  }

  res.send("Register User...");
});

//Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Add email and Password to Login");
  }
  // check if user exit
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  // check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //Generate Token

  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //   secure: true,
      //   sameSite: none,
    });
    // send user info
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    //   secure: true,
    //   sameSite: none,
  });
  return res.json({ message: "successfully Logout" });
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
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
