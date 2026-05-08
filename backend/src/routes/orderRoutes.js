const express = require("express");

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const router = express.Router();


// PLACE ORDER
router.post(
  "/",
  authMiddleware,
  placeOrder
);


// USER ORDERS
router.get(
  "/my-orders",
  authMiddleware,
  getUserOrders
);


// ADMIN ALL ORDERS
router.get(
  "/all-orders",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);


// UPDATE STATUS
router.put(
  "/status/:orderId",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);


module.exports = router;