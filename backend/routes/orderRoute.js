const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  getOrdersLast7Days,
  updateOrderStatus,
  payWithFlutterwave,
  verifyFlwPayment,
} = require("../controllers/orderController");

router.get("/response", verifyFlwPayment);
router.post("/", protect, createOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.get("/", protect, getOrders);
router.get("/orders7days", protect, getOrdersLast7Days);
router.get("/:id", protect, getOrder);

router.post("/payWithFlutterwave", payWithFlutterwave);

module.exports = router;
