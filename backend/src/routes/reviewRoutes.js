const express=
require("express");

const {

addReview,
getProductReviews,
replyReview,
getSimilarProducts,
getTopRatedProducts

}=require(
"../controllers/reviewController"
);

const authMiddleware=
require(
"../middlewares/authMiddleware"
);

const adminMiddleware=
require(
"../middlewares/adminMiddleware"
);

const router=
express.Router();



// ==========================
// ADD REVIEW
// Login required
// ==========================

router.post(

"/",

authMiddleware,

addReview

);




// ==========================
// SIMILAR PRODUCTS
// ==========================

router.get(

"/similar/:productId",

getSimilarProducts

);




// ==========================
// TOP PRODUCTS
// ==========================

router.get(

"/top-products",

getTopRatedProducts

);




// ==========================
// ADMIN REPLY REVIEW
// ==========================

router.put(

"/reply/:reviewId",

authMiddleware,

adminMiddleware,

replyReview

);




// ==========================
// GET PRODUCT REVIEWS
// IMPORTANT:
// keep dynamic route last
// ==========================

router.get(

"/:productId",

getProductReviews

);




module.exports=
router;