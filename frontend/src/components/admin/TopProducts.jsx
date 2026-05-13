function TopProducts({
  products = []
}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      rounded-4
      p-4
      h-100
      "
    >

      <h3
        className="
        fw-bold
        mb-4
        "
      >
        Top Selling Products
      </h3>


      {
        products.length > 0 ? (

          products.map((product) => (

            <div
              key={product.productId}
              className="
              d-flex
              align-items-center
              justify-content-between
              mb-4
              "
            >

              {/* LEFT */}
              <div
                className="
                d-flex
                align-items-center
                gap-3
                "
              >

                {/* IMAGE */}
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/70"
                  }

                  alt={product.title}

                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />


                {/* INFO */}
                <div>

                  <h6
                    className="
                    fw-bold
                    mb-1
                    "
                  >
                    {product.title}
                  </h6>


                  <small
                    className="
                    text-muted
                    "
                  >
                    Sold:
                    {" "}
                    {product.totalSold}
                  </small>

                </div>

              </div>



              {/* RIGHT */}
              <div
                className="
                text-end
                "
              >

                <h6
                  className="
                  text-warning
                  fw-bold
                  "
                >

                  Tk {
                    product.price || 0
                  }

                </h6>

              </div>

            </div>
          ))

        ) : (

          <p className="text-muted">
            No Products Found
          </p>
        )
      }

    </div>
  );
}

export default TopProducts;