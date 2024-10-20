// controllers/feedPostController.js
const FeedPost = require("../models/feedPostModel");
const asyncHandler = require("express-async-handler");

// @desc    Get all feed posts
// @route   GET /api/feeds
// @access  Public
const getAllFeedPosts = asyncHandler(async (req, res) => {
  const posts = await FeedPost.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Create a new feed post
// @route   POST /api/feeds
// @access  Private (User must be logged in)
const createFeedPost = asyncHandler(async (req, res) => {
  const { title, description, imageUrl } = req.body;
  if (!title || !description || !imageUrl) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const post = new FeedPost({
    title,
    description,
    imageUrl,
    user: req.user._id,
  });

  await post.save();
  res.status(201).json(post);
});

// @desc    Like a feed post
// @route   POST /api/feeds/:id/like
// @access  Private
const likeFeedPost = asyncHandler(async (req, res) => {
  const post = await FeedPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Toggle like
  if (post.likes.includes(req.user._id)) {
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
  } else {
    post.likes.push(req.user._id);
  }

  await post.save();
  res.status(200).json({ likes: post.likes.length });
});

// @desc    Add a comment to a feed post
// @route   POST /api/feeds/:id/comment
// @access  Private
// controllers/feedPostController.js

const commentFeedPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const post = await FeedPost.findById(id).populate("user", "firstName lastName");

  if (!post) {
    res.status(404);
    throw new Error("Feed post not found");
  }

  // Extract the user's full name from the request user object
  const userFullName = `${req.user.firstName} ${req.user.lastName}`;

  const newComment = {
    user: req.user._id,
    userName: userFullName, // Store the user's name in the comment
    text: comment,
    createdAt: new Date(),
  };

  post.comments.push(newComment);
  await post.save();

  // Populate the comments with user details
  await post.populate("comments.user", "firstName lastName");

  res.status(201).json({ id, comments: post.comments });
});


// @desc    Delete a feed post (Admin only)
// @route   DELETE /api/feeds/:id
// @access  Private/Admin
const deleteFeedPost = asyncHandler(async (req, res) => {
  const post = await FeedPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Only allow the user who created the post or an admin to delete
  if (
    post.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(401);
    throw new Error("User not authorized to delete this post");
  }

  await post.remove();
  res.status(200).json({ message: "Post removed" });
});

module.exports = {
  getAllFeedPosts,
  createFeedPost,
  likeFeedPost,
  commentFeedPost,
  deleteFeedPost,
};
