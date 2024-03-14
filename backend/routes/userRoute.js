const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUsersLast7Days,
  getLoginStatus,
  updateUser,
  updatePhoto,
  getUsers,
  deleteUser,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/", getUsers);
router.get("/getUser", protect, getUser);
router.get("/getUsers7days", getUsersLast7Days);
router.get("/getLoginStatus", getLoginStatus);
router.delete("/:id", protect, adminOnly, deleteUser);
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:userId/:resetToken", resetPassword);

module.exports = router;
