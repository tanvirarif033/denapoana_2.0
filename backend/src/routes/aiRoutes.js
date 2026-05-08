const express = require("express");

const {
  aiChat,
  aiAddToCart
} = require("../controllers/aiController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const router = express.Router();


// AI CHAT
router.post(
  "/chat",
  aiChat
);


// AI ADD TO CART
router.post(
  "/add-to-cart",
  authMiddleware,
  aiAddToCart
);


module.exports = router;