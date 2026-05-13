const express = require("express");

const router = express.Router();

const {
  getAnalytics
} = require("../controllers/adminController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");



router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);


module.exports = router;