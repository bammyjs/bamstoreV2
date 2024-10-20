// src/components/FeedPost/FeedPostForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedPost } from "../../redux/features/feed/feedPostSlice";

const FeedPostForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.feed);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const { title, description, imageUrl } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && imageUrl) {
      dispatch(createFeedPost(formData));
    }
  };

  return (
    <div className="p-4 border border-gray rounded-md shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Create a New Feed Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default FeedPostForm;
