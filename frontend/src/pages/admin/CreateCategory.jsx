import {
useEffect,
useState
}
from "react";

import toast
from "react-hot-toast";

import AdminSidebar
from "../../components/admin/AdminSidebar";

import {

createCategory,
getCategories,
deleteCategory,
updateCategory

}

from "../../services/adminService";



function CreateCategory(){


const[
name,
setName
]=useState("");


const[
editingId,
setEditingId
]=useState(null);


const[
categories,
setCategories
]=useState([]);




// =======================
// FETCH CATEGORY
// =======================

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

toast.error(
"Load failed"
);

}

};



useEffect(()=>{

fetchCategories();

},[]);






// =======================
// SUBMIT
// =======================

const handleSubmit=
async(e)=>{

e.preventDefault();

if(!name){

return toast.error(
"Enter category"
);

}



try{

// EDIT

if(editingId){

await updateCategory(

editingId,

{
name
}

);

toast.success(
"Category Updated"
);

setEditingId(
null
);

}



// CREATE

else{

await createCategory({

name

});

toast.success(
"Category Created"
);

}


setName("");

fetchCategories();

}
catch(error){

console.log(error);

toast.error(
"Operation failed"
);

}

};









// =======================
// EDIT CLICK
// =======================

const handleEdit=
(category)=>{

setEditingId(
category.id
);

setName(
category.name
);

};








// =======================
// DELETE
// =======================

const handleDelete=
async(id)=>{


const ok=
window.confirm(
"Delete category?"
);

if(!ok)return;



try{

await deleteCategory(id);

toast.success(
"Deleted"
);

fetchCategories();

}
catch(error){

console.log(error);

toast.error(
"Delete failed"
);

}

};








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

<h1
className="
fw-bold
mb-4
"
>

Category Management

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

Category Name

</label>


<input

type="text"

className="
form-control
mb-4
"

value={name}

onChange={(e)=>

setName(
e.target.value
)

}

/>






<button

className="
btn
btn-warning
w-100
fw-bold
mb-5
"

>

{

editingId

?

"Update Category"

:

"Create Category"

}

</button>

</form>








<h3
className="
fw-bold
mb-4
"
>

All Categories

</h3>





<div
className="
table-responsive
"
>

<table
className="
table
align-middle
"
>

<thead>

<tr>

<th>
Name
</th>

<th>
Slug
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{

categories.map(

(item)=>(

<tr
key={item.id}
>

<td>

{item.name}

</td>

<td>

{item.slug}

</td>

<td>

<div
className="
d-flex
gap-2
"
>

<button

className="
btn
btn-sm
btn-warning
"

onClick={()=>

handleEdit(
item
)

}

>

Edit

</button>





<button

className="
btn
btn-sm
btn-danger
"

onClick={()=>

handleDelete(
item.id
)

}

>

Delete

</button>

</div>

</td>

</tr>

)

)

}

</tbody>

</table>

</div>

</div>

</div>

</div>

</div>

)

}

export default CreateCategory;