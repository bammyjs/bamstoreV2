const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { calculateTotalPrice } = require("../utils");
const Product = require("../models/productModel");
const axios = require("axios");
const User = require("../models/userModel");
// const Transaction = require("../models/transactionModel");
const { orderSuccessEmail } = require("../emailTemplates/orderTemplate");
const sendEmail = require("../utils/sendEmail");
const { orderUpdateEmail } = require("../emailTemplates/orderUpdate");
const flw = require("../utils/flutterwaveService");
const { default: mongoose } = require("mongoose");

// createOrder controller with improvements
// const createOrder = asyncHandler(async (req, res) => {
//   console.log("createOrder called");
//   const {
//     orderDate,
//     orderTime,
//     orderAmount,
//     orderStatus,
//     cartItems,
//     shippingAddress,
//     paymentMethod,
//     deliveryMethod,
//     selectedStore,
//   } = req.body;

//   if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
//     return res.status(400).json({ message: "Order data missing!!!" });
//   }

//   // Update product sales count and quantity
//   await Promise.all(
//     cartItems.map(async (item) => {
//       // Update product quantity globally
//       await Product.findByIdAndUpdate(item._id, {
//         $inc: { salesCount: item.cartQuantity, quantity: -item.cartQuantity },
//       });

//       // Find the specific store and update its quantity
//       const store = item.storeId;
//       if (store) {
//         await Product.updateOne(
//           { _id: item._id, "stores.store": store },
//           { $inc: { "stores.$.quantity": -item.cartQuantity } }
//         );
//       } else {
//         console.warn(
//           `No matching store found for product ${item._id} with storeId ${store}`
//         );
//       }
//     })
//   );

//   let finalOrderStatus =
//     paymentMethod === "pay_online" ? "Pending" : "Reserved";
//   let finalShippingDetails = shippingAddress;

//   if (deliveryMethod === "inStorePickup" && selectedStore) {
//     finalShippingDetails = {
//       storeName: selectedStore.storeName,
//       storeAddress: selectedStore.address,
//       storeCity: selectedStore.city,
//       storeState: selectedStore.state,
//       storeContact: selectedStore.contactPerson.phone,
//     };
//   }

//   // Ensure the user ID is a string
//   const userIdStr = req.user._id.toString();

//   // Generate a unique transaction reference (tx_ref) for the order
//   const tx_ref = `bamstore_${Date.now()}_${userIdStr}`;

//   console.log("tx_ref from order creation:", tx_ref); // Log tx_ref
//   console.log("Request User:", userIdStr);

//   // Create Order
//   const user = await User.findById(req.user._id).select("-password");
//   if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
//     return res.status(400).json({ message: "Invalid or missing user ID." });
//   }

//   const order = await Order.create({
//     user: userIdStr,
//     orderDate,
//     orderTime,
//     orderStatus: finalOrderStatus,
//     cartItems,
//     shippingAddress: finalShippingDetails,
//     paymentMethod,
//     orderAmount,
//     tx_ref,
//     paymentStatus: "pending",
//   });

//   // Handle Flutterwave payment
//   if (paymentMethod === "pay_online") {
//     try {
//       const paymentResponse = await payWithFlutterwave(
//         userIdStr,
//         cartItems, // assuming cartItems are passed
//         tx_ref
//       );

//       console.log("Payment Response:", paymentResponse);

//       if (!paymentResponse.success) {
//         return res.status(400).json({ message: paymentResponse.message });
//       }

//       await order.save();

//       // Get the link for payment from the Flutterwave response
//       const paymentLink = paymentResponse.data.link;

//       return res.status(201).json({
//         message: "Order Created. Redirecting to payment...",
//         payment_link: paymentLink,
//         tx_ref: tx_ref,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: "Payment initialization failed",
//         error: error.message,
//       });
//     }
//   } else {
//     // Complete order for non-online payments
//     await order.save();

//     // Send order success email
//     // const user = await User.findById(req.user._id).select("-password");
//     const emailContent = orderSuccessEmail(
//       user.firstName,
//       cartItems,
//       finalOrderStatus,
//       orderDate,
//       finalShippingDetails.address,
//       finalShippingDetails.city,
//       finalShippingDetails.state,
//       finalShippingDetails.zipCode,
//       finalShippingDetails.country,
//       finalShippingDetails.phone,
//       orderAmount
//     );
//     await sendEmail("Bamstore Order Placed", user.email, emailContent);

