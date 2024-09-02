const express = require("express");
const router = express.Router();
const {
  getStores,
  createStore,
  updateStore,
  deleteStore,
} = require("../controllers/pickUpStoreController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.route("/").get(protect, getStores).post(protect, adminOnly, createStore);

router
  .route("/:id")
  .put(protect, adminOnly, updateStore)
  .delete(protect, adminOnly, deleteStore);

module.exports = router;
