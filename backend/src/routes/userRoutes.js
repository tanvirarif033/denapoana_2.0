const express =
  require("express");

const router =
  express.Router();

const {

  getUserProfile,

  updateProfile,

  deleteProfileImage,

  getAllUsers,

  changeUserRole,

  uploadProfileImage,

  getUserOrders

} = require("../controllers/userController");


const authMiddleware =
  require("../middlewares/authMiddleware");

const adminMiddleware =
  require("../middlewares/adminMiddleware");

const upload =
  require("../middlewares/uploadMiddleware");



// ======================================
// USER PROFILE
// ======================================

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

  updateProfile
);



// ======================================
// PROFILE IMAGE
// ======================================

// UPLOAD PROFILE IMAGE
router.put(

  "/profile-image",

  authMiddleware,

  upload.single(
    "profilePicture"
  ),

  uploadProfileImage
);



// DELETE PROFILE IMAGE
router.delete(

  "/profile-image",

  authMiddleware,

  deleteProfileImage
);



// ======================================
// USER ORDERS
// ======================================

router.get(

  "/orders",

  authMiddleware,

  getUserOrders
);



// ======================================
// ADMIN ROUTES
// ======================================

// GET ALL USERS
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



module.exports =
  router;