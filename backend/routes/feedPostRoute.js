// routes/feedPostRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllFeedPosts,
  createFeedPost,
  likeFeedPost,
  commentFeedPost,
  deleteFeedPost,
} = require("../controllers/feedPostController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllFeedPosts);

// Protected routes (User must be logged in)
router.post("/", protect, createFeedPost);
router.post("/:id/like", protect, likeFeedPost);
router.post("/:id/comment", protect, commentFeedPost);

// Admin-only route for deleting posts
router.delete("/:id", protect, adminOnly, deleteFeedPost);

module.exports = router;
