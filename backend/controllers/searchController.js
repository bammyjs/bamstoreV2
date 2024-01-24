const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const dotenv = require("dotenv");

const searchProducts = asyncHandler(async (req, res) => {
  const { query, category, brand } = req.query;

  try {
    let queryObj = {};
    if (query) {
      queryObj = { $text: { $search: query } };
    }

    if (category) {
      queryObj.category = category;
    }

    if (brand) {
      queryObj.brand = brand;
    }

    const products = await Product.find(queryObj);
    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = {
  searchProducts,
};
