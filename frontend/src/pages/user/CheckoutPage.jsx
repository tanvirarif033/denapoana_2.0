import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Elements
} from "@stripe/react-stripe-js";

import toast
from "react-hot-toast";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import {
  getCart
} from "../../services/cartService";

import api
from "../../api/axios";

import {
  stripePromise
} from "../../lib/stripe";

import StripeCheckoutForm
from "../../components/checkout/StripeCheckoutForm";

import {
  useCart
} from "../../context/CartContext";



function CheckoutPage() {

  const navigate =
    useNavigate();

  const {
    fetchCartCount
  } = useCart();


  // =========================
  // STATES
  // =========================
  const [cartItems, setCartItems] =
    useState([]);

  const [subtotal, setSubtotal] =
    useState(0);

  const [paymentMethod,
    setPaymentMethod] =
    useState("cod");

  const [loading,
    setLoading] =
    useState(false);


  const [shippingData,
    setShippingData] =
    useState({

      fullName: "",
      phone: "",
      city: "",
      area: "",
      address: "",

      bkashNumber: "",
      nagadNumber: ""
    });


  // =========================
  // DELIVERY CHARGE
  // =========================
  const deliveryCharge =

    shippingData.city
      .trim()
      .toLowerCase() ===
      "dhaka"

      ? 70
      : 120;


  // =========================
  // FINAL TOTAL
  // =========================
  const finalTotal =
    subtotal +
    deliveryCharge;


  // =========================
  // FETCH CART
  // =========================
  const fetchCart =
    async () => {

      try {

        const data =
          await getCart();

        const items =
          data.cartItems || [];

        setCartItems(items);


        // subtotal
        const total =
          items.reduce(

            (acc, item) =>

              acc +
              (
                item.product.price *
                item.quantity
              ),

            0
          );

        setSubtotal(total);

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    fetchCart();

  }, []);


  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange =
    (e) => {

      setShippingData({

        ...shippingData,

        [e.target.name]:
          e.target.value
      });
    };


  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder =
    async () => {

      try {

        // VALIDATION
        if (
          !shippingData.fullName ||
          !shippingData.phone ||
          !shippingData.city ||
          !shippingData.area ||
          !shippingData.address
        ) {

          return toast.error(
            "Please fill all fields"
          );
        }


        // BKASH VALIDATION
        if (
          paymentMethod ===
          "bkash"
        ) {

          const regex =
            /^01[3-9]\d{8}$/;

          if (
            !regex.test(
              shippingData.bkashNumber
            )
          ) {

            return toast.error(
              "Enter valid bKash number"
            );
          }
        }


        // NAGAD VALIDATION
        if (
          paymentMethod ===
          "nagad"
        ) {

          const regex =
            /^01[3-9]\d{8}$/;

          if (
            !regex.test(
              shippingData.nagadNumber
            )
          ) {

            return toast.error(
              "Enter valid Nagad number"
            );
          }
        }


        setLoading(true);


        // =========================
        // FULL ADDRESS
        // =========================
        const fullAddress = `
${shippingData.address},
${shippingData.area},
${shippingData.city}
        `;


        // =========================
        // API REQUEST
        // =========================
        const response =
          await api.post(
            "/orders",
            {

              address:
                fullAddress,

              paymentMethod:
                paymentMethod.toUpperCase(),

              phone:
                shippingData.phone
            }
          );


        // =========================
        // SUCCESS
        // =========================
        if (
          response.data.success
        ) {

          toast.success(
            "Payment Successful"
          );


          // realtime navbar update
          fetchCartCount();


          // redirect
          navigate(
            "/payment-success"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data?.message ||

          "Order Failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div className="row g-4">


          {/* ===================================== */}
          {/* LEFT SIDE */}
          {/* ===================================== */}
          <div className="col-lg-7">

            <div
              className="
              card
              border-0
              shadow-sm
              p-4
              "
              style={{
                borderRadius: "15px"
              }}
            >

              {/* TITLE */}
              <h2
                className="
                fw-bold
                mb-4
                "
              >
                Shipping Address
              </h2>


              {/* FORM */}
              <div className="row">


                {/* FULL NAME */}
                <div className="col-md-6 mb-3">

                  <input
                    type="text"

                    className="form-control"

                    placeholder="Full Name"

                    name="fullName"

                    value={
                      shippingData.fullName
                    }

                    onChange={
                      handleChange
                    }
                  />

                </div>


                {/* PHONE */}
                <div className="col-md-6 mb-3">

                  <input
                    type="text"

                    className="form-control"

                    placeholder="Phone Number"

                    name="phone"

                    value={
                      shippingData.phone
                    }

                    onChange={
                      handleChange
                    }
                  />

                </div>


              {/* CITY */}
            <div className="col-md-6 mb-3">

     <input
    type="text"

    className="form-control"

    placeholder="Enter City"

    name="city"

    value={
      shippingData.city
    }

    onChange={
      handleChange
    }
  />

  <small className="text-muted">

    Dhaka City Delivery:
    Tk 70 |
    Other Cities:
    Tk 120

  </small>

</div>


                {/* AREA */}
                <div className="col-md-6 mb-3">

                  <input
                    type="text"

                    className="form-control"

                    placeholder="Area"

                    name="area"

                    value={
                      shippingData.area
                    }

                    onChange={
                      handleChange
                    }
                  />

                </div>


                {/* ADDRESS */}
                <div className="col-12 mb-4">

                  <textarea
                    rows="5"

                    className="form-control"

                    placeholder="Full Address"

                    name="address"

                    value={
                      shippingData.address
                    }

                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>



              {/* ===================================== */}
              {/* PAYMENT METHOD */}
              {/* ===================================== */}
              <h3
                className="
                fw-bold
                mb-4
                "
              >
                Payment Method
              </h3>


              <div className="d-flex flex-column gap-4">


                {/* STRIPE */}
                <div>

                  <input
                    type="radio"

                    checked={
                      paymentMethod ===
                      "stripe"
                    }

                    onChange={() =>
                      setPaymentMethod(
                        "stripe"
                      )
                    }
                  />

                  <span className="ms-2 fw-semibold">
                    Credit/Debit Card (Stripe)
                  </span>

                </div>


                {/* STRIPE CARD */}
                {
                  paymentMethod ===
                  "stripe" && (

                    <div
                      className="
                      border
                      rounded
                      p-3
                      "
                    >

                      <p
                        className="
                        fw-semibold
                        mb-3
                        "
                      >
                        Enter Card Details
                      </p>

                      <Elements
                        stripe={
                          stripePromise
                        }
                      >

                        <StripeCheckoutForm

                          total={
                            finalTotal
                          }

                          shippingData={
                            shippingData
                          }

                          fetchCartCount={
                            fetchCartCount
                          }
                        />

                      </Elements>

                    </div>
                  )
                }



                {/* BKASH */}
                <div>

                  <input
                    type="radio"

                    checked={
                      paymentMethod ===
                      "bkash"
                    }

                    onChange={() =>
                      setPaymentMethod(
                        "bkash"
                      )
                    }
                  />

                  <span className="ms-2 fw-semibold">
                    bKash
                  </span>

                </div>


                {/* BKASH NUMBER */}
                {
                  paymentMethod ===
                  "bkash" && (

                    <input
                      type="text"

                      className="form-control"

                      placeholder="Enter bKash Number"

                      name="bkashNumber"

                      value={
                        shippingData.bkashNumber
                      }

                      onChange={
                        handleChange
                      }
                    />
                  )
                }



                {/* NAGAD */}
                <div>

                  <input
                    type="radio"

                    checked={
                      paymentMethod ===
                      "nagad"
                    }

                    onChange={() =>
                      setPaymentMethod(
                        "nagad"
                      )
                    }
                  />

                  <span className="ms-2 fw-semibold">
                    Nagad
                  </span>

                </div>


                {/* NAGAD NUMBER */}
                {
                  paymentMethod ===
                  "nagad" && (

                    <input
                      type="text"

                      className="form-control"

                      placeholder="Enter Nagad Number"

                      name="nagadNumber"

                      value={
                        shippingData.nagadNumber
                      }

                      onChange={
                        handleChange
                      }
                    />
                  )
                }



                {/* COD */}
                <div>

                  <input
                    type="radio"

                    checked={
                      paymentMethod ===
                      "cod"
                    }

                    onChange={() =>
                      setPaymentMethod(
                        "cod"
                      )
                    }
                  />

                  <span className="ms-2 fw-semibold">
                    Cash On Delivery
                  </span>

                </div>

              </div>

            </div>

          </div>



          {/* ===================================== */}
          {/* RIGHT SIDE */}
          {/* ===================================== */}
          <div className="col-lg-5">

            <div
              className="
              card
              border-0
              shadow-sm
              p-4
              "
              style={{
                borderRadius: "15px"
              }}
            >

              {/* TITLE */}
              <h2
                className="
                fw-bold
                mb-4
                "
              >
                Order Summary
              </h2>


              {/* PRODUCTS */}
              <div className="mb-4">

                {
                  cartItems.map((item) => (

                    <div
                      key={item.id}

                      className="
                      d-flex
                      justify-content-between
                      align-items-center
                      mb-3
                      "
                    >

                      <div>

                        <p
                          className="
                          mb-1
                          fw-semibold
                          "
                        >
                          {
                            item.product.title
                          }
                        </p>

                        <small
                          className="
                          text-muted
                          "
                        >
                          Qty:
                          {item.quantity}
                        </small>

                      </div>

                      <strong>
                        Tk {
                          item.product.price *
                          item.quantity
                        }
                      </strong>

                    </div>
                  ))
                }

              </div>


              <hr />


              {/* SUBTOTAL */}
              <div
                className="
                d-flex
                justify-content-between
                mb-3
                "
              >

                <span className="fs-5">
                  Subtotal
                </span>

                <strong className="fs-5">
                  Tk {subtotal}
                </strong>

              </div>


              {/* DELIVERY */}
              <div
                className="
                d-flex
                justify-content-between
                mb-3
                "
              >

                <span className="fs-5">
                  Delivery
                </span>

                <strong className="fs-5">
                  Tk {deliveryCharge}
                </strong>

              </div>


              <hr />


              {/* TOTAL */}
              <div
                className="
                d-flex
                justify-content-between
                align-items-center
                mb-5
                "
              >

                <h2 className="fw-bold">
                  Total
                </h2>

                <h2
                  className="
                  fw-bold
                  text-warning
                  "
                >
                  Tk {finalTotal}
                </h2>

              </div>



              {/* PLACE ORDER BUTTON */}
              {
                paymentMethod !==
                "stripe" && (

                  <button
                    className="
                    btn btn-warning
                    w-100
                    py-3
                    fw-bold
                    "
                    onClick={
                      handlePlaceOrder
                    }
                  >

                    {
                      loading
                        ? "Processing..."
                        : "Place Order"
                    }

                  </button>
                )
              }

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default CheckoutPage;