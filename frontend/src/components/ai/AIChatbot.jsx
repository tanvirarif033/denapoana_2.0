import {
useEffect,
useRef,
useState
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

import {
FaRobot,
FaTimes,
FaPaperPlane,
FaShoppingCart,
FaSmile,
FaInfoCircle
}
from "react-icons/fa";

import EmojiPicker
from "emoji-picker-react";

import {
useNavigate
}
from "react-router-dom";

import {
useCart
}
from "../../context/CartContext";



function AIChatbot(){


const token=
localStorage.getItem("token");

if(!token)
return null;



const userId=

localStorage.getItem("userId")

||

localStorage.getItem("id")

||

"guest";



const chatKey=
`chat_${userId}`;



const navigate=
useNavigate();

const{
fetchCartCount
}=useCart();


const messagesEndRef=
useRef(null);


const[
open,
setOpen
]=useState(false);

const[
message,
setMessage
]=useState("");

const[
loading,
setLoading
]=useState(false);

const[
showEmoji,
setShowEmoji
]=useState(false);


const[
messages,
setMessages
]=useState([

{
sender:"bot",
text:
"👋 Hi! Apnar ki lagbe? How can I help you today?"
}

]);




// =======================
// LOAD CHAT
// =======================

useEffect(()=>{

const old=

localStorage.getItem(
chatKey
);


if(old){

try{

const parsed=

JSON.parse(old);


if(
Array.isArray(parsed)
&&
parsed.length>0
){

setMessages(
parsed
);

}

}
catch{

setMessages([

{
sender:"bot",
text:
"👋 Hi! Apnar ki lagbe? How can I help you today?"
}

]);

}

}

},[]);






// =======================
// SAVE CHAT
// =======================

useEffect(()=>{

localStorage.setItem(

chatKey,

JSON.stringify(
messages
)

);

},[
messages
]);








// =======================
// AUTO SCROLL
// =======================

useEffect(()=>{

messagesEndRef.current
?.scrollIntoView({

behavior:
"smooth"

});

},[
messages
]);









// =======================
// ADD TO CART
// =======================

const addToCart=
async(productId)=>{

try{

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

await fetchCartCount();

toast.success(
"Added to cart 🛒"
);

}
catch{

toast.error(
"Failed"
);

}

};










// =======================
// SEND MESSAGE
// =======================

const sendMessage=
async()=>{


if(!message.trim())
return;



const current=
message;



const updated=[

...messages,

{

sender:"user",

text:current

}

];


setMessages(
updated
);


setMessage("");



try{


setLoading(true);



const history=

updated

.slice(-10)

.map(x=>({

role:

x.sender==="user"

?

"user"

:

"assistant",

content:
x.text

}));



const res=
await axios.post(

"http://localhost:5000/api/ai/chat",

{

message:current,

history

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);




// frontend safety filter

let filteredProducts=

res.data.products || [];



const lower=

current.toLowerCase();


if(
lower.includes(
"keyboard"
)
){

filteredProducts=

filteredProducts.filter(

p=>

p.title
.toLowerCase()
.includes(
"keyboard"
)

);

}


if(
lower.includes(
"mouse"
)
){

filteredProducts=

filteredProducts.filter(

p=>

p.title
.toLowerCase()
.includes(
"mouse"
)

);

}


if(
lower.includes(
"camera"
)
){

filteredProducts=

filteredProducts.filter(

p=>

p.title
.toLowerCase()
.includes(
"camera"
)

);

}





setMessages(prev=>[

...prev,

{

sender:"bot",

text:

res.data.aiReply ||

"No response",


products:
filteredProducts

}

]);


}
catch(error){

console.log(error);

toast.error(
"AI Failed"
);

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
shadow-lg
"

style={{

width:"70px",
height:"70px",

right:"20px",
bottom:"20px",

zIndex:9999

}}

onClick={()=>

setOpen(!open)

}

>

{

open

?

<FaTimes size={22}/>

:

<FaRobot size={22}/>

}

</button>







{

open&&(

<div

className="
card
shadow-lg
border-0
position-fixed
"

style={{

width:

window.innerWidth<768

?

"95%"

:

"390px",

height:"620px",

bottom:"100px",

right:"20px",

zIndex:9999,

borderRadius:"20px",

overflow:"hidden"

}}

>


<div
className="
bg-dark
text-white
p-3
fw-bold
d-flex
justify-content-between
align-items-center
"
>

<span>

AI Shopping Assistant 🤖

</span>



<button

className="
btn
btn-sm
text-white
"

onClick={()=>{

const starter=[

{

sender:"bot",

text:
"👋 Hi! Apnar ki lagbe? How can I help you today?"

}

];


setMessages(
starter
);


localStorage.setItem(

chatKey,

JSON.stringify(
starter
)

);

}}

>

Clear

</button>

</div>






<div

className="p-3"

style={{

height:"470px",

overflowY:"auto",

background:"#f5f7fb"

}}

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
p-2
rounded-4
mb-2

${

msg.sender==="user"

?

"bg-warning"

:

"bg-white shadow-sm"

}

`}

style={{

maxWidth:"85%"

}}

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
mb-3
shadow-sm
"

>

<img

src={

product.images?.[0]

||

"https://placehold.co/300"

}

height="120"

style={{

objectFit:"cover",
borderRadius:"10px"

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



<div
className="
d-flex
gap-2
"
>

<button

className="
btn
btn-outline-dark
w-50
"

onClick={()=>

navigate(

`/product/${product.id}`

)

}

>

<FaInfoCircle/>

Details

</button>



<button

className="
btn
btn-warning
w-50
"

onClick={()=>

addToCart(
product.id
)

}

>

<FaShoppingCart/>

</button>

</div>

</div>

)

)

}

</div>

)

)

}



{

loading&&

<div
className="
text-muted
small
"
>

Typing...

</div>

}


<div ref={messagesEndRef}/>

</div>






{

showEmoji&&(

<div

style={{

position:"absolute",

bottom:"70px",

left:"10px",

zIndex:99999

}}

>

<EmojiPicker

height={350}
width={300}

onEmojiClick={(e)=>{

setMessage(

prev=>

prev+e.emoji

)

}}

/>

</div>

)

}






<div
className="
border-top
p-2
d-flex
gap-2
bg-white
"
>

<button

className="
btn btn-light
"

onClick={()=>

setShowEmoji(
!showEmoji
)

}

>

<FaSmile/>

</button>



<input

className="
form-control
rounded-pill
"

placeholder="
Type message...
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
rounded-circle
"

onClick={
sendMessage
}

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