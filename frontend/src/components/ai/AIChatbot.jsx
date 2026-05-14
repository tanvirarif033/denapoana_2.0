import {useEffect,useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import{
FaRobot,
FaTimes,
FaPaperPlane,
FaShoppingCart
}
from "react-icons/fa";

import {useAuth}
from "../../context/AuthContext";



function AIChatbot(){


const {user}=
useAuth();


// only logged in users
if(!user) return null;



const CHAT_KEY=
`ai_chat_${user.id}`;



const [open,setOpen]=
useState(false);

const [message,setMessage]=
useState("");

const [loading,setLoading]=
useState(false);


const[
selectedProduct,
setSelectedProduct
]=useState(null);



const [messages,setMessages]=
useState([]);




// =========================
// LOAD CHAT
// =========================

useEffect(()=>{


const saved=

localStorage.getItem(
CHAT_KEY
);


if(saved){

setMessages(
JSON.parse(saved)
);

}
else{

setMessages([

{

sender:"bot",

text:
"Hi 👋 Ki product lagbe? Budget bolleo hobe"

}

]);

}


},[]);




// =========================
// SAVE CHAT
// =========================

useEffect(()=>{

if(messages.length){

localStorage.setItem(

CHAT_KEY,

JSON.stringify(
messages
)

);

}

},
[messages]);





// =========================
// ADD CART
// =========================

const addToCart=
async(productId)=>{


try{


const token=
localStorage.getItem(
"token"
);



await axios.post(

"http://localhost:5000/api/ai/add-to-cart",

{
productId
},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



toast.success(
"Added to cart 🔥"
);


}
catch{

toast.error(
"Login first"
);

}

};




// =========================
// SEND
// =========================

const sendMessage=
async()=>{

if(!message.trim())
return;


const current=
message;



// user message

setMessages(prev=>[

...prev,

{

sender:"user",
text:current

}

]);


setMessage("");



// detect agreement

const lower=
current.toLowerCase();


if(

selectedProduct &&

(

lower.includes("haan") ||

lower.includes("yes") ||

lower.includes("dao") ||

lower.includes("add")

)

){


setMessages(prev=>[

...prev,

{

sender:"bot",

text:
"Awesome 🔥 Cart e add kore dicchi"

}

]);


addToCart(
selectedProduct.id
);


return;

}




try{


setLoading(true);



const res=
await axios.post(

"http://localhost:5000/api/ai/chat",

{

message:
current

}

);



const aiText=

res.data.aiReply ||

"Kono response nai";



const products=

res.data.products || [];


if(products.length){

setSelectedProduct(
products[0]
);

}



setTimeout(()=>{


setMessages(prev=>[

...prev,

{

sender:"bot",

text:aiText,

products,

showCart:false

}

]);



},1000);



}
catch(error){


console.log(error);


setMessages(prev=>[

...prev,

{

sender:"bot",

text:
"Kisu problem hoise 😔"

}

]);



}

setLoading(false);

};






return(

<>


<button

className="
btn
btn-warning
rounded-circle
position-fixed
bottom-0
end-0
m-4
shadow
"

style={{

width:"70px",
height:"70px",

zIndex:99999

}}

onClick={()=>

setOpen(!open)

}

>

{

open

?

<FaTimes/>

:

<FaRobot/>

}

</button>







{

open && (

<div

className="
card
position-fixed
bottom-0
end-0
m-5
shadow-lg
"

style={{

width:"380px",
height:"580px",

zIndex:99999

}}

>


<div
className="
bg-dark
text-white
fw-bold
p-3
"
>

AI Shopping Assistant 🤖

</div>





<div

className="p-3"

style={

{

height:"450px",

overflowY:"auto"

}

}

>

{

messages.map(

(msg,index)=>(


<div

key={index}

className={

msg.sender==="user"

?

"text-end"

:

"text-start"

}

>

<div

className={`

d-inline-block
rounded
p-2
mb-2

${

msg.sender==="user"

?

"bg-warning"

:

"bg-light"

}

`}

>

{msg.text}

</div>





{

msg.products?.map(

product=>(

<div

key={product.id}

className="
card
p-2
mb-2
"

>

<img

src={

product.images?.[0]

||

"https://placehold.co/300"

}

height="110"

style={{

objectFit:"cover"

}}

/>


<h6
className="mt-2"
>

{product.title}

</h6>


<p>

Tk {product.price}

</p>



<button

className="
btn
btn-outline-dark
btn-sm
"

onClick={()=>{


setSelectedProduct(
product
);


setMessages(prev=>[

...prev,

{

sender:"bot",

text:
`${product.title} budget hishebe khub valo 🔥 RGB + comfortable grip ase. Cart e add kore dibo?`

}

]);



}}

>

Details

</button>

</div>

)

)

}

</div>

)

)

}




{

loading && (

<p>

Typing...

</p>

)

}

</div>






<div

className="
border-top
p-2
d-flex
gap-2
"

>

<input

className="
form-control
"

placeholder="
2k er moddhe gaming mouse lagbe
"

value={message}

onChange={(e)=>

setMessage(
e.target.value
)

}

onKeyDown={(e)=>{

if(

e.key==="Enter"

){

sendMessage()

}

}}

 />


<button

className="
btn
btn-warning
"

onClick={sendMessage}

>

<FaPaperPlane/>

</button>


</div>


</div>

)

}


</>

)

}


export default AIChatbot;