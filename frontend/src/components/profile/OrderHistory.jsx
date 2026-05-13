import {
  Badge
} from "react-bootstrap";


function OrderHistory({
  orders
}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      p-4
      "
    >

      <h3
        className="
        fw-bold
        mb-4
        "
      >
        Order History
      </h3>


      {
        orders?.length > 0 ? (

          orders.map((order) => (

            <div
              key={order.id}

              className="
              border
              rounded
              p-3
              mb-4
              "
            >

              {/* TOP */}
              <div
                className="
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
                mb-4
                "
              >

                {/* ORDER ID */}
                <div>

                  <h6 className="fw-bold">
                    Order ID
                  </h6>

                  <p
                    className="
                    text-muted
                    small
                    "
                  >
                    {order.id}
                  </p>

                </div>


                {/* STATUS */}
                <div>

                  <h6 className="fw-bold">
                    Status
                  </h6>

                  <Badge
                    bg={

                      order.status ===
                      "DELIVERED"

                        ? "success"

                        : order.status ===
                          "CANCELLED"

                        ? "danger"

                        : "warning"
                    }
                  >

                    {
                      order.status ||
                      "PENDING"
                    }

                  </Badge>

                </div>


                {/* TOTAL */}
                <div>

                  <h6 className="fw-bold">
                    Total
                  </h6>

                  <h5
                    className="
                    text-warning
                    fw-bold
                    "
                  >
                    Tk {order.total}
                  </h5>

                </div>

              </div>


              {/* PRODUCTS */}
              {
                order.orderItems?.map(
                  (item) => (

                    <div

                      key={item.id}

                      className="
                      d-flex
                      align-items-center
                      gap-3
                      mb-3
                      "
                    >

                      <img
                        src={
                          item.product
                            ?.images?.[0]
                        }

                        alt="product"

                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit:
                            "cover",
                          borderRadius:
                            "10px"
                        }}
                      />


                      <div>

                        <h5 className="fw-bold">
                          {
                            item.product
                              ?.title
                          }
                        </h5>

                        <p className="mb-1">
                          Qty:
                          {item.quantity}
                        </p>

                        <h6
                          className="
                          text-warning
                          fw-bold
                          "
                        >
                          Tk
                          {
                            item.price
                          }
                        </h6>

                      </div>

                    </div>
                  )
                )
              }

            </div>
          ))

        ) : (

          <div
            className="
            alert alert-warning
            "
          >
            No orders found
          </div>
        )
      }

    </div>
  );
}

export default OrderHistory;