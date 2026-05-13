function DashboardCards({
  analytics
}) {

  return (

    <div className="row g-4">


      {/* USERS */}
      <div className="col-md-3">

        <div
          className="
          card
          border-0
          shadow-sm
          rounded-4
          p-4
          "
        >

          <h6 className="text-muted">
            Users
          </h6>

          <h2 className="fw-bold">
            {
              analytics?.totalUsers || 0
            }
          </h2>

        </div>

      </div>




      {/* ORDERS */}
      <div className="col-md-3">

        <div
          className="
          card
          border-0
          shadow-sm
          rounded-4
          p-4
          "
        >

          <h6 className="text-muted">
            Orders
          </h6>

          <h2 className="fw-bold">
            {
              analytics?.totalOrders || 0
            }
          </h2>

        </div>

      </div>




      {/* PRODUCTS */}
      <div className="col-md-3">

        <div
          className="
          card
          border-0
          shadow-sm
          rounded-4
          p-4
          "
        >

          <h6 className="text-muted">
            Products
          </h6>

          <h2 className="fw-bold">
            {
              analytics?.totalProducts || 0
            }
          </h2>

        </div>

      </div>




      {/* REVENUE */}
      <div className="col-md-3">

        <div
          className="
          card
          border-0
          shadow-sm
          rounded-4
          p-4
          "
        >

          <h6 className="text-muted">
            Revenue
          </h6>

          <h2
            className="
            fw-bold
            text-warning
            "
          >

            Tk {
              analytics?.totalRevenue || 0
            }

          </h2>

        </div>

      </div>

    </div>
  );
}

export default DashboardCards;