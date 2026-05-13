const prisma =
  require("../config/prisma");

const cloudinary =
  require("../config/cloudinary");



// =====================================
// CREATE PRODUCT
// =====================================

const createProduct =
async (req,res)=>{

try{

const{
title,
description,
price,
stock,
category
}=req.body;



// validation
if(
!title ||
!description ||
!price ||
!stock ||
!category
){

return res.status(400).json({

success:false,
message:"All fields required"

});

}



// category find
const categoryData=
await prisma.category.findFirst({

where:{
name:category
}

});


if(!categoryData){

return res.status(404).json({

success:false,
message:"Category not found"
});

}



// upload images
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
await cloudinary.uploader.upload(

dataURI,

{
folder:
"denpoana_products"
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



res.status(201).json({

success:true,

message:
"Product Created Successfully",

product

});


}catch(error){

console.log(error);

res.status(500).json({

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
category=""
}=req.query;


const limit=10;

const skip=
(page-1)*limit;



const where={

title:{
contains:search,
mode:"insensitive"
},

...(category && {

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

orderBy:{
createdAt:"desc"
}

});



const total=
await prisma.product.count({
where
});



res.status(200).json({

success:true,

products,

totalPages:
Math.ceil(
total/limit
)

});



}catch(error){

console.log(error);

res.status(500).json({

success:false,
message:"Server Error"

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
await prisma.product.findUnique({

where:{

id:req.params.id

},

include:{

category:true

}

});



if(!product){

return res.status(404).json({

success:false,

message:
"Product Not Found"

});

}



res.status(200).json({

success:true,

product

});



}catch(error){

console.log(error);

res.status(500).json({

success:false,
message:"Server Error"

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


// upload new images
if(req.files?.length>0){

for(const file of req.files){

const base64=
file.buffer.toString(
"base64");


const dataURI=
`data:${file.mimetype};base64,${base64}`;



const uploaded=
await cloudinary.uploader.upload(

dataURI,

{
folder:
"denpoana_products"
}

);


imageUrls.push(
uploaded.secure_url
);

}

}



// category find
const categoryData=
await prisma.category.findFirst({

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

...(categoryData && {

categoryId:
categoryData.id

}),


...(imageUrls.length>0 && {

images:
imageUrls

})

}

});



res.status(200).json({

success:true,

message:
"Product Updated",

updated

});



}catch(error){

console.log(error);

res.status(500).json({

success:false,
message:error.message

});

}

};




// =====================================
// DELETE PRODUCT
// =====================================

const deleteProduct=
async(req,res)=>{

try{


await prisma.product.delete({

where:{

id:req.params.id

}

});



res.status(200).json({

success:true,

message:
"Product Deleted"

});


}catch(error){

console.log(error);

res.status(500).json({

success:false,
message:"Server Error"

});

}

};



module.exports={

createProduct,
getProducts,
getSingleProduct,
updateProduct,
deleteProduct

};