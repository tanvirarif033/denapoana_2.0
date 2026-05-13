import {
useEffect,
useState
} from "react";

import toast
from "react-hot-toast";

import AdminSidebar
from "../../components/admin/AdminSidebar";

import {
getAllOrders,
updateOrderStatus
}
from "../../services/adminService";



function ManageOrders(){

const[
orders,
setOrders
]=useState([]);

const[
loading,
setLoading
]=useState(true);




// ======================
// FETCH ORDERS
// ======================

const fetchOrders=
async()=>{

try{

const data=
await getAllOrders();

setOrders(
data.orders || []
);

}
catch(error){

console.log(error);

toast.error(
"Failed to load orders"
);

}
finally{

setLoading(false);

}

};





useEffect(()=>{

fetchOrders();

},[]);





// ======================
// STATUS UPDATE
// ======================

const handleStatusChange=
async(
orderId,
status
)=>{

try{

await updateOrderStatus(
orderId,
status
);

toast.success(
"Order updated"
);

fetchOrders();

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

<h3>
Loading...
</h3>

</div>

);

}







return(

<div
className="
container-fluid
py-4
"
>

<div className="row">




{/* SIDEBAR */}

<div
className="
col-lg-3
mb-4
"
>

<AdminSidebar/>

</div>






{/* CONTENT */}

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

Manage Orders

</h2>





{
orders.length===0
?

(

<div
className="
text-center
py-5
"
>

<h5>
No orders found
</h5>

</div>

)

:

orders.map((order)=>(

<div

key={order.id}

className="
border
rounded-4
p-4
mb-4
"
>





<div
className="
d-flex
justify-content-between
mb-4
flex-wrap
gap-3
"
>


<div>

<h6
className="
fw-bold
"
>

Order ID

</h6>

<p
className="
text-muted
small
"
>

{order.id}

</p>

</div>





<div>

<h6
className="
fw-bold
"
>

Customer

</h6>

<p>

{order.user?.name}

</p>

<p
className="
small
text-muted
"
>

{order.user?.email}

</p>

</div>






<div>

<h6
className="
fw-bold
"
>

Total

</h6>

<h4
className="
text-warning
fw-bold
"
>

Tk {order.totalPrice}

</h4>

</div>







<div>

<h6
className="
fw-bold
mb-2
"
>

Status

</h6>

<select

value={
order.orderStatus
}

onChange={(e)=>

handleStatusChange(

order.id,

e.target.value

)

}

className="
form-select
"
>

<option
value="PENDING"
>

Pending

</option>


<option
value="PROCESSING"
>

Processing

</option>


<option
value="SHIPPED"
>

Shipped

</option>


<option
value="DELIVERED"
>

Delivered

</option>


<option
value="CANCELLED"
>

Cancelled

</option>

</select>

</div>

</div>






{/* PRODUCTS */}

{

order.orderItems?.map(

(item)=>(

<div

key={item.id}

className="
d-flex
align-items-center
gap-3
border-top
pt-3
pb-3
"
>

<img

src={
item.product
?.images?.[0]
}

alt=""

style={{

width:"90px",

height:"90px",

objectFit:
"cover",

borderRadius:
"10px"

}}

/>





<div
className="
flex-grow-1
"
>

<h5
className="
fw-bold
mb-1
"
>

{
item.product
?.title
}

</h5>


<p
className="
mb-1
"
>

Qty:
{
item.quantity
}

</p>


<p
className="
text-warning
fw-bold
mb-0
"
>

Tk
{
item.price
}

</p>

</div>

</div>

)

)

}

</div>

))

}

</div>

</div>

</div>

</div>

);

}

export default ManageOrders;