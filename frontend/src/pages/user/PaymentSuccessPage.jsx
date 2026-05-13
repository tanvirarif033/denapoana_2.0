import {
  Link
} from "react-router-dom";

import Navbar
from "../../components/layout/Navbar";



function PaymentSuccessPage() {

  return (

    <>
      <Navbar />

      <div
        className="
        container
        py-5
        text-center
        "
      >

        <div
          className="
          card
          border-0
          shadow-sm
          p-5
          mx-auto
          "
          style={{
            maxWidth: "600px"
          }}
        >

          <h1
            className="
            text-success
            fw-bold
            mb-4
            "
          >
            Payment Successful
          </h1>

          <p
            className="
            fs-5
            text-muted
            mb-4
            "
          >
            Thank you for shopping
            with DenaPoana 2.0
          </p>


          <Link
            to="/"

            className="
            btn btn-warning
            px-5
            py-2
            fw-bold
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </>
  );
}

export default PaymentSuccessPage;