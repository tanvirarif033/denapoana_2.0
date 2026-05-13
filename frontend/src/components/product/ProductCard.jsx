import {
  Link,
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



function ProductCard({
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
  async (e) => {

    e.preventDefault();

    // LOGIN CHECK
    if (!user) {

      toast.error(
        "You have to login first"
      );

      return navigate("/login");
    }

    try {

      const response =
        await addToCart(
          product.id
        );

      // REALTIME UPDATE
      await fetchCartCount();

      // BACKEND MESSAGE
      const message =
        response?.message;

      // SAME PRODUCT
      if (
        message?.includes(
          "quantity updated"
        )
      ) {

        toast.success(
          "Cart quantity increased"
        );

      } else {

        toast.success(
          "Added To Cart"
        );
      }

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Cart Failed"
      );
    }
  };


  // =========================
  // ADD TO WISHLIST
  // =========================
  const handleWishlist =
    async (e) => {

      e.preventDefault();

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

        // REALTIME COUNT
        await fetchWishlistCount();

        toast.success(
          "Added To Wishlist"
        );

      } catch (error) {

        // ALREADY EXISTS
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

    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">

      <Link
        to={`/product/${product.id}`}
        className="
        text-dark
        text-decoration-none
        "
      >

        <div
          className="
          card
          border-0
          shadow-sm
          h-100
          overflow-hidden
          "
          style={{
            borderRadius: "16px",
            transition: "0.3s"
          }}
        >

          {/* IMAGE */}
          <div className="overflow-hidden">

            <img
              src={
                product.images?.[0]
              }

              alt={product.title}

              className="
              card-img-top
              "
              style={{
                height: "250px",
                objectFit: "cover"
              }}
            />

          </div>


          {/* BODY */}
          <div className="card-body">

            {/* TITLE */}
            <h5
              className="
              fw-bold
              mb-2
              "
            >
              {product.title}
            </h5>


            {/* DESCRIPTION */}
            <p
              className="
              text-muted
              small
              "
            >
              {
                product.description
                  ?.slice(0, 70)
              }
              ...
            </p>


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
            <h4
              className="
              text-warning
              fw-bold
              "
            >
              Tk {product.price}
            </h4>

          </div>


          {/* FOOTER */}
          <div
            className="
            d-flex
            justify-content-between
            align-items-center
            px-3
            pb-3
            "
          >

            {/* CART */}
            <button
              className="
              btn btn-dark
              btn-sm
              px-4
              py-2
              fw-semibold
              "
              onClick={handleAddCart}
            >

              <FaShoppingCart />

              <span className="ms-2">
                Cart
              </span>

            </button>


            {/* WISHLIST */}
            <button
              className="
              btn btn-outline-danger
              btn-sm
              px-3
              py-2
              "
              onClick={handleWishlist}
            >

              <FaHeart />

            </button>

          </div>

        </div>

      </Link>

    </div>
  );
}

export default ProductCard;