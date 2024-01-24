const express = require("express");
const router = express.Router();
const { sortProducts } = require("../controllers/sortByController");

// routes
router.get("/sort", sortProducts);

module.exports = router;
