// models/FeedPost.js
const mongoose = require("mongoose");

const FeedPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title for the feed post"],
    },
    description: {
      type: String,
      required: [true, "Please add a description for the feed post"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: {
          type: String,
          required: false, // Store the user's name directly in the comment
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedPost", FeedPostSchema);
