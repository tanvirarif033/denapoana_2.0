import api from "../api/axios";


// =====================================
// GET ALL PRODUCTS
// =====================================

export const getProducts=
async(

page=1,
search="",
category="",
sort=""

)=>{

const response=

await api.get(

"/products",

{

params:{

page,
search,
category,
sort

}

}

);

return response.data;

};




// =====================================
// GET SINGLE PRODUCT
// =====================================

export const getSingleProduct=
async(id)=>{

const response=

await api.get(

`/products/${id}`

);

return response.data;

};




// =====================================
// GET SIMILAR PRODUCTS
// =====================================

export const getSimilarProducts=
async(productId)=>{

const response=

await api.get(

`/products/similar/${productId}`

);

return response.data;

};




// =====================================
// GET TOP RATED PRODUCTS
// =====================================

export const getTopProducts=
async()=>{

const response=

await api.get(

"/reviews/top-products"

);

return response.data;

};





// =====================================
// ADD REVIEW
// =====================================

export const addReview=
async(

productId,
reviewData

)=>{

const response=

await api.post(

"/reviews",

{

productId,

...reviewData

}

);

return response.data;

};




// =====================================
// GET REVIEWS
// =====================================

export const getReviews=
async(productId)=>{

const response=

await api.get(

`/reviews/${productId}`

);

return response.data;

};




// =====================================
// ADMIN REPLY REVIEW
// =====================================

export const replyReview=
async(

reviewId,
reply

)=>{

const response=

await api.put(

`/reviews/reply/${reviewId}`,

{

reply

}

);

return response.data;

};







// =====================================
// ADD TO CART
// =====================================

export const addToCart=
async(productId)=>{

const response=

await api.post(

"/cart",

{

productId

}

);

return response.data;

};




// =====================================
// GET CART
// =====================================

export const getCart=
async()=>{

const response=

await api.get(

"/cart"

);

return response.data;

};




// =====================================
// REMOVE CART ITEM
// =====================================

export const removeCartItem=
async(cartId)=>{

const response=

await api.delete(

`/cart/${cartId}`

);

return response.data;

};




// =====================================
// INCREASE QUANTITY
// =====================================

export const increaseQuantity=
async(cartId)=>{

const response=

await api.put(

`/cart/increase/${cartId}`

);

return response.data;

};




// =====================================
// DECREASE QUANTITY
// =====================================

export const decreaseQuantity=
async(cartId)=>{

const response=

await api.put(

`/cart/decrease/${cartId}`

);

return response.data;

};






// =====================================
// ADD WISHLIST
// =====================================

export const addToWishlist=
async(productId)=>{

const response=

await api.post(

"/wishlist",

{

productId

}

);

return response.data;

};




// =====================================
// GET WISHLIST
// =====================================

export const getWishlist=
async()=>{

const response=

await api.get(

"/wishlist"

);

return response.data;

};




// =====================================
// REMOVE WISHLIST
// =====================================

export const removeWishlist=
async(wishlistId)=>{

const response=

await api.delete(

`/wishlist/${wishlistId}`

);

return response.data;

};




// =====================================
// AI PRODUCT RECOMMEND
// =====================================

export const getAIRecommendation=
async(message)=>{

const response=

await api.post(

"/ai/chat",

{

message

}

);

return response.data;

};