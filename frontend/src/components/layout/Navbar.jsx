import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUser
} from "react-icons/fa";

import {
  useAuth
} from "../../context/AuthContext";



function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();


  // handle logout
  const handleLogout = () => {

    logout();

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
          fs-4
          "
          to="/"
        >
          DenPoana 2.0
        </Link>


        {/* RIGHT SIDE */}
        <div
          className="
          d-flex
          align-items-center
          gap-3
          "
        >

          {/* WISHLIST */}
          <Link
            className="
            text-white
            position-relative
            "
            to="/wishlist"
          >
            <FaHeart size={22} />
          </Link>


          {/* CART */}
          <Link
            className="
            text-white
            position-relative
            "
            to="/cart"
          >
            <FaShoppingCart size={22} />
          </Link>


          {
            user ? (

              <>
                {/* PROFILE */}
                <Link
                  className="
                  text-white
                  "
                  to="/profile"
                >
                  <FaUser size={22} />
                </Link>


                {/* USER NAME */}
                <span
                  className="
                  text-white
                  fw-semibold
                  "
                >
                  {user.name}
                </span>


                {/* LOGOUT */}
                <button
                  className="
                  btn
                  btn-warning
                  btn-sm
                  fw-semibold
                  px-3
                  "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>

            ) : (

              <>
                {/* LOGIN */}
                <Link
                  className="
                  btn
                  btn-outline-light
                  btn-sm
                  px-3
                  fw-semibold
                  "
                  to="/login"
                >
                  Login
                </Link>


                {/* REGISTER */}
                <Link
                  className="
                  btn
                  btn-warning
                  btn-sm
                  px-3
                  fw-semibold
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