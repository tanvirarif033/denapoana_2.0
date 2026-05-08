const express = require("express");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const router = express.Router();


// CREATE CATEGORY
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCategory
);


// GET ALL CATEGORIES
router.get("/", getCategories);


// UPDATE CATEGORY
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCategory
);


// DELETE CATEGORY
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);


module.exports = router;