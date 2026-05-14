import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";


// ===========================
// AI
// ===========================

import AIChatbot
from "./components/ai/AIChatbot";


// ===========================
// PUBLIC PAGES
// ===========================

import HomePage
from "./pages/public/HomePage";

import ProductDetailsPage
from "./pages/public/ProductDetailsPage";



// ===========================
// AUTH PAGES
// ===========================

import LoginPage
from "./pages/auth/LoginPage";

import RegisterPage
from "./pages/auth/RegisterPage";



// ===========================
// USER PAGES
// ===========================

import CartPage
from "./pages/user/CartPage";

import WishlistPage
from "./pages/user/WishlistPage";

import CheckoutPage
from "./pages/user/CheckoutPage";

import PaymentSuccessPage
from "./pages/user/PaymentSuccessPage";

import DashboardPage
from "./pages/user/DashboardPage";

import ProfilePage
from "./pages/user/ProfilePage";



// ===========================
// ADMIN PAGES
// ===========================

import AdminDashboard
from "./pages/admin/AdminDashboard";

import AddProduct
from "./pages/admin/AddProduct";

import ManageProducts
from "./pages/admin/ManageProducts";

import EditProduct
from "./pages/admin/EditProduct";

import ManageUsers
from "./pages/admin/ManageUsers";

import ManageOrders
from "./pages/admin/ManageOrders";

import CreateCategory
from "./pages/admin/CreateCategory";




// ===========================
// ROUTES
// ===========================

import ProtectedRoute
from "./routes/ProtectedRoute";

import AdminRoute
from "./routes/AdminRoute";



function App() {

return(

<BrowserRouter>


{/* GLOBAL AI BOT */}

<AIChatbot/>



<Routes>


<Route
path="/"
element={
<HomePage/>
}
/>



<Route
path="/login"
element={
<LoginPage/>
}
/>



<Route
path="/register"
element={
<RegisterPage/>
}
/>



<Route
path="/product/:id"
element={
<ProductDetailsPage/>
}
/>





<Route

path="/cart"

element={

<ProtectedRoute>

<CartPage/>

</ProtectedRoute>

}

/>





<Route

path="/wishlist"

element={

<ProtectedRoute>

<WishlistPage/>

</ProtectedRoute>

}

/>






<Route

path="/checkout"

element={

<ProtectedRoute>

<CheckoutPage/>

</ProtectedRoute>

}

/>






<Route

path="/payment-success"

element={

<ProtectedRoute>

<PaymentSuccessPage/>

</ProtectedRoute>

}

/>







<Route

path="/dashboard"

element={

<ProtectedRoute>

<DashboardPage/>

</ProtectedRoute>

}

/>







<Route

path="/profile"

element={

<ProtectedRoute>

<ProfilePage/>

</ProtectedRoute>

}

/>







<Route

path="/admin"

element={

<AdminRoute>

<AdminDashboard/>

</AdminRoute>

}

/>







<Route

path="/admin/add-product"

element={

<AdminRoute>

<AddProduct/>

</AdminRoute>

}

/>







<Route

path="/admin/manage-products"

element={

<AdminRoute>

<ManageProducts/>

</AdminRoute>

}

/>






<Route

path="/admin/edit-product/:id"

element={

<AdminRoute>

<EditProduct/>

</AdminRoute>

}

/>







<Route

path="/admin/manage-users"

element={

<AdminRoute>

<ManageUsers/>

</AdminRoute>

}

/>







<Route

path="/admin/manage-orders"

element={

<AdminRoute>

<ManageOrders/>

</AdminRoute>

}

/>






<Route

path="/admin/category"

element={

<AdminRoute>

<CreateCategory/>

</AdminRoute>

}

/>






<Route

path="*"

element={

<div className="container py-5">

<h1
className="
text-center
text-danger
fw-bold
"
>

404 Not Found

</h1>

</div>

}

/>


</Routes>

</BrowserRouter>

)

}

export default App;