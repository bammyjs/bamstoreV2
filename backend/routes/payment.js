const express = require("express");
const router = express.Router();
const payWithFlutterwave = require("../controllers/orderController"); // Import your Flutterwave service

// Payment initialization route
router.post("/init", async (req, res) => {
  const { amount, email, phone, userID } = req.body;
  console.log("Received Payment Init Request: ", req.body);

//   if (!orderId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Order ID is required" });
//   }

  try {
    const response = await payWithFlutterwave(amount, email, phone, orderId);
    if (response.success) {
      res.json({ success: true, paymentLink: response.paymentLink });
    } else {
      res.status(400).json({ success: false, message: response.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error during payment initialization",
      });
  }
});

module.exports = router;
