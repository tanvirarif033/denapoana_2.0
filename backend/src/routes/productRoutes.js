const express =
require("express");

const router =
express.Router();

const upload=
require(
"../middlewares/uploadMiddleware"
);

const authMiddleware=
require(
"../middlewares/authMiddleware"
);

const adminMiddleware=
require(
"../middlewares/adminMiddleware"
);

const {

createProduct,
getProducts,
getSingleProduct,
getSimilarProducts,
updateProduct,
deleteProduct

}=require(
"../controllers/productController"
);



// ===================================
// CREATE PRODUCT
// ===================================

router.post(

"/",

authMiddleware,

adminMiddleware,

upload.array(
"images",
5
),

createProduct

);




// ===================================
// GET ALL PRODUCTS
// ===================================

router.get(
"/",
getProducts
);




// ===================================
// SIMILAR PRODUCTS
// IMPORTANT:
// must be before /:id
// ===================================

router.get(

"/similar/:productId",

getSimilarProducts

);




// ===================================
// GET SINGLE PRODUCT
// ===================================

router.get(

"/:id",

getSingleProduct

);




// ===================================
// UPDATE PRODUCT
// ===================================

router.put(

"/:id",

authMiddleware,

adminMiddleware,

upload.array(
"images",
5
),

updateProduct

);




// ===================================
// DELETE PRODUCT
// ===================================

router.delete(

"/:id",

authMiddleware,

adminMiddleware,

deleteProduct

);



module.exports=
router;