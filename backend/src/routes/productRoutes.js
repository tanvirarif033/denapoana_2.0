const express = require("express");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const upload =
  require("../middlewares/uploadMiddleware");

const router = express.Router();


// CREATE PRODUCT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProduct
);


// GET ALL PRODUCTS
router.get("/", getProducts);


// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);


// UPDATE PRODUCT
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct
);


// DELETE PRODUCT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);


module.exports = router;