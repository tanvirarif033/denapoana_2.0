const express = require("express");

const {
  getDashboardAnalytics,
  getMonthlySales,
  getTopSellingProducts,
  getTopCategories
} = require("../controllers/analyticsController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const router = express.Router();


// DASHBOARD ANALYTICS
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardAnalytics
);


// MONTHLY SALES
router.get(
  "/monthly-sales",
  authMiddleware,
  adminMiddleware,
  getMonthlySales
);


// TOP PRODUCTS
router.get(
  "/top-products",
  authMiddleware,
  adminMiddleware,
  getTopSellingProducts
);


// TOP CATEGORIES
router.get(
  "/top-categories",
  authMiddleware,
  adminMiddleware,
  getTopCategories
);


module.exports = router;