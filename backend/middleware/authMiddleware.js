const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new Error("Not authorized, please login"));
  }
});

//for Admin Only

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Access denied. not authorized");
  }
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

module.exports = {
  protect,
  adminOnly,
};
