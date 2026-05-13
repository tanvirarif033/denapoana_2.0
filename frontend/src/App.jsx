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


// ===========================
// ROUTES
// ===========================

import ProtectedRoute
from "./routes/ProtectedRoute";



function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =======================
            HOME
        ======================= */}
        <Route
          path="/"
          element={<HomePage />}
        />


        {/* =======================
            LOGIN
        ======================= */}
        <Route
          path="/login"
          element={<LoginPage />}
        />


        {/* =======================
            REGISTER
        ======================= */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />


        {/* =======================
            PRODUCT DETAILS
        ======================= */}
        <Route
          path="/product/:id"

          element={
            <ProductDetailsPage />
          }
        />


        {/* =======================
            CART
        ======================= */}
        <Route
          path="/cart"

          element={

            <ProtectedRoute>

              <CartPage />

            </ProtectedRoute>
          }
        />


        {/* =======================
            WISHLIST
        ======================= */}
        <Route
          path="/wishlist"

          element={

            <ProtectedRoute>

              <WishlistPage />

            </ProtectedRoute>
          }
        />


        {/* =======================
            CHECKOUT
        ======================= */}
        <Route
          path="/checkout"

          element={

            <ProtectedRoute>

              <CheckoutPage />

            </ProtectedRoute>
          }
        />


        {/* =======================
            PAYMENT SUCCESS
        ======================= */}
        <Route
          path="/payment-success"

          element={

            <ProtectedRoute>

              <PaymentSuccessPage />

            </ProtectedRoute>
          }
        />


        {/* =======================
            PROFILE
        ======================= */}
        <Route
          path="/profile"

          element={

            <ProtectedRoute>

              <div className="container py-5">

                <h2
                  className="
                  text-center
                  fw-bold
                  "
                >
                  Profile Page
                </h2>

              </div>

            </ProtectedRoute>
          }
        />


        {/* =======================
            404 PAGE
        ======================= */}
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
  );
}

export default App;