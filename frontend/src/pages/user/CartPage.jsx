import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import toast
from "react-hot-toast";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import CartItem
from "../../components/cart/CartItem";

import CartSummary
from "../../components/cart/CartSummary";

import {

  getCart,

  increaseQuantity,

  decreaseQuantity,

  removeCartItem

} from "../../services/cartService";

import {
  useCart
} from "../../context/CartContext";



function CartPage() {

  const navigate =
    useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [total, setTotal] =
    useState(0);

  const {
    fetchCartCount
  } = useCart();


  // =========================
  // FETCH CART
  // =========================
  const fetchCart =
    async () => {

      try {

        const data =
          await getCart();

        console.log(data);

        // FIXED
        setCartItems(
          data.cartItems || []
        );

      } catch (error) {

        console.log(error);

        setCartItems([]);
      }
    };


  // =========================
  // TOTAL CALCULATION
  // =========================
  useEffect(() => {

    const cartTotal =
      cartItems.reduce(

        (acc, item) =>

          acc +
          (
            item.product.price *
            item.quantity
          ),

        0
      );

    setTotal(cartTotal);

  }, [cartItems]);


  // =========================
  // LOAD CART
  // =========================
  useEffect(() => {

    fetchCart();

  }, []);


  // =========================
  // INCREASE QUANTITY
  // =========================
  const handleIncrease =
    async (id) => {

      try {

        await increaseQuantity(id);

        await fetchCart();

        await fetchCartCount();

      } catch (error) {

        toast.error(
          "Increase Failed"
        );
      }
    };


  // =========================
  // DECREASE QUANTITY
  // =========================
  const handleDecrease =
    async (id) => {

      try {

        await decreaseQuantity(id);

        await fetchCart();

        await fetchCartCount();

      } catch (error) {

        toast.error(
          "Decrease Failed"
        );
      }
    };


  // =========================
  // REMOVE ITEM
  // =========================
  const handleRemove =
    async (id) => {

      try {

        await removeCartItem(id);

        toast.success(
          "Removed From Cart"
        );

        // REALTIME UPDATE
        await fetchCart();

        await fetchCartCount();

      } catch (error) {

        toast.error(
          "Remove Failed"
        );
      }
    };


  return (

    <>
      <Navbar />

      <div className="container py-5">

        {/* TITLE */}
        <div
          className="
          d-flex
          justify-content-between
          align-items-center
          mb-5
          "
        >

          <h2
            className="
            fw-bold
            "
          >
            Shopping Cart
          </h2>


          <span
            className="
            badge
            bg-dark
            fs-6
            px-3
            py-2
            "
          >
            {cartItems.length} Items
          </span>

        </div>


        <div className="row g-4">

          {/* CART ITEMS */}
          <div className="col-lg-8">

            {
              cartItems?.length > 0 ? (

                cartItems.map((item) => (

                  <CartItem

                    key={item.id}

                    item={item}

                    onIncrease={
                      handleIncrease
                    }

                    onDecrease={
                      handleDecrease
                    }

                    onRemove={
                      handleRemove
                    }
                  />
                ))

              ) : (

                <div
                  className="
                  card
                  border-0
                  shadow-sm
                  p-5
                  text-center
                  "
                >

                  <h3
                    className="
                    fw-bold
                    mb-3
                    "
                  >
                    Your cart is empty
                  </h3>

                  <p
                    className="
                    text-muted
                    mb-4
                    "
                  >
                    Add products to continue shopping
                  </p>

                  <button
                    className="
                    btn btn-warning
                    fw-bold
                    px-4
                    py-2
                    "
                    onClick={() =>
                      navigate("/")
                    }
                  >
                    Continue Shopping
                  </button>

                </div>
              )
            }

          </div>


          {/* SUMMARY */}
          <div className="col-lg-4">

            <CartSummary
              total={total}
            />

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default CartPage;