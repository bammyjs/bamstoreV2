import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Updated to include token
// const reviewProduct = async (id, formData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`, // Include the token in the authorization header
//     },
//   };
//   const response = await axios.patch(
//     `${API_URL}review/${id}`,
//     formData,
//     config
//   );
//   return response.data;
// };
// Review Product
const reviewProduct = async (productId, formData) => {
  const response = await axios.patch(`${API_URL}review/${productId}`, formData);
  return response.data.message;
};

// Review Product
const deleteReview = async (productId, userId) => {
  const response = await axios.delete(`${API_URL}deleteReview/${productId}`, {
    userId,
  });
  return response.data.message;
};

// Review Product
const updateReview = async (productId, reviewId, formData) => {
  const response = await axios.patch(
    `${API_URL}updateReview/${productId}`,
    reviewId,
    formData
  );
  return response.data.message;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};

export default productService;
