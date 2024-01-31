const express = require("express");
const router = express.Router();
const {
  filterProductsByCategory,
  filterProductsByBrand,
} = require("../controllers/filterController");

// routes
router.get("/", filterProductsByBrand);
router.get("/", filterProductsByCategory);

module.exports = router;
