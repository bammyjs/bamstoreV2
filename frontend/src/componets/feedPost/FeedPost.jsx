// src/components/FeedPost/FeedList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPost } from "../../redux/features/feed/feedPostSlice";

const FeedPost = () => {
  const dispatch = useDispatch();
  const { feeds, isLoading } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeedPost());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading feeds...</div>;
  }

  return (
    <div className="space-y-6">
      {feeds.length === 0 ? (
        <p>No feeds available</p>
      ) : (
        feeds.map((feed) => (
          <div
            key={feed._id}
            className="p-4 border border-gray rounded-md shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{feed.title}</h2>
            <p>{feed.description}</p>
            {feed.imageUrl && (
              <img
                src={feed.imageUrl}
                alt={feed.title}
                className="my-4 w-full h-64 object-cover rounded"
              />
            )}
            <div className="flex items-center space-x-4 mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                Like {feed.likes.length}
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Comment ({feed.comments.length})
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded">
                Share
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedPost;
