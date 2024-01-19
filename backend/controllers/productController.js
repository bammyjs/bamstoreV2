const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const dotenv = require("dotenv");
const cloudinary = require("../utils/cloudinary");

// set your env variable CLOUDINARY_URL or set the following configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    regularPrice,
    color,
    image,
  } = req.body;

  //   Validation
  if (
    !name ||
    !category ||
    !sku ||
    !regularPrice ||
    !color ||
    !brand ||
    !quantity ||
    !price ||
    !description
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  try {
    let imageUrl = null;
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "bamstore",
      });
      imageUrl = uploadRes.url; // Store only the URL
    }
    const product = new Product({
      user: req.user.id, // Uncomment if you're associating product with a user
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      regularPrice,
      color,
      image: imageUrl, // Use the Cloudinary image URL
    });

    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments();
  const products = await Product.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-createdAt");

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product doesn't exist

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product doesn't exist

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      brand,
      quantity,
      price,
      description,
      image,
      regularPrice,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

// Review Product
const reviewProduct = asyncHandler(async (req, res) => {
  // star, review
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update Product
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.firstName,
    userID: req.user._id,
  });
  product.save();

  res.status(200).json({ message: "Product review added." });
});

// Delete Product
const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const newRatings = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });
  console.log(newRatings);
  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Product rating deleted!!!." });
});

// Edit Review
const updateReview = asyncHandler(async (req, res) => {
  const { star, review, reviewDate, userID } = req.body;
  const { id } = req.params;

  // validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match user to review
  if (req.user._id.toString() !== userID) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update Product review
  const updatedReview = await Product.findOneAndUpdate(
    { _id: product._id, "ratings.userID": mongoose.Types.ObjectId(userID) },
    {
      $set: {
        "ratings.$.star": Number(star),
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );

  if (updatedReview) {
    res.status(200).json({ message: "Product review updated." });
  } else {
    res.status(400).json({ message: "Product review NOT updated." });
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};
