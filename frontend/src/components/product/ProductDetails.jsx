import {
  useNavigate
} from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaStar
} from "react-icons/fa";

import toast
from "react-hot-toast";

import {
  addToCart,
  addToWishlist
} from "../../services/productService";

import {
  useAuth
} from "../../context/AuthContext";

import {
  useCart
} from "../../context/CartContext";



function ProductDetails({
  product
}) {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const {
    fetchCartCount,
    fetchWishlistCount
  } = useCart();


  // =========================
  // ADD TO CART
  // =========================
  const handleAddCart =
    async () => {

      // LOGIN CHECK
      if (!user) {

        toast.error(
          "You have to login first"
        );

        return navigate("/login");
      }

      try {

        await addToCart(
          product.id
        );

        await fetchCartCount();

        toast.success(
          "Added To Cart"
        );

      } catch (error) {

        if (

          error.response?.data?.message
            ?.toLowerCase()
            .includes("already")

        ) {

          toast(
            "Product already added in cart"
          );

        } else {

          toast.error(
            error.response?.data?.message ||

            "Cart Failed"
          );
        }
      }
    };


  // =========================
  // WISHLIST
  // =========================
  const handleWishlist =
    async () => {

      // LOGIN CHECK
      if (!user) {

        toast.error(
          "You have to login first"
        );

        return navigate("/login");
      }

      try {

        await addToWishlist(
          product.id
        );

        await fetchWishlistCount();

        toast.success(
          "Added To Wishlist"
        );

      } catch (error) {

        if (

          error.response?.data?.message
            ?.toLowerCase()
            .includes("already")

        ) {

          toast(
            "This product is already in wishlist"
          );

        } else {

          toast.error(
            error.response?.data?.message ||

            "Wishlist Failed"
          );
        }
      }
    };


  return (

    <div className="row g-5">

      {/* IMAGE */}
      <div className="col-lg-6">

        <img
          src={
            product.images?.[0]
          }

          alt={product.title}

          className="
          img-fluid
          rounded
          shadow-sm
          "
        />

      </div>


      {/* DETAILS */}
      <div className="col-lg-6">

        <h2
          className="
          fw-bold
          mb-3
          "
        >
          {product.title}
        </h2>


        {/* RATING */}
        <div
          className="
          d-flex
          align-items-center
          gap-2
          mb-3
          "
        >

          <FaStar color="orange" />

          <span>
            {product.rating || 0}
          </span>

        </div>


        {/* PRICE */}
        <h3
          className="
          text-warning
          fw-bold
          mb-4
          "
        >
          Tk {product.price}
        </h3>


        {/* DESCRIPTION */}
        <p
          className="
          text-muted
          fs-5
          "
        >
          {product.description}
        </p>


        {/* BUTTONS */}
        <div
          className="
          d-flex
          gap-3
          mt-4
          "
        >

          {/* CART */}
          <button
            className="
            btn btn-warning
            px-4
            "
            onClick={handleAddCart}
          >

            <FaShoppingCart />

            <span className="ms-2">
              Add To Cart
            </span>

          </button>


          {/* WISHLIST */}
          <button
            className="
            btn btn-outline-danger
            "
            onClick={handleWishlist}
          >

            <FaHeart />

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;