//     res.status(201).json({ message: "Order Created", order, tx_ref });
//   }
// });

const createOrder = asyncHandler(async (req, res) => {
  console.log("createOrder called");

  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    deliveryMethod,
    selectedStore,
  } = req.body;

  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: "Order data missing!!!" });
  }

  // Update product sales count and quantity
  await Promise.all(
    cartItems.map(async (item) => {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { salesCount: item.cartQuantity, quantity: -item.cartQuantity },
      });

      // Update specific store quantity if applicable
      const store = item.storeId;
      if (store) {
        await Product.updateOne(
          { _id: item._id, "stores.store": store },
          { $inc: { "stores.$.quantity": -item.cartQuantity } }
        );
      } else {
        console.warn(
          `No matching store found for product ${item._id} with storeId ${store}`
        );
      }
    })
  );

  // Define Order Status and Shipping Details
  let finalOrderStatus =
    paymentMethod === "pay_online" ? "Pending" : "Reserved";
  let finalShippingDetails = shippingAddress;

  if (deliveryMethod === "inStorePickup" && selectedStore) {
    finalShippingDetails = {
      storeName: selectedStore.storeName,
      storeAddress: selectedStore.address,
      storeCity: selectedStore.city,
      storeState: selectedStore.state,
      storeContact: selectedStore.contactPerson.phone,
    };
  }

  // Generate a unique transaction reference (tx_ref) for the order
  const userIdStr = req.user._id.toString();
  const tx_ref = `bamstore_${Date.now()}_${userIdStr}`;

  console.log("tx_ref from order creation:", tx_ref); // Log tx_ref
  console.log("Request User:", userIdStr);

  // Create Order
  const order = await Order.create({
    user: userIdStr,
    orderDate,
    orderTime,
    orderStatus: finalOrderStatus,
    cartItems,
    shippingAddress: finalShippingDetails,
    paymentMethod,
    deliveryMethod,
    orderAmount,
    tx_ref,
    paymentStatus: "pending",
  });

  if (paymentMethod === "payAtStore") {
    try {
       // Send order success email
    const user = await User.findById(req.user._id).select("-password");
    const emailContent = orderSuccessEmail(
      user.firstName,
      cartItems,
      finalOrderStatus,
      orderDate,
      finalShippingDetails.address,
      finalShippingDetails.city,
      finalShippingDetails.state,
      finalShippingDetails.zipCode,
      finalShippingDetails.country,
      finalShippingDetails.phone,
      orderAmount
    );
    console.log("Generated email content:", emailContent);
    await sendEmail("Bamstore Order Placed", user.email, emailContent);
    console.log(`Email sent: ${user.email}`);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
    return res.status(201).json({ message: "Order Created", order });
  }

  // Handle Flutterwave payment immediately after order creation
  if (paymentMethod === "pay_online") {
    try {
      // Calculate the total amount based on items in cart
      const products = await Product.find(); // Fetch products if needed
      const orderAmount = calculateTotalPrice(products, cartItems); // Calculate total price from items

      // Define the payload for Flutterwave
      const payload = {
        tx_ref: tx_ref,
        amount: orderAmount,
        currency: "NGN",
        redirect_url: `${process.env.CLIENT_URL}/verify-payment`, // Your frontend's payment verification URL
        customer: {
          email: req.user.email,
          phone_number: req.user.phone || "08012345678",
          name: `${req.user.firstName} ${req.user.lastName}`,
        },
        customizations: {
          title: "Bamstore Online Store",
          description: "Payment for products",
          logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
        },
      };

      // Make the request to Flutterwave
      const url = "https://api.flutterwave.com/v3/payments";
      const { data } = await axios.post(url, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      });

      console.log("Flutterwave response:", data);

      if (data && data.status === "success" && data.data && data.data.link) {
        console.log("Payment link generated successfully:", data.data.link);

        return res.status(201).json({
          message: data,
          payment_link: data.data.link,
          tx_ref: tx_ref,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Failed to create payment link with Flutterwave" });
      }
    } catch (error) {
      console.error("Error in payment initialization: ", error.message);
      return res.status(500).json({
        message: "Payment initialization failed",
        error: error.message,
      });
    }
  } else {
    await order.save();
   
    return res.status(201).json({ message: "Order Created", order, tx_ref });
  }
});

