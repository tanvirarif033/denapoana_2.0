import {
  FaPlus,
  FaMinus,
  FaTrash
} from "react-icons/fa";



function CartItem({

  item,

  onIncrease,

  onDecrease,

  onRemove
}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      mb-3
      "
    >

      <div className="card-body">

        <div className="row align-items-center">

          {/* IMAGE */}
          <div className="col-md-2">

            <img
              src={
                item.product.images?.[0]
              }

              alt={item.product.title}

              className="
              img-fluid
              rounded
              "
            />

          </div>


          {/* INFO */}
          <div className="col-md-4">

            <h5
              className="
              fw-bold
              "
            >
              {item.product.title}
            </h5>

            <p
              className="
              text-muted
              "
            >
              Tk {item.product.price}
            </p>

          </div>


          {/* QUANTITY */}
          <div className="col-md-3">

            <div
              className="
              d-flex
              align-items-center
              gap-3
              "
            >

              <button
                className="
                btn btn-outline-dark
                btn-sm
                "
                onClick={() =>
                  onDecrease(item.id)
                }
              >

                <FaMinus />

              </button>


              <span
                className="
                fw-bold
                "
              >
                {item.quantity}
              </span>


              <button
                className="
                btn btn-outline-dark
                btn-sm
                "
                onClick={() =>
                  onIncrease(item.id)
                }
              >

                <FaPlus />

              </button>

            </div>

          </div>


          {/* TOTAL */}
          <div className="col-md-2">

            <h6
              className="
              fw-bold
              text-warning
              "
            >
              Tk {
                item.quantity *
                item.product.price
              }
            </h6>

          </div>


          {/* REMOVE */}
          <div className="col-md-1">

            <button
              className="
              btn btn-danger btn-sm
              "
              onClick={() =>
                onRemove(item.id)
              }
            >

              <FaTrash />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartItem;