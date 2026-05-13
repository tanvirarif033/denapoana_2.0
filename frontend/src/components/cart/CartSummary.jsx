import {
  useNavigate
} from "react-router-dom";



function CartSummary({
  total
}) {

  const navigate =
    useNavigate();


  return (

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
      <h3
        className="
        fw-bold
        mb-4
        "
      >
        Cart Summary
      </h3>


      {/* SUBTOTAL */}
      <div
        className="
        d-flex
        justify-content-between
        mb-4
        "
      >

        <span className="fs-5">
          Subtotal
        </span>

        <strong className="fs-5">
          Tk {total}
        </strong>

      </div>


      {/* NOTE */}
      <div
        className="
        alert
        alert-info
        small
        "
      >
        Delivery charge will be
        calculated at checkout
      </div>


      <hr className="my-4" />


      {/* TOTAL */}
      <div
        className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
        "
      >

        <h2
          className="
          fw-bold
          "
        >
          Total
        </h2>

        <h2
          className="
          fw-bold
          text-warning
          "
        >
          Tk {total}
        </h2>

      </div>


      {/* CHECKOUT BUTTON */}
      <button
        className="
        btn btn-warning
        w-100
        py-3
        fw-bold
        "
        onClick={() =>
          navigate("/checkout")
        }
      >
        Proceed To Checkout
      </button>

    </div>
  );
}

export default CartSummary;