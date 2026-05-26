const prisma=
require("../config/prisma");

const cloudinary=
require("../config/cloudinary");



// =====================================
// CREATE PRODUCT
// =====================================

const createProduct=
async(req,res)=>{

try{

const{

title,
description,
price,
stock,
category

}=req.body;



if(

!title||
!description||
!price||
!stock||
!category

){

return res.status(400)
.json({

success:false,

message:
"All fields required"

});

}



const categoryData=

await prisma.category
.findFirst({

where:{

name:category

}

});



if(!categoryData){

return res.status(404)

.json({

success:false,

message:
"Category not found"

});

}



const imageUrls=[];



if(req.files?.length>0){

for(const file of req.files){

const base64=

file.buffer.toString(
"base64"
);


const dataURI=

`data:${file.mimetype};base64,${base64}`;



const uploaded=

await cloudinary
.uploader
.upload(

dataURI,

{

folder:
"denapoana_products"

}

);



imageUrls.push(

uploaded.secure_url

);

}

}



const product=

await prisma.product.create({

data:{

title,

description,

price:
parseFloat(price),

stock:
parseInt(stock),

images:
imageUrls,

categoryId:
categoryData.id

}

});



res.status(201)
.json({

success:true,

message:
"Product Created",

product

});


}
catch(error){

console.log(error);

res.status(500)
.json({

success:false,

message:error.message

});

}

};









// =====================================
// GET PRODUCTS
// =====================================

const getProducts=
async(req,res)=>{

try{

const{

search="",
page=1,
category="",
sort=""

}=req.query;



const limit=12;

const skip=

(page-1)*limit;



let orderBy={

createdAt:
"desc"

};



if(sort==="low"){

orderBy={

price:"asc"

};

}


if(sort==="high"){

orderBy={

price:"desc"

};

}



const where={

title:{

contains:search,

mode:
"insensitive"

},

...(category&&{

category:{

name:category

}

})

};



const products=

await prisma.product.findMany({

where,

include:{

category:true

},

skip,

take:limit,

orderBy

});



const total=

await prisma.product.count({

where

});



res.status(200)

.json({

success:true,

products,

totalPages:

Math.ceil(

total/limit

)

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









// =====================================
// GET SINGLE PRODUCT
// =====================================

const getSingleProduct=
async(req,res)=>{

try{

const product=

await prisma.product
.findUnique({

where:{

id:req.params.id

},

include:{

category:true,

reviews:{

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

}

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



res.status(200)

.json({

success:true,

product

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









// =====================================
// SIMILAR PRODUCTS
// =====================================

const getSimilarProducts=
async(req,res)=>{

try{

const{

productId

}=req.params;



const current=

await prisma.product
.findUnique({

where:{

id:productId

}

});



if(!current){

return res.status(404)

.json({

success:false,

message:
"Product not found"

});

}



const products=

await prisma.product
.findMany({

where:{

categoryId:
current.categoryId,

NOT:{

id:productId

}

},

take:4

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









// =====================================
// UPDATE PRODUCT
// =====================================

const updateProduct=
async(req,res)=>{

try{

const{

title,
description,
price,
stock,
category

}=req.body;


let imageUrls=[];



if(req.files?.length>0){

for(const file of req.files){

const base64=

file.buffer.toString(
"base64"
);


const dataURI=

`data:${file.mimetype};base64,${base64}`;



const uploaded=

await cloudinary
.uploader
.upload(

dataURI,

{

folder:
"denapoana_products"

}

);


imageUrls.push(

uploaded.secure_url

);

}

}



const categoryData=

await prisma.category
.findFirst({

where:{

name:category

}

});



const updated=

await prisma.product.update({

where:{

id:req.params.id

},

data:{

title,

description,

price:
parseFloat(price),

stock:
parseInt(stock),

...(categoryData&&{

categoryId:
categoryData.id

}),


...(imageUrls.length>0&&{

images:
imageUrls

})

}

});



res.status(200)

.json({

success:true,

message:
"Product Updated",

updated

});

}
catch(error){

console.log(error);

res.status(500)

.json({

success:false,

message:
error.message

});

}

};









// =====================================
// DELETE PRODUCT
// =====================================

const deleteProduct=
async(req,res)=>{

try{

await prisma.product
.delete({

where:{

id:req.params.id

}

});



res.status(200)

.json({

success:true,

message:
"Product deleted"

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

createProduct,

getProducts,

getSingleProduct,

getSimilarProducts,

updateProduct,

deleteProduct

};