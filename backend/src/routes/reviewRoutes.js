const express = require("express");

const {
  addReview,
  getProductReviews,
  replyReview,
  getSimilarProducts,
  getTopRatedProducts
} = require("../controllers/reviewController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const router = express.Router();


// ADD REVIEW
router.post(
  "/",
  authMiddleware,
  addReview
);


// GET REVIEWS
router.get(
  "/:productId",
  getProductReviews
);


// ADMIN REPLY
router.put(
  "/reply/:reviewId",
  authMiddleware,
  adminMiddleware,
  replyReview
);


// SIMILAR PRODUCTS
router.get(
  "/similar/:productId",
  getSimilarProducts
);


// TOP PRODUCTS
router.get(
  "/top-products",
  getTopRatedProducts
);


module.exports = router;