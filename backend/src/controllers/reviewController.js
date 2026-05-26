const prisma=
require("../config/prisma");



// ==========================
// ADD REVIEW
// ==========================

const addReview=
async(req,res)=>{

try{

const userId=
req.user.id;


const{
productId,
rating,
comment
}=req.body;



// validation

if(

!productId ||

!rating ||

!comment?.trim()

){

return res.status(400)

.json({

success:false,

message:
"All fields required"

});

}



// product check

const product=

await prisma.product
.findUnique({

where:{

id:productId

}

});


if(!product){

return res.status(404)

.json({

success:false,

message:
"Product not found"

});

}



// one review per user

const existingReview=

await prisma.review
.findFirst({

where:{

userId,
productId

}

});



if(existingReview){

return res.status(400)

.json({

success:false,

message:
"You already reviewed this product"

});

}



// create review

await prisma.review.create({

data:{

rating:
parseFloat(rating),

comment,

userId,

productId

}

});



// calculate average

const reviews=

await prisma.review
.findMany({

where:{

productId

}

});



const total=

reviews.reduce(

(sum,item)=>

sum+item.rating,

0

);



const average=

reviews.length

?

total/reviews.length

:

0;



await prisma.product.update({

where:{

id:productId

},

data:{

rating:
average

}

});



res.status(201)

.json({

success:true,

message:
"Review added successfully"

});


}
catch(error){

console.log(error);

res.status(500)

.json({

success:false,

message:
"Server Error"

});

}

};







// ==========================
// GET PRODUCT REVIEWS
// ==========================

const getProductReviews=
async(req,res)=>{

try{

const{
productId
}=req.params;



const reviews=

await prisma.review
.findMany({

where:{

productId

},

include:{

user:{

select:{

name:true,

profileImage:true

}

}

},

orderBy:{

createdAt:
"desc"

}

});



res.status(200)

.json({

success:true,

totalReviews:
reviews.length,

reviews

});


}
catch(error){

console.log(error);

res.status(500)

.json({

success:false,

message:
"Server Error"

});

}

};









// ==========================
// ADMIN REPLY
// ==========================

const replyReview=
async(req,res)=>{

try{

const{
reviewId
}=req.params;


const{
reply
}=req.body;



if(!reply){

return res.status(400)

.json({

success:false,

message:
"Reply required"

});

}



const updatedReview=

await prisma.review
.update({

where:{

id:reviewId

},

data:{

reply

}

});



res.status(200)

.json({

success:true,

message:
"Reply added",

updatedReview

});



}
catch(error){

console.log(error);

res.status(500)

.json({

success:false,

message:
"Server Error"

});

}

};









// ==========================
// SIMILAR PRODUCTS
// ==========================

const getSimilarProducts=
async(req,res)=>{

try{

const{
productId
}=req.params;



const currentProduct=

await prisma.product
.findUnique({

where:{

id:productId

}

});



if(!currentProduct){

return res.status(404)

.json({

success:false,

message:
"Product not found"

});

}



const similarProducts=

await prisma.product
.findMany({

where:{

categoryId:
currentProduct.categoryId,

NOT:{

id:productId

}

},

take:4

});



res.status(200)

.json({

success:true,

similarProducts

});


}
catch(error){

console.log(error);

res.status(500)

.json({

success:false,

message:
"Server Error"

});

}

};









// ==========================
// TOP RATED PRODUCTS
// ==========================

const getTopRatedProducts=
async(req,res)=>{

try{

const products=

await prisma.product
.findMany({

orderBy:{

rating:
"desc"

},

take:8

});



res.status(200)

.json({

success:true,

products

});


}
catch(error){

console.log(error);

res.status(500)

.json({

success:false,

message:
"Server Error"

});

}

};



module.exports={

addReview,

getProductReviews,

replyReview,

getSimilarProducts,

getTopRatedProducts

};