import axios from "axios";

const API =
"http://localhost:5000/api";



// =============================
// AUTH HEADER
// =============================
const authConfig = () => ({

headers:{

Authorization:
`Bearer ${localStorage.getItem("token")}`

}

});



// =============================
// PRODUCT APIs
// =============================

// CREATE PRODUCT
export const createProduct=
async(formData)=>{

const response=
await axios.post(

`${API}/products`,

formData,

{

headers:{

Authorization:
`Bearer ${localStorage.getItem("token")}`,

"Content-Type":
"multipart/form-data"

}

}

);

return response.data;

};




// GET PRODUCTS
export const getProducts=
async(

search="",
category="",
page=1

)=>{

const response=
await axios.get(

`${API}/products?search=${search}&category=${category}&page=${page}`

);

return response.data;

};




// GET SINGLE PRODUCT
export const getSingleProduct=
async(id)=>{

const response=
await axios.get(

`${API}/products/${id}`

);

return response.data;

};




// UPDATE PRODUCT
export const updateProduct=
async(
id,
formData
)=>{

const response=
await axios.put(

`${API}/products/${id}`,

formData,

{

headers:{

Authorization:
`Bearer ${localStorage.getItem("token")}`,

"Content-Type":
"multipart/form-data"

}

}

);

return response.data;

};




// DELETE PRODUCT
export const deleteProduct=
async(id)=>{

const response=
await axios.delete(

`${API}/products/${id}`,

authConfig()

);

return response.data;

};





// =============================
// CATEGORY APIs
// =============================


// CREATE CATEGORY
export const createCategory=
async(data)=>{

const response=
await axios.post(

`${API}/categories`,
data,
authConfig()

);

return response.data;

};




// GET ALL CATEGORY
export const getCategories=
async()=>{

const response=
await axios.get(

`${API}/categories`

);

return response.data;

};






// UPDATE CATEGORY
export const updateCategory=
async(
id,
data
)=>{

const response=
await axios.put(

`${API}/categories/${id}`,

data,

authConfig()

);

return response.data;

};






// DELETE CATEGORY
export const deleteCategory=
async(id)=>{

const response=
await axios.delete(

`${API}/categories/${id}`,

authConfig()

);

return response.data;

};





// =============================
// USER APIs
// =============================

// GET USERS
export const getAllUsers=
async()=>{

const response=
await axios.get(

`${API}/users/all-users`,

authConfig()

);

return response.data;

};




// MAKE ADMIN
export const makeAdmin=
async(userId)=>{

const response=
await axios.put(

`${API}/users/role/${userId}`,

{
role:"ADMIN"
},

authConfig()

);

return response.data;

};







// =============================
// DASHBOARD APIs
// =============================

export const getDashboardAnalytics=
async()=>{

const response=
await axios.get(

`${API}/analytics/dashboard`,

authConfig()

);

return response.data;

};



export const getMonthlySales=
async()=>{

const response=
await axios.get(

`${API}/analytics/monthly-sales`,

authConfig()

);

return response.data;

};



export const getTopProducts=
async()=>{

const response=
await axios.get(

`${API}/analytics/top-products`,

authConfig()

);

return response.data;

};



export const getTopCategories=
async()=>{

const response=
await axios.get(

`${API}/analytics/top-categories`,

authConfig()

);

return response.data;

};







// =============================
// ORDER APIs
// =============================


// GET ALL ORDERS
export const getAllOrders =
async()=>{

const response=
await axios.get(

`${API}/orders/all-orders`,

authConfig()

);

return response.data;

};




// UPDATE ORDER STATUS
export const updateOrderStatus=
async(
orderId,
status
)=>{

const response=
await axios.put(

`${API}/orders/status/${orderId}`,

{
status
},

authConfig()

);

return response.data;

};