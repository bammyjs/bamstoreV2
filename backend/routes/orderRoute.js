const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  getOrdersLast7Days,
  updateOrderStatus,
  verifyFlwPayment,
  payWithFlutterwave,
} = require("../controllers/orderController");

// router.get("/response", verifyFlwPayment);
router.post("/", protect, createOrder);
router.post("/payWithFlutterwave", payWithFlutterwave);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.get("/verify-payment", verifyFlwPayment);
router.get("/", protect, getOrders);
router.get("/orders7days", protect, getOrdersLast7Days);
router.get("/:id", protect, getOrder);

// router.get("/payment-callback", handlePaymentCallback);


module.exports = router;
