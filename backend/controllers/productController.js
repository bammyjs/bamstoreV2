const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const dotenv = require("dotenv");

//Create new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      image,
      regularPrice,
      color,
      features,
    } = req.body;

    //   Validation
    if (
      !name ||
      !category ||
      !brand ||
      !quantity ||
      !price ||
      !description ||
      !features ||
      !regularPrice
    ) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // Create Product
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      quantity,
      brand,
      price,
      description,
      image,
      regularPrice,
      color,
      features,
    });

    res.status(201).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Get all Products
const getProductsWithPage = asyncHandler(async (req, res) => {
  const pageSize = 8;
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

// Get all Products test 2

const getProducts = asyncHandler(async (req, res) => {
  try {
    const { searchQuery } = req.query; // Get the search query from the request

    let query = {};

    if (searchQuery) {
      // Use a regex to make a case-insensitive search across desired fields
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { brand: { $regex: searchQuery, $options: "i" } }, // Assuming 'brand' is a field
        { category: { $regex: searchQuery, $options: "i" } }, // Assuming 'category' is a field
        // Add more fields if necessary
      ];
    }
    const products = await Product.find(query).sort("-createdAt");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

// const filterProductsByCategory = asyncHandler(async (req, res) => {
//   const pageSize = 8;
//   const page = Number(req.query.pageNumber) || 1;

//   try {
//     const { category } = req.params;
//     const count = await Product.countDocuments({ category });
//     // Validate category if necessary

//     // Use exact match for category filtering
//     const products = await Product.find({ category })
//       .limit(pageSize)
//       .skip(pageSize * (page - 1))
//       .sort("-createdAt");

//     if (!products) {
//       res.status(404);
//       throw new Error("Products in this category not found");
//     }

//     res.json({ products, page, pages: Math.ceil(count / pageSize) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

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
    features,
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
      features,
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
  const { star, review } = req.body;
  const productId = req.params.id;
  const userId = req.user._id; // Assuming you have the user's ID available here

  if (!star || !review) {
    res.status(400);
    throw new Error("Star rating and review text are required.");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the user already reviewed the product
  const alreadyReviewed = product.ratings.find((r) => r.userID.equals(userId));
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed by this user");
  }

  const reviewEntry = {
    star,
    review,
    name: req.user.firstName, // Assuming you have user's name available
    userID: userId,
  };

  product.ratings.push(reviewEntry);
  await product.save();

  res.status(201).json({ message: "Review added" });
});

// Delete Product
const deleteReview = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id; // Assuming you have the user's ID available here

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Remove the review from the ratings array
  product.ratings = product.ratings.filter((r) => !r.userID.equals(userId));
  await product.save();

  res.status(200).json({ message: "Review deleted" });
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
  const { star, review } = req.body;
  const { productId, reviewId } = req.params;
  const userId = req.user._id; // Assuming you have the user's ID available here

  try {
    const updatedProduct = await Product.updateOne(
      { _id: productId, "ratings._id": reviewId },
      { $set: { "ratings.$.star": star, "ratings.$.review": review } }
    );

    if (updatedProduct.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Review not found or no update made." });
    }

    res.json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getProductsWithPage,
  // filterProductsByCategory,
};
