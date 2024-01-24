const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/searchController");

// routes
router.get("/search", searchProducts);
// router.get('/search', (req, res) => {
//     req.searchProducts;
//     res.status(404)
//   });

module.exports = router;
