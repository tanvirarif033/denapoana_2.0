const prisma =
require("../config/prisma");

const {
generateAIResponse
}=require("../services/aiService");




// ======================
// AI CHAT
// ======================

const aiChat=
async(req,res)=>{

try{

const {message}=req.body;


if(!message){

return res.status(400)
.json({

success:false,

message:
"Message required"

});

}



const lower=

message.toLowerCase();



// budget detect

let budget=null;

const budgetMatch=

lower.match(/\d+/);

if(budgetMatch){

budget=
Number(
budgetMatch[0]
);

}




// keywords

const words=

lower

.split(" ")

.filter(

word=>

word.length>2

);




// build query

let where={};



where.OR=[

...words.map(

word=>({

title:{

contains:word,

mode:
"insensitive"

}

})

),



...words.map(

word=>({

description:{

contains:word,

mode:
"insensitive"

}

})

),


...words.map(

word=>({

category:{

name:{

contains:word,

mode:
"insensitive"

}

}

})

)

];





if(budget){

where.price={

lte:budget

};

}






const products=

await prisma.product.findMany({

where,

include:{

category:true

},

take:5

});






// fallback

if(products.length===0){

const allProducts=

await prisma.product.findMany({

include:{

category:true

},

take:5

});

products.push(
...allProducts
);

}








// build product text

let productText="";


products.forEach(

(product)=>{

productText +=`

Product:

${product.title}

Price:

Tk ${product.price}

Description:

${product.description}

Category:

${

product.category?.name

||

"No category"

}

Rating:

${product.rating}

`;

}

);








const prompt=`

Customer said:

${message}



Products from database:

${productText}



Rules:

Talk Bangla/Banglish.

Recommend naturally.

Convince politely.

Use actual descriptions.

Do not invent features.

Ask follow up questions.

Suggest only relevant products.

`;








const aiReply=

await generateAIResponse(
prompt
);






res.status(200)

.json({

success:true,

aiReply:

aiReply ||

"Ei gula dekhte paren 👇",

products

});



}

catch(error){

console.log(
error
);

res.status(500)

.json({

success:false,

message:
"AI server error"

});

}

};







// ======================
// AI ADD TO CART
// ======================

const aiAddToCart=
async(req,res)=>{

try{

const userId=
req.user.id;

const {
productId
}=req.body;



const product=

await prisma.product
.findUnique({

where:{
id:productId
}

});



if(!product){

return res
.status(404)

.json({

success:false,

message:
"Product not found"

});

}




const existing=

await prisma.cart
.findFirst({

where:{

userId,

productId

}

});



if(existing){

await prisma.cart
.update({

where:{

id:
existing.id

},

data:{

quantity:

existing.quantity+1

}

});

}
else{

await prisma.cart
.create({

data:{

userId,

productId

}

});

}



res.status(200)

.json({

success:true,

message:

"Added to cart"

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

aiChat,

aiAddToCart

};