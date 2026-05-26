import {
useEffect,
useState
}
from "react";

import toast
from "react-hot-toast";

import {
FaStar,
FaUserCircle
}
from "react-icons/fa";

import {

addReview,
getReviews

}

from "../../services/productService";

import {
useAuth
}
from "../../context/AuthContext";



function ReviewSection({
productId
}){


const{
user
}=useAuth();



const[
reviews,
setReviews
]=useState([]);


const[
comment,
setComment
]=useState("");


const[
rating,
setRating
]=useState(5);


const[
loading,
setLoading
]=useState(false);




// ==========================
// LOAD REVIEWS
// ==========================

const fetchReviews=
async()=>{

try{

const data=

await getReviews(
productId
);


setReviews(

data.reviews

||

[]

);

}
catch(error){

console.log(error);

}

};



useEffect(()=>{

if(productId){

fetchReviews();

}

},[productId]);







// ==========================
// SUBMIT
// ==========================

const submitReview=
async()=>{


if(!user){

return toast.error(
"Login first"
);

}


if(!comment.trim()){

return toast.error(
"Write review"
);

}



try{

setLoading(true);



await addReview(

productId,

{

rating,

comment

}

);



toast.success(
"Review Added"
);



setComment("");

setRating(5);



fetchReviews();


}
catch(error){

toast.error(

error.response
?.data
?.message

||

"Review failed"

);

}


setLoading(false);

};








return(

<div
className="
mt-5
"
>


<h3
className="
fw-bold
mb-4
"
>

Reviews

</h3>






{/* ADD REVIEW */}

<div
className="
bg-white
rounded-4
shadow-sm
p-4
mb-4
"
>


<h5
className="
mb-3
"
>

Write Review

</h5>





{/* STAR */}

<div
className="
d-flex
gap-1
mb-3
"
>

{

[1,2,3,4,5]

.map((star)=>(

<FaStar

key={star}

size={24}

style={{

cursor:"pointer",

color:

star<=rating

?

"orange"

:

"#ddd"

}}

onClick={()=>

setRating(star)

}

/>

))

}

</div>





<textarea

className="
form-control
mb-3
"

rows="4"

placeholder="
Write your review...
"

value={comment}

onChange={(e)=>

setComment(
e.target.value
)

}

/>






<button

className="
btn
btn-warning
"

disabled={loading}

onClick={submitReview}

>

{

loading

?

"Submitting..."

:

"Submit Review"

}

</button>

</div>








{/* REVIEW LIST */}

{

reviews.length===0 && (

<div
className="
alert
alert-light
"
>

No reviews yet

</div>

)

}






{

reviews.map(

(review)=>(


<div

key={review.id}

className="
bg-white
rounded-4
shadow-sm
p-4
mb-3
"

>


<div
className="
d-flex
justify-content-between
align-items-center
"
>


<div
className="
d-flex
gap-3
align-items-center
"
>

{

review.user
?.profileImage

?

<img

src={
review.user
.profileImage
}

alt=""

style={{

width:"45px",

height:"45px",

borderRadius:
"50%",

objectFit:
"cover"

}}

/>

:

<FaUserCircle
size={45}
/>

}



<div>

<h6
className="
mb-0
fw-bold
"
>

{

review.user
?.name

||

"Anonymous"

}

</h6>


<div
className="
d-flex
gap-1
"
>

{

[1,2,3,4,5]

.map((star)=>(

<FaStar

key={star}

size={14}

color={

star<=
review.rating

?

"orange"

:

"#ddd"

}

/>

))

}

</div>

</div>

</div>

</div>





<p
className="
mt-3
text-muted
mb-0
"
>

{
review.comment
}

</p>





{

review.reply && (

<div
className="
bg-light
rounded
p-3
mt-3
"
>

<b>

Admin Reply:

</b>

{" "}

{
review.reply
}

</div>

)

}

</div>

)

)

}

</div>

)

}

export default ReviewSection;