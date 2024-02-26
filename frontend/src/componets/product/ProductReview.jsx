import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import {
  reviewProduct,
  deleteReview,
  updateReview,
  getProduct,
} from "../../redux/features/product/productSlice";

const ProductReview = ({ productId }) => {
  console.log("ProductReview:", productId);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const { product, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    const existingReview = product?.ratings?.find(
      (rev) => rev.userID === user._id
    );
    if (existingReview) {
      setRating(existingReview.star);
      setReviewText(existingReview.review);
      setIsEditing(true);
      setEditingReviewId(existingReview._id);
    }
  }, [product, user]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating <= 0 || reviewText.trim() === "") {
      toast.error("Please provide both a rating and a review.");
      return;
    }

    const reviewData = {
      star: rating,
      review: reviewText,
      reviewDate: new Date().toISOString(),
    };

    if (isEditing && editingReviewId) {
      dispatch(
        updateReview({
          id: editingReviewId,
          formData: { ...reviewData, userID: user._id },
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Review updated successfully");
          setIsEditing(false);
          dispatch(getProduct(productId));
        })
        .catch((error) => toast.error(error.message));
    } else {
      dispatch(reviewProduct({ id: productId, formData: reviewData }))
        .unwrap()
        .then(() => {
          toast.success("Review added successfully");
          dispatch(getProduct(productId));
        })
        .catch((error) => toast.error(error.message));
    }

    setRating(0);
    setReviewText("");
  };

  const handleDelete = async () => {
    if (editingReviewId) {
      dispatch(
        deleteReview({ id: editingReviewId, formData: { userID: user._id } })
      )
        .unwrap()
        .then(() => {
          toast.success("Review deleted successfully");
          setIsEditing(false);
          setEditingReviewId(null);
          dispatch(getProduct(productId));
        })
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <div class="w-full  p-6 flex flex-col justify-center ">
      <div class="py-3  sm:mx-auto">
        <div class="bg-gray-bk min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div class="px-12 py-5">
            <h2>{isEditing ? "Edit Your Review" : "Write a Review"}</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            class="bg-gray-200 w-full flex flex-col items-center"
          >
            <div class="w-full flex flex-col items-center py-6 space-y-3">
              <span className="text-lg text-gray-800">
                How will you rate this Product?
              </span>
              <ReactStars
                count={5}
                size={50}
                a11y={true}
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                onChange={handleRatingChange}
                value={rating}
              />
            </div>
            <div class="w-3/4 flex flex-col">
              <textarea
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="3"
                placeholder="Your review message here..."
                className="p-4 text-gray-500 rounded-xl resize-none"
              >
                Leave a message, if you want
              </textarea>
              <div className="w-full flex items-center justify-center gap-4">
                <button
                  className="p-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                  type="submit"
                >
                  {isEditing ? "Update Review" : "Submit Review"}
                </button>
                {isEditing && (
                  <button
                    className="p-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>

            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
