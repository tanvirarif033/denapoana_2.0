import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";

import {
  useState
} from "react";

import toast
from "react-hot-toast";

import api
from "../../api/axios";

import {
  useNavigate
} from "react-router-dom";



function StripeCheckoutForm({
  total,
  shippingData
}) {

  const stripe =
    useStripe();

  const elements =
    useElements();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);


  // ============================
  // HANDLE PAYMENT
  // ============================
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        // CREATE PAYMENT INTENT
        const response =
          await api.post(
            "/payments/create-payment-intent",
            {
              amount: total
            }
          );

        const clientSecret =
          response.data.clientSecret;


        // CARD ELEMENT
        const cardElement =
          elements.getElement(
            CardElement
          );


        // CONFIRM PAYMENT
        const result =
          await stripe.confirmCardPayment(

            clientSecret,

            {
              payment_method: {

                card:
                  cardElement,

                billing_details:
                {
                  name:
                    shippingData.fullName
                }
              }
            }
          );


        if (result.error) {

          return toast.error(
            result.error.message
          );
        }


        if (
          result.paymentIntent
            .status ===
          "succeeded"
        ) {

          toast.success(
            "Payment Successful"
          );

          navigate(
            "/payment-success"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Stripe Payment Failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <form
      onSubmit={handleSubmit}
      className="mt-4"
    >

      {/* CARD UI */}
      <div
        className="
        border
        rounded
        p-3
        bg-white
        "
      >

        <CardElement

          options={{

            style: {

              base: {

                fontSize:
                  "16px",

                color:
                  "#424770",

                "::placeholder":
                {
                  color:
                    "#aab7c4"
                }
              }
            }
          }}
        />

      </div>


      {/* BUTTON */}
      <button
        type="submit"

        disabled={
          !stripe || loading
        }

        className="
        btn btn-dark
        w-100
        mt-4
        py-3
        fw-bold
        "
      >

        {
          loading
            ? "Processing..."
            : `Pay Tk ${total}`
        }

      </button>

    </form>
  );
}

export default StripeCheckoutForm;