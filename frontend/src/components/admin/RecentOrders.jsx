function RecentOrders({
  orders
}) {

  return (

    <div
      className="
      bg-white
      p-4
      rounded-4
      shadow-sm
      "
    >

      <h4 className="fw-bold mb-4">
        Recent Orders
      </h4>


      <div className="table-responsive">

        <table className="table">

          <thead>

            <tr>

              <th>User</th>

              <th>Total</th>

              <th>Status</th>

            </tr>

          </thead>


          <tbody>

            {
              orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    {order.user?.name}
                  </td>

                  <td>
                    Tk {order.totalAmount}
                  </td>

                  <td>

                    <span
                      className={`
                        badge
                        ${
                          order.status === "DELIVERED"
                            ? "bg-success"
                            : order.status === "PENDING"
                            ? "bg-warning"
                            : "bg-danger"
                        }
                      `}
                    >

                      {order.status}

                    </span>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentOrders;