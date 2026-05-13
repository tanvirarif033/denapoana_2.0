import {
useEffect,
useState
} from "react";

import {
createProduct,
getCategories
}
from "../../services/adminService";

import AdminSidebar
from "../../components/admin/AdminSidebar";

import toast
from "react-hot-toast";



function AddProduct(){

const[
formData,
setFormData
]=useState({

title:"",
description:"",
price:"",
stock:"",
category:""

});


const[
images,
setImages
]=useState([]);


const[
categories,
setCategories
]=useState([]);




// =====================
// FETCH CATEGORY
// =====================

useEffect(()=>{

fetchCategories();

},[]);



const fetchCategories=
async()=>{

try{

const res=
await getCategories();

console.log(
"categories:",
res
);

setCategories(

res.categories || []

);

}
catch(error){

console.log(error);

toast.error(
"Category load failed"
);

}

};




// =====================
// INPUT
// =====================

const handleChange=
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});

};




// =====================
// IMAGE
// =====================

const handleImage=
(e)=>{

setImages(

[...e.target.files]

);

};




// =====================
// SUBMIT
// =====================

const handleSubmit=
async(e)=>{

e.preventDefault();

try{

const data=
new FormData();


data.append(
"title",
formData.title
);

data.append(
"description",
formData.description
);

data.append(
"price",
formData.price
);

data.append(
"stock",
formData.stock
);

data.append(
"category",
formData.category
);



// MULTIPLE IMAGE
images.forEach(
(img)=>{

data.append(
"images",
img
);

}
);


const loading=

toast.loading(
"Saving product..."
);


await createProduct(
data
);


toast.dismiss(
loading
);


toast.success(
"Product Added Successfully"
);



// reset
setFormData({

title:"",
description:"",
price:"",
stock:"",
category:""

});

setImages([]);


}
catch(err){

console.log(err);

toast.error(

err?.response?.data?.message ||

"Add product failed"

);

}

};





return(

<div className="container py-5">

<div className="row">


<div className="col-md-3">

<AdminSidebar/>

</div>





<div className="col-md-9">

<div
className="
card
border-0
shadow
rounded-4
p-4
"
>

<h1
className="
fw-bold
mb-4
"
>

Add Product

</h1>



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

Product Title

</label>

<input

type="text"

name="title"

value={
formData.title
}

onChange={
handleChange
}

className="
form-control
mb-4
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
formData.description
}

onChange={
handleChange
}

className="
form-control
mb-4
"

required
/>






<div className="row">

<div className="col-md-6">

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
formData.price
}

onChange={
handleChange
}

className="
form-control
mb-4
"

required
/>

</div>




<div className="col-md-6">

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
formData.stock
}

onChange={
handleChange
}

className="
form-control
mb-4
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

name="category"

value={
formData.category
}

onChange={
handleChange
}

className="
form-select
mb-4
"

required
>

<option value="">

Select Category

</option>

{

categories.map(
(cat)=>(

<option
key={cat.id}
value={cat.name}
>

{cat.name}

</option>

))

}

</select>







<label
className="
fw-bold
mb-2
"
>

Product Images

</label>

<input

type="file"

multiple

onChange={
handleImage
}

className="
form-control
mb-4
"
/>






{

images.length>0 && (

<div className="row">

{

images.map(
(img,index)=>(

<div
className="
col-md-3
mb-3
"

key={index}
>

<img

src={
URL.createObjectURL(
img
)
}

alt=""

className="
img-fluid
rounded
border
"

style={{
height:"120px",
objectFit:
"cover"
}}

/>

</div>

))

}

</div>

)

}






<button

className="
btn
btn-warning
fw-bold
w-100
"

>

Save Product

</button>


</form>

</div>

</div>

</div>

</div>

)

}


export default AddProduct;