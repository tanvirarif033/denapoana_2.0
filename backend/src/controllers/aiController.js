const prisma=
require("../config/prisma");

const {
generateAIResponse
}=require("../services/aiService");



const aiChat=
async(req,res)=>{

try{

const{
message,
history=[]
}=req.body;


const text=
message.toLowerCase();




// budget detect

let budget=null;

const budgetMatch=

text.match(/\d+/);

if(budgetMatch){

budget=
parseInt(
budgetMatch[0]
);

}





// intent detect

const categories=[

"keyboard",
"mouse",
"camera",
"laptop",
"phone",
"headphone"

];


let detected="";


for(let item of categories){

if(
text.includes(item)
){

detected=item;

break;

}

}





let where={};



if(detected){

where.OR=[

{

title:{

contains:detected,

mode:"insensitive"

}

},

{

description:{

contains:detected,

mode:"insensitive"

}

},

{

category:{

name:{

contains:detected,

mode:"insensitive"

}

}

}

];

}



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





let productText="";

products.forEach(

p=>{

productText+=`

Name:${p.title}

Price:${p.price}

Description:${p.description}

Category:${p.category?.name}

`;

});



const prompt=`

Previous chat:

${history.map(

x=>

`${x.role}:${x.content}`

).join("\n")}


User:

${message}


Products:

${productText}



Rules:

If products empty say:

"Ei category te product pawa jai nai"


Never recommend unrelated products.

If user selects a product then later ask:

"Ar kichu lagbe?"

Only then suggest related accessories.

`;



const aiReply=

await generateAIResponse(
prompt
);




res.json({

success:true,

aiReply:

aiReply ||

"Ei category te kichu pawa jai nai",

products

});


}
catch(error){

console.log(error);

res.status(500)

.json({

success:false

});

}

};







const aiAddToCart=
async(req,res)=>{

try{

const userId=
req.user.id;


const{
productId
}=req.body;


const existing=

await prisma.cart
.findFirst({

where:{

userId,
productId

}

});



if(existing){

await prisma.cart.update({

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

await prisma.cart.create({

data:{

userId,
productId

}

});

}


const count=

await prisma.cart.count({

where:{

userId

}

});



res.json({

success:true,

cartCount:count

});


}
catch(error){

res.status(500)

.json({

success:false

});

}

};


module.exports={

aiChat,
aiAddToCart

};