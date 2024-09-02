import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/`;

// Fetch all stores
const getStores = async () => {
  const response = await axios.get(API_URL + "pickupstore");
  return response.data;
};

// Create Category
const createStore = async (formData) => {
  const response = await axios.post(API_URL + "pickupstore", formData);
  return response.data;
};

// Update a store
const updateStore = async ({ id, formData }) => {
  const response = await axios.put(`${API_URL}pickupstore/${id}`, formData);
  return response.data;
};
// Delete a store
const deleteStore = async (id) => {
  const response = await axios.delete(`${API_URL}pickupstore/${id}`);

  return response.data;
};
const pickUpStoreService = {
  getStores,
  createStore,
  updateStore,
  deleteStore,
};

export default pickUpStoreService;
