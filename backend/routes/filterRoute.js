const express = require("express");
const router = express.Router();
const {
  filterProductsByCategory,
  filterProductsByBrand,
} = require("../controllers/filterController");

// routes
router.get("/filterByBrand", filterProductsByBrand);
router.get("/filterByCategory", filterProductsByCategory);

module.exports = router;
