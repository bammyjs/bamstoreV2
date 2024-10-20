import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/feeds/`;

// Create feed post
const createFeedPost = async (feedData) => {
  const response = await axios.post(API_URL, feedData);
  return response.data;
};

// Get feed post
const getFeedPost = async () => {
  const response = await axios.get(API_URL);
  
  return response.data;
};
// like feed post
const likeFeedPost = async (id) => {
  const response = await axios.post(API_URL + id + "/like");
  return response.data;
};
// comment feed post
const commentFeedPost = async (id, comment) => {
  const response = await axios.post(`${API_URL}${id}/${comment}`);
  return response.data;
};

// Delete feed post
const deleteFeedPost = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const feedPostService = {
  createFeedPost,
  getFeedPost,
  deleteFeedPost,
  likeFeedPost,
  commentFeedPost,
};

export default feedPostService;
