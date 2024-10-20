import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoHeart,
  IoHeartOutline,
  IoChatboxOutline,
  IoShareSocial,
  IoCloseCircle,
} from "react-icons/io5";
import {
  getFeedPost,
  likeFeedPost,
  commentFeedPost,
} from "../../redux/features/feed/feedPostSlice";

const FeedList = () => {
  const dispatch = useDispatch();
  const { feeds, isLoading } = useSelector((state) => state.feeds);
  const user = useSelector((state) => state.auth.user);

  const [commentText, setCommentText] = useState("");
  const [selectedFeed, setSelectedFeed] = useState(null);

  // Fetch feed posts on component load
  useEffect(() => {
    dispatch(getFeedPost());
  }, [dispatch]);

  const handleLike = (feedId) => {
    if (!user) {
      alert("Please log in to like the post");
      return;
    }
    dispatch(likeFeedPost(feedId)); // No need to toggle a local like state
  };

  const handleComment = (e, feedId) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to comment");
      return;
    }
    if (commentText.trim() === "") return;

    dispatch(commentFeedPost({ id: feedId, comment: commentText }));
    setCommentText("");
  };

  const handleOpenComments = (feedId) => {
    setSelectedFeed(selectedFeed === feedId ? null : feedId);
    document.getElementById(feedId).showModal();
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="bg-primary loading loading-spinner loading-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {feeds.length === 0 ? (
        <p>No feeds available</p>
      ) : (
        feeds.map((feed) => (
          <div
            key={feed._id}
            className="relative w-full h-screen bg-light flex flex-col items-center gap-6"
          >
            <section className="container h-full text-dark w-full border-gray rounded-lg flex flex-col items-center md:justify-between max-w-7xl">
              <div className="relative h-fit bg-slate-500 w-full shadow-xl">
                <figure>
                  {feed.imageUrl && (
                    <img
                      className="w-full h-full object-cover aspect-[4/8] bg-slate-400"
                      src={feed.imageUrl}
                      alt="feeds"
                    />
                  )}
                </figure>
                <div className="absolute bottom-40 p-4 text-white w-full">
                  <div className="flex flex-col gap-4 items-end justify-end">
                    <span onClick={() => handleLike(feed._id)}>
                      {feed.likes?.includes(user?._id) ? (
                        <IoHeart size={"30px"} color="red" />
                      ) : (
                        <IoHeartOutline size={"30px"} />
                      )}
                      {feed.likes?.length || 0}
                    </span>
                    <span onClick={() => handleOpenComments(feed._id)}>
                      <IoChatboxOutline
                        size={"30px"}
                        onClick={() =>
                          document.getElementById(feed._id).showModal()
                        }
                      />
                      {feed.comments?.length || 0}
                    </span>
                    <>
                      <dialog
                        id={feed._id}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box text-light items-center">
                          <div className="flex"></div>
                          <h3 className="w-full text-center text-lg  border-b py-2 border-gray flex items-center justify-center">
                            Comments{" "}
                            <button
                              type="submit"
                              onClick={() =>
                                document.getElementById(feed._id).showModal()
                              }
                              className="w-full  flex place-content-end "
                            >
                              <IoCloseCircle size={"30px"} />
                            </button>
                          </h3>
                          <div className="w-full h-full my-4 overflow-auto">
                            {feed.comments?.map((comment, index) => (
                              <div key={index} className="mb-2">
                                <h4 className="text-base font-semibold">
                                  {comment.userName}
                                </h4>
                                <p>{comment.text}</p>
                              </div>
                            ))}
                          </div>
                          <form
                            method="dialog"
                            className="w-full flex justify-between gap-3 modal-backdrop"
                            onSubmit={(e) => handleComment(e, feed._id)}
                          >
                            <input
                              className="input text-light w-full"
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add a comment..."
                            />
                            <button type="submit" className="btn">
                              Comment
                            </button>
                          </form>
                        </div>
                      </dialog>
                    </>

                    <span
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${window.location.origin}/feed/${feed._id}`
                        )
                      }
                    >
                      <IoShareSocial size={"30px"} />
                    </span>
                  </div>
                  <h2 className="card-title backdrop-blur-0">{feed.title}</h2>
                  <p>{feed.description}</p>
                </div>
              </div>
              {/* {selectedFeed === feed._id && (
                
              )} */}
            </section>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedList;
