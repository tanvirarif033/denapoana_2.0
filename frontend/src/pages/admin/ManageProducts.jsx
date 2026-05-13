import {
useEffect,
useState
} from "react";

import {
useNavigate
} from "react-router-dom";

import toast
from "react-hot-toast";

import AdminSidebar
from "../../components/admin/AdminSidebar";

import {
getProducts,
deleteProduct
}
from "../../services/adminService";



function ManageProducts(){

const navigate=
useNavigate();

const[
products,
setProducts
]=useState([]);

const[
search,
setSearch
]=useState("");

const[
loading,
setLoading
]=useState(true);




// =========================
// FETCH PRODUCTS
// =========================

const fetchProducts=
async()=>{

try{

setLoading(true);

const data=
await getProducts();

setProducts(
data.products || []
);

}
catch(error){

console.log(error);

toast.error(
"Failed to load products"
);

}
finally{

setLoading(false);

}

};



useEffect(()=>{

fetchProducts();

},[]);




// =========================
// DELETE
// =========================

const handleDelete=
async(id)=>{

const ok=
window.confirm(
"Delete product?"
);

if(!ok)return;


try{

await deleteProduct(id);

toast.success(
"Product deleted"
);

fetchProducts();

}
catch(error){

console.log(error);

toast.error(
"Delete failed"
);

}

};




// =========================
// FILTER
// =========================

const filteredProducts=

products.filter(

(item)=>

item.title

.toLowerCase()

.includes(

search.toLowerCase()

)

);






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
shadow-sm
border-0
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

Manage Products

</h2>





<input

type="text"

placeholder="Search product"

className="
form-control
mb-4
"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

/>







{
loading

?

(

<div
className="
text-center
py-5
"
>

Loading...

</div>

)

:

(

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
Image
</th>

<th>
Title
</th>

<th>
Category
</th>

<th>
Price
</th>

<th>
Stock
</th>

<th>
Actions
</th>

</tr>

</thead>

<tbody>

{

filteredProducts.map(

(product)=>(

<tr
key={product.id}
>

<td>

<img

src={
product.images?.[0]
}

alt=""

style={{

width:"70px",

height:"70px",

objectFit:
"cover",

borderRadius:
"8px"

}}

/>

</td>






<td>

<div
className="
fw-bold
"
>

{
product.title
}

</div>

</td>






<td>

{
product.category
?.name
}

</td>







<td>

Tk
{
product.price
}

</td>








<td>

{

product.stock<5

?

<span
className="
badge
bg-danger
"
>

Low:
{
product.stock
}

</span>

:

product.stock

}

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
btn-warning
btn-sm
"

onClick={()=>

navigate(

`/admin/edit-product/${product.id}`

)

}

>

Edit

</button>






<button

className="
btn
btn-danger
btn-sm
"

onClick={()=>

handleDelete(
product.id
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

)

}

</div>

</div>

</div>

</div>

)

}

export default ManageProducts;