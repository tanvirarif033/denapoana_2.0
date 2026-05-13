import {
useEffect,
useState
} from "react";

import {
useParams,
useNavigate
} from "react-router-dom";

import toast
from "react-hot-toast";

import AdminSidebar
from "../../components/admin/AdminSidebar";

import {

getSingleProduct,
updateProduct,
getCategories

}

from "../../services/adminService";




function EditProduct(){


const {id}=
useParams();

const navigate=
useNavigate();



const[
loading,
setLoading
]=useState(true);



const[
categories,
setCategories
]=useState([]);



const[
form,
setForm
]=useState({

title:"",
description:"",
price:"",
stock:"",
categoryId:""

});


const[
images,
setImages
]=useState([]);


const[
oldImages,
setOldImages
]=useState([]);






// ====================
// FETCH PRODUCT
// ====================

const fetchProduct=
async()=>{

try{

const data=
await getSingleProduct(id);

const product=
data.product;


setForm({

title:
product.title || "",

description:
product.description || "",

price:
product.price || "",

stock:
product.stock || "",

categoryId:
product.categoryId || ""

});


setOldImages(

product.images || []

);

}
catch(error){

console.log(error);

toast.error(
"Load failed"
);

}
finally{

setLoading(false);

}

};





// ====================
// FETCH CATEGORY
// ====================

const fetchCategories=
async()=>{

try{

const data=
await getCategories();

setCategories(

data.categories || []

);

}
catch(error){

console.log(error);

}

};






useEffect(()=>{

fetchProduct();

fetchCategories();

},[]);








const handleChange=
(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};






const handleSubmit=
async(e)=>{

e.preventDefault();


try{


const formData=
new FormData();

formData.append(
"title",
form.title
);

formData.append(
"description",
form.description
);

formData.append(
"price",
form.price
);

formData.append(
"stock",
form.stock
);

formData.append(
"categoryId",
form.categoryId
);




for(

let i=0;

i<images.length;

i++

){

formData.append(

"images",

images[i]

);

}



await updateProduct(

id,

formData

);


toast.success(
"Product Updated"
);

navigate(
"/admin/manage-products"
);


}
catch(error){

console.log(error);

toast.error(
"Update failed"
);

}

};








if(loading){

return(

<div
className="
container
py-5
text-center
"
>

Loading...

</div>

)

}









return(

<div
className="
container-fluid
py-4
"
>

<div className="row">



<div
className="
col-lg-3
mb-4
"
>

<AdminSidebar/>

</div>






<div
className="
col-lg-9
"
>

<div
className="
card
border-0
shadow-sm
rounded-4
p-4
"
>

<h2
className="
fw-bold
mb-4
"
>

Edit Product

</h2>





<form
onSubmit={
handleSubmit
}
>





<label
className="
fw-bold
mb-2
"
>

Title

</label>

<input

type="text"

name="title"

value={
form.title
}

onChange={
handleChange
}

className="
form-control
mb-3
"

required

/>








<label
className="
fw-bold
mb-2
"
>

Description

</label>

<textarea

rows="5"

name="description"

value={
form.description
}

onChange={
handleChange
}

className="
form-control
mb-3
"

required

/>








<div className="row">


<div className="col">

<label
className="
fw-bold
mb-2
"
>

Price

</label>

<input

type="number"

name="price"

value={
form.price
}

onChange={
handleChange
}

className="
form-control
mb-3
"

required

/>

</div>





<div className="col">

<label
className="
fw-bold
mb-2
"
>

Stock

</label>

<input

type="number"

name="stock"

value={
form.stock
}

onChange={
handleChange
}

className="
form-control
mb-3
"

required

/>

</div>


</div>







<label
className="
fw-bold
mb-2
"
>

Category

</label>

<select

name="categoryId"

value={
form.categoryId
}

onChange={
handleChange
}

className="
form-select
mb-3
"

required
>

<option value="">

Select Category

</option>


{

categories.map(

(item)=>(

<option

key={item.id}

value={item.id}

>

{item.name}

</option>

)

)

}


</select>









<label
className="
fw-bold
mb-2
"
>

Current Images

</label>


<div
className="
d-flex
gap-3
mb-4
flex-wrap
"
>

{

oldImages.map(

(img,index)=>(

<img

key={index}

src={img}

alt=""

style={{

width:"100px",

height:"100px",

objectFit:
"cover",

borderRadius:
"10px"

}}

/>

)

)

}

</div>








<label
className="
fw-bold
mb-2
"
>

New Images

</label>

<input

type="file"

multiple

className="
form-control
mb-4
"

onChange={(e)=>

setImages(

e.target.files

)

}

/>







<button

className="
btn
btn-warning
w-100
fw-bold
"

>

Update Product

</button>


</form>

</div>

</div>

</div>

</div>

)

}

export default EditProduct;