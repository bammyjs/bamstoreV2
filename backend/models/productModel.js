const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  star: { type: Number, required: true },
  review: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
  name: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
      default: "As seen",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    regularPrice: {
      type: Number,
      // required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    features: {
      type: String,
      required: [true, "Please add a features"],
      trim: true,
    },
    salesCount: {
      type: Number,
      default: 0,
      trim: true,
    },
    image: {
      type: [Object],
    },
    ratings: {
      type: [reviewSchema],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
