const express = require("express");

const {
  addWishlist,
  getUserWishlist,
  removeWishlist
} = require("../controllers/wishlistController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const router = express.Router();


// ADD WISHLIST
router.post(
  "/",
  authMiddleware,
  addWishlist
);


// GET USER WISHLIST
router.get(
  "/",
  authMiddleware,
  getUserWishlist
);


// REMOVE WISHLIST
router.delete(
  "/:wishlistId",
  authMiddleware,
  removeWishlist
);


module.exports = router;