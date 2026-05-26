import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaShoppingCart,
  FaStar
} from "react-icons/fa";

import {
  addToCart,
  addToWishlist
} from "../../services/productService";

import { useAuth }
from "../../context/AuthContext";

import { useCart }
from "../../context/CartContext";

import ReviewSection
from "./ReviewSection";


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



  if (!product) {

    return (

      <div
        className="
        container
        py-5
        text-center
        "
      >

        <div
          className="
          spinner-border
          text-warning
          "
        />

        <p className="mt-3">

          Loading Product...

        </p>

      </div>

    )

  }



  const [
    selectedImage,

    setSelectedImage

  ] = useState(

    product.images?.[0]

    ||

    "https://placehold.co/600"

  );



  // ADD CART

  const handleAddCart =
    async () => {

      if (!user) {

        toast.error(
          "Login first"
        );

        navigate("/login");

        return;

      }


      try {

        await addToCart(
          product.id
        );


        await fetchCartCount();


        toast.success(
          "Added To Cart"
        );

      }

      catch {

        toast.error(
          "Cart Failed"
        );

      }

    };



  // WISHLIST

  const handleWishlist =
    async () => {

      if (!user) {

        toast.error(
          "Login first"
        );

        navigate("/login");

        return;

      }


      try {

        await addToWishlist(
          product.id
        );

        await fetchWishlistCount();

        toast.success(
          "Added To Wishlist"
        );

      }

      catch {

        toast.error(
          "Wishlist Failed"
        );

      }

    };



  return (

    <>

      <div
        className="
        row
        g-5
        "
      >



        {/* IMAGE */}

        <div
          className="
          col-lg-6
          "
        >

          <img

            src={selectedImage}

            alt=""

            className="
            img-fluid
            rounded
            shadow
            w-100
            "

            style={{

              height:
                "500px",

              objectFit:
                "cover"

            }}

          />



          <div
            className="
            d-flex
            gap-2
            mt-3
            flex-wrap
            "
          >

            {

              product.images?.map(

                (img, index) => (

                  <img

                    key={index}

                    src={img}

                    alt=""

                    onClick={() =>

                      setSelectedImage(
                        img
                      )

                    }

                    style={{

                      width: "70px",

                      height: "70px",

                      cursor:
                        "pointer",

                      border:

                        selectedImage === img

                          ?

                          "2px solid orange"

                          :

                          "1px solid #ddd",


                      borderRadius:
                        "10px",

                      objectFit:
                        "cover"

                    }}

                  />

                )

              )

            }

          </div>

        </div>





        {/* DETAILS */}

        <div
          className="
          col-lg-6
          "
        >

          <h2
            className="
            fw-bold
            mb-3
            "
          >

            {product.title}

          </h2>



          <div
            className="
            d-flex
            align-items-center
            gap-2
            "
          >

            <FaStar
              color="orange"
            />

            {

              product.rating

              ||

              0

            }

          </div>



          <h2
            className="
            text-warning
            my-4
            "
          >

            Tk {product.price}

          </h2>



          <p>

            {product.description}

          </p>



          <div
            className="
            d-flex
            gap-3
            mt-4
            "
          >

            <button

              className="
              btn
              btn-warning
              "

              onClick={
                handleAddCart
              }

            >

              <FaShoppingCart />

              Add To Cart

            </button>



            <button

              className="
              btn
              btn-outline-danger
              "

              onClick={
                handleWishlist
              }

            >

              <FaHeart />

            </button>

          </div>

        </div>

      </div>



      <div
        className="
        mt-5
        "
      >

        <ReviewSection

          productId={
            product.id
          }

        />

      </div>

    </>

  )

}

export default ProductDetails;