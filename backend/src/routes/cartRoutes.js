const express = require("express");

const {
  addToCart,
  getUserCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem
} = require("../controllers/cartController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const router = express.Router();


// ADD TO CART
router.post(
  "/",
  authMiddleware,
  addToCart
);


// GET USER CART
router.get(
  "/",
  authMiddleware,
  getUserCart
);


// INCREASE QUANTITY
router.put(
  "/increase/:cartId",
  authMiddleware,
  increaseQuantity
);


// DECREASE QUANTITY
router.put(
  "/decrease/:cartId",
  authMiddleware,
  decreaseQuantity
);


// REMOVE CART ITEM
router.delete(
  "/:cartId",
  authMiddleware,
  removeCartItem
);


module.exports = router;