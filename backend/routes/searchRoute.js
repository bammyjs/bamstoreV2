const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/searchController");

// routes
router.get("/search", searchProducts);

module.exports = router;
