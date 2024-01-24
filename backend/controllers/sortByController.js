const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const dotenv = require("dotenv");

const sortProducts = asyncHandler(async (req, res) => {
  const { sortBy, sortOrder } = req.query;

  try {
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const products = await Product.find().sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  sortProducts,
};
