const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// protect middleware
const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      return next(new Error("Not authorized, please login"));
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      return next(new Error("User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    next(new Error("Not authorized, please login"));
  }
});

// adminOnly middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    next(new Error("Access denied. Not authorized"));
  }
};

module.exports = {
  protect,
  adminOnly,
};

// const admin = (req, res, next) => {
//   auth(req, res, () => {
//     if (req.user.admin) {
//       next();
//     } else {
//       res.status(401);
//       throw new Error("Access denied. not authorized");
//     }
//   });
// };
