import {
  useEffect,
  useState
} from "react";

import toast
from "react-hot-toast";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import WishlistItem
from "../../components/wishlist/WishlistItem";

import {
  getWishlist,
  removeWishlist
} from "../../services/wishlistService";

import {
  addToCart
} from "../../services/productService";

import {
  useCart
} from "../../context/CartContext";



function WishlistPage() {

  const [wishlist, setWishlist] =
    useState([]);

  const {
    fetchWishlistCount,
    fetchCartCount
  } = useCart();


  // =========================
  // FETCH WISHLIST
  // =========================
  const fetchWishlist =
    async () => {

      try {

        const data =
          await getWishlist();

        setWishlist(
          data.wishlist || []
        );

      } catch (error) {

        console.log(error);

        setWishlist([]);
      }
    };


  useEffect(() => {

    fetchWishlist();

  }, []);


  // =========================
  // REMOVE
  // =========================
  const handleRemove =
    async (id) => {

      try {

        await removeWishlist(id);

        // REALTIME UPDATE
        await fetchWishlistCount();

        fetchWishlist();

        toast.success(
          "Removed From Wishlist"
        );

      } catch (error) {

        toast.error(
          "Remove Failed"
        );
      }
    };


  // =========================
  // MOVE TO CART
  // =========================
  const handleMoveCart =
    async (productId) => {

      try {

        await addToCart(productId);

        // REALTIME CART UPDATE
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
            "Failed"
          );
        }
      }
    };


  return (

    <>
      <Navbar />

      <div className="container py-5">

        <h2
          className="
          fw-bold
          mb-5
          "
        >
          Wishlist
        </h2>


        {
          wishlist?.length > 0 ? (

            wishlist.map((item) => (

              <WishlistItem

                key={item.id}

                item={item}

                onRemove={
                  handleRemove
                }

                onMoveCart={
                  handleMoveCart
                }
              />
            ))

          ) : (

            <div
              className="
              alert alert-warning
              "
            >
              Wishlist is empty
            </div>
          )
        }

      </div>

      <Footer />
    </>
  );
}

export default WishlistPage;