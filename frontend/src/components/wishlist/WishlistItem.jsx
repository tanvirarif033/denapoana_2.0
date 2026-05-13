import {
  FaTrash,
  FaShoppingCart
} from "react-icons/fa";



function WishlistItem({

  item,

  onRemove,

  onMoveCart
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
          <div className="col-md-5">

            <h5
              className="
              fw-bold
              "
            >
              {item.product.title}
            </h5>

            <p
              className="
              text-warning
              fw-bold
              "
            >
              Tk {item.product.price}
            </p>

          </div>


          {/* BUTTONS */}
          <div className="col-md-5">

            <div
              className="
              d-flex
              gap-3
              "
            >

              <button
                className="
                btn btn-dark
                "
                onClick={() =>
                  onMoveCart(
                    item.product.id
                  )
                }
              >

                <FaShoppingCart />

                <span className="ms-2">
                  Move To Cart
                </span>

              </button>


              <button
                className="
                btn btn-danger
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

    </div>
  );
}

export default WishlistItem;