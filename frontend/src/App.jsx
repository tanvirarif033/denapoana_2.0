import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


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

<Routes>



{/* ======================
HOME
====================== */}

<Route
path="/"
element={
<HomePage/>
}
/>






{/* ======================
LOGIN
====================== */}

<Route
path="/login"
element={
<LoginPage/>
}
/>







{/* ======================
REGISTER
====================== */}

<Route
path="/register"
element={
<RegisterPage/>
}
/>








{/* ======================
PRODUCT DETAILS
====================== */}

<Route
path="/product/:id"
element={
<ProductDetailsPage/>
}
/>









{/* ======================
CART
====================== */}

<Route

path="/cart"

element={

<ProtectedRoute>

<CartPage/>

</ProtectedRoute>

}

/>










{/* ======================
WISHLIST
====================== */}

<Route

path="/wishlist"

element={

<ProtectedRoute>

<WishlistPage/>

</ProtectedRoute>

}

/>









{/* ======================
CHECKOUT
====================== */}

<Route

path="/checkout"

element={

<ProtectedRoute>

<CheckoutPage/>

</ProtectedRoute>

}

/>










{/* ======================
PAYMENT SUCCESS
====================== */}

<Route

path="/payment-success"

element={

<ProtectedRoute>

<PaymentSuccessPage/>

</ProtectedRoute>

}

/>










{/* ======================
USER DASHBOARD
====================== */}

<Route

path="/dashboard"

element={

<ProtectedRoute>

<DashboardPage/>

</ProtectedRoute>

}

/>











{/* ======================
PROFILE
====================== */}

<Route

path="/profile"

element={

<ProtectedRoute>

<ProfilePage/>

</ProtectedRoute>

}

/>









{/* ======================
ADMIN DASHBOARD
====================== */}

<Route

path="/admin"

element={

<AdminRoute>

<AdminDashboard/>

</AdminRoute>

}

/>










{/* ======================
ADD PRODUCT
====================== */}

<Route

path="/admin/add-product"

element={

<AdminRoute>

<AddProduct/>

</AdminRoute>

}

/>











{/* ======================
MANAGE PRODUCTS
====================== */}

<Route

path="/admin/manage-products"

element={

<AdminRoute>

<ManageProducts/>

</AdminRoute>

}

/>









{/* ======================
EDIT PRODUCT
====================== */}

<Route

path="/admin/edit-product/:id"

element={

<AdminRoute>

<EditProduct/>

</AdminRoute>

}

/>










{/* ======================
MANAGE USERS
====================== */}

<Route

path="/admin/manage-users"

element={

<AdminRoute>

<ManageUsers/>

</AdminRoute>

}

/>











{/* ======================
MANAGE ORDERS
====================== */}

<Route

path="/admin/manage-orders"

element={

<AdminRoute>

<ManageOrders/>

</AdminRoute>

}

/>











{/* ======================
CREATE CATEGORY
====================== */}

<Route

path="/admin/category"

element={

<AdminRoute>

<CreateCategory/>

</AdminRoute>

}

/>









{/* ======================
404 PAGE
====================== */}

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