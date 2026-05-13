import {
  useEffect,
  useState
} from "react";

import toast
from "react-hot-toast";

import api
from "../../api/axios";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import AdminSidebar
from "../../components/admin/AdminSidebar";

import DashboardCards
from "../../components/admin/DashboardCards";

import SalesChart
from "../../components/admin/SalesChart";

import TopProducts
from "../../components/admin/TopProducts";

import TopCategories
from "../../components/admin/TopCategories";



function AdminDashboard() {


// =========================
// STATES
// =========================

const [analytics,setAnalytics]=
useState({

totalUsers:0,
totalOrders:0,
totalProducts:0,
totalRevenue:0

});


const [monthlySales,
setMonthlySales]=
useState([]);


const [topProducts,
setTopProducts]=
useState([]);


const [topCategories,
setTopCategories]=
useState([]);




// =========================
// FETCH DATA
// =========================

const fetchDashboard=
async()=>{

try{


// dashboard
const dashboardRes=
await api.get(
"/analytics/dashboard"
);


setAnalytics(

dashboardRes?.data?.analytics || {}

);




// monthly sales
const salesRes=
await api.get(
"/analytics/monthly-sales"
);


setMonthlySales(

salesRes?.data?.monthlySales || []

);




// products
const productsRes=
await api.get(
"/analytics/top-products"
);


setTopProducts(

productsRes?.data?.topProducts || []

);






// categories
const categoryRes=
await api.get(
"/analytics/top-categories"
);


console.log(
"categories:",
categoryRes.data
);


setTopCategories(

categoryRes?.data?.topCategories || []

);


}
catch(error){

console.log(error);

toast.error(
"Dashboard load failed"
);

}

};



useEffect(()=>{

fetchDashboard();

},[]);





return(

<>

<Navbar/>


<div
className="
container
py-5
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

<h1
className="
fw-bold
mb-4
"
>

Admin Dashboard

</h1>




<DashboardCards
analytics={analytics}
/>





<div className="mt-4">

<SalesChart
salesData={monthlySales}
/>

</div>






<div className="row mt-4">


<div
className="
col-lg-6
mb-4
"
>

<TopProducts
products={topProducts}
/>

</div>






<div
className="
col-lg-6
mb-4
"
>

<TopCategories
categories={topCategories}
/>

</div>


</div>

</div>

</div>

</div>


<Footer/>

</>

)

}

export default AdminDashboard;