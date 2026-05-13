import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaUserShield
} from "react-icons/fa";

import {
  useAuth
} from "../../context/AuthContext";

import {
  useCart
} from "../../context/CartContext";

import toast
from "react-hot-toast";



function Navbar() {

  const {
    user,
    logout
  } = useAuth();


  const {

    cartCount,
    wishlistCount,

    resetCounts

  } = useCart();


  const navigate =
    useNavigate();




  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    logout();

    resetCounts();

    toast.success(
      "Logout Successful"
    );

    navigate("/login");
  };




  return (

    <nav
      className="
      navbar
      navbar-expand-lg
      navbar-dark
      bg-dark
      shadow-sm
      py-3
      "
    >

      <div className="container">


        {/* LOGO */}
        <Link
          className="
          navbar-brand
          fw-bold
          text-warning
          fs-1
          "
          to="/"
        >
          DenaPoana 2.0
        </Link>




        {/* RIGHT SIDE */}
        <div
          className="
          d-flex
          align-items-center
          gap-4
          "
        >


          {/* ADMIN */}
          {
            user?.role ===
            "ADMIN" && (

              <Link
                className="
                btn btn-warning
                fw-bold
                "
                to="/admin"
              >

                <FaUserShield />
                {" "}
                Admin

              </Link>
            )
          }




          {/* WISHLIST */}
          <Link
            className="
            text-white
            position-relative
            "
            to="/wishlist"
          >

            <FaHeart size={24} />

            {
              wishlistCount > 0 && (

                <span
                  className="
                  position-absolute
                  top-0
                  start-100
                  translate-middle
                  badge
                  rounded-pill
                  bg-danger
                  "
                >
                  {wishlistCount}
                </span>
              )
            }

          </Link>




          {/* CART */}
          <Link
            className="
            text-white
            position-relative
            "
            to="/cart"
          >

            <FaShoppingCart size={24} />

            {
              cartCount > 0 && (

                <span
                  className="
                  position-absolute
                  top-0
                  start-100
                  translate-middle
                  badge
                  rounded-pill
                  bg-warning
                  text-dark
                  "
                >
                  {cartCount}
                </span>
              )
            }

          </Link>




          {/* PROFILE */}
          {
            user ? (

              <>

                {/* PROFILE ICON */}
                <Link
                  className="
                  text-white
                  "
                  to="/profile"
                >

                  <FaUser size={24} />

                </Link>



                {/* USER NAME */}
                <span
                  className="
                  text-white
                  fw-bold
                  "
                >
                  {user.name}
                </span>



                {/* LOGOUT */}
                <button
                  className="
                  btn btn-warning
                  fw-bold
                  "
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                {/* LOGIN */}
                <Link
                  className="
                  btn btn-outline-light
                  "
                  to="/login"
                >
                  Login
                </Link>



                {/* REGISTER */}
                <Link
                  className="
                  btn btn-warning
                  fw-bold
                  "
                  to="/register"
                >
                  Register
                </Link>

              </>
            )
          }

        </div>

      </div>

    </nav>
  );
}

export default Navbar;