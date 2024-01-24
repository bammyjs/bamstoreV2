const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const dotenv = require("dotenv");

const filterProductsByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.query;

  try {
    const products = await Product.find({ brand });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const filterProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  filterProductsByBrand,
  filterProductsByCategory,
};