// Get all Orders
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");
    return res.status(200).json(orders);
  }
  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(orders);
});

// Get single Order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (
    order.user.toString() !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "customer"
  ) {
    return res.status(401).json({ message: "User not authorized" });
  }
  res.status(200).json(order);
});

const payWithFlutterwave = asyncHandler(async (userID, items, tx_ref) => {
  const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

  try {
    if (!isValidObjectId(userID)) {
      throw new Error("Invalid user ID format");
    }
    if (!userID) {
      throw new Error("userID is required");
    }
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("User not found");
    }

    // Calculate the total amount based on items in cart
    const products = await Product.find(); // Fetch products if needed
    const orderAmount = calculateTotalPrice(products, items); // Calculate total price from items

    // Define the payload for Flutterwave
    const payload = {
      tx_ref: tx_ref, // Unique transaction reference
      amount: orderAmount,
      currency: "NGN",
      redirect_url: "http://localhost:5173/verify-payment", // Your frontend's payment verification URL
      customer: {
        email: user.email,
        phone_number: user.phone || "08012345678",
        name: `${user.firstName} ${user.lastName}`,
      },
      customizations: {
        title: "Bamstore Online Store",
        description: "Payment for products",
        logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
      },
    };

    console.log("Payload to Flutterwave:", payload); // Log the payload

    console.log("tx_ref from paywithflw:", tx_ref);

    // Flutterwave API URL
    const url = "https://api.flutterwave.com/v3/payments";

    // Make the request to Flutterwave
    const { data } = await axios.post(url, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`, // Ensure your secret key is correct
      },
    });
    // Log the response to ensure it's correct
    // console.log("Flutterwave response:", data);

    // Send back the Flutterwave response
    return { success: true, data };
  } catch (error) {
    console.error("Error in payment initialization: ", error);
    return {
      success: false,
      message: "Server error during payment initialization",
      error: error.message,
    };
  }
});

const verifyFlwPayment = asyncHandler(async (req, res) => {
  const { transaction_id } = req.query; // Extract transaction_id from query params
  if (!transaction_id) {
    return res.status(400).json({ message: "Transaction ID is required" });
  }
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

  try {
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`, // Use the secret key correctly
      },
    });

    // Get the payment status and reference
    const { status, tx_ref, payment_type } = response.data.data;

    console.log("response:", response.data.data);
    console.log("status:", status);
    console.log("tx_ref:", response.data.data.tx_ref);

    const order = await Order.findOne({ tx_ref });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "successful") {
      // Update the order with the payment status and payment option
      order.paymentStatus = "completed";
      order.paymentOption = payment_type; // This is the actual payment method used

      await order.save();

      return res.status(200).json({
        message: "Payment verified successfully",
        orderId: order._id,
        paymentStatus: order.paymentStatus,
      });
    } else {
      return res.status(400).json({
        message: `Payment verification failed. Status: ${status}`,
        orderId: order._id,
        paymentStatus: order.paymentStatus,
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error.message);
    return res.status(500).json({
      message: "Payment verification error",
      error: error.message,
    });
  }
});

const getOrdersLast7Days = asyncHandler(async (req, res) => {
  const today = new Date();
  const last7Days = new Date(today.setDate(today.getDate() - 7));

  const orders = await Order.aggregate([
    { $match: { createdAt: { $gte: last7Days } } },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$orderAmount" },
        totalOrders: { $count: {} },
      },
    },
  ]);

  res.json(orders);
});

// Update Product
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);
  const user = await User.findById(req.user._id).select("-password");

  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true, runValidators: true }
  );

  const emailContent = orderUpdateEmail(
    user.firstName,
    updatedOrder.orderStatus,
    new Date(updatedOrder.orderDate).toLocaleDateString("en-US"),
    updatedOrder.orderAmount,
    updatedOrder.shippingAddress.address
    // `http://localhost:5173/order-preview/${updatedOrder._id}`
  );
  const subject = "Bamstore Order update";
  const send_to = user.email;
  // Send order receipt email
  await sendEmail(subject, send_to, emailContent);

  res.status(200).json({ message: "Order status updated" });
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  getOrdersLast7Days,
  updateOrderStatus,
  payWithFlutterwave,
  verifyFlwPayment,
};
