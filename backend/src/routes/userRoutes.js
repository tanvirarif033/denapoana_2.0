const express = require("express");

const {
  getUserProfile,
  updateProfile,
  deleteProfileImage,
  getAllUsers,
  changeUserRole
} = require("../controllers/userController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const upload =
  require("../middlewares/uploadMiddleware");

const router = express.Router();


// GET PROFILE
router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);


// UPDATE PROFILE
router.put(
  "/profile",
  authMiddleware,
  upload.single("image"),
  updateProfile
);


// DELETE PROFILE IMAGE
router.delete(
  "/profile/image",
  authMiddleware,
  deleteProfileImage
);


// ADMIN ALL USERS
router.get(
  "/all-users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


// CHANGE USER ROLE
router.put(
  "/role/:userId",
  authMiddleware,
  adminMiddleware,
  changeUserRole
);


module.exports = router;