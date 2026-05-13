import {
  FaEdit,
  FaTrash
} from "react-icons/fa";



function ProductsTable({

  products,
  onDelete,
  onEdit

}) {

  return (

    <div className="table-responsive">

      <table
        className="
        table
        align-middle
        "
      >

        <thead>

          <tr>

            <th>Image</th>

            <th>Title</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>


        <tbody>

          {
            products.map((product) => (

              <tr key={product.id}>

                {/* IMAGE */}
                <td>

                  <img
                    src={product.images?.[0]}
                    alt=""
                    width="60"
                    height="60"
                    style={{
                      objectFit:
                        "cover",

                      borderRadius:
                        "10px"
                    }}
                  />

                </td>


                {/* TITLE */}
                <td className="fw-bold">

                  {product.title}

                </td>


                {/* CATEGORY */}
                <td>

                  {product.category}

                </td>


                {/* PRICE */}
                <td className="text-warning fw-bold">

                  Tk {product.price}

                </td>


                {/* STOCK */}
                <td>

                  {product.stock}

                </td>


                {/* LOW STOCK */}
                <td>

                  {
                    product.stock <= 5 ? (

                      <span className="badge bg-danger">

                        Low Stock

                      </span>

                    ) : (

                      <span className="badge bg-success">

                        In Stock

                      </span>
                    )
                  }

                </td>


                {/* ACTIONS */}
                <td>

                  <div className="d-flex gap-2">

                    <button
                      className="
                      btn btn-dark
                      btn-sm
                      "
                      onClick={() =>
                        onEdit(product.id)
                      }
                    >

                      <FaEdit />

                    </button>


                    <button
                      className="
                      btn btn-danger
                      btn-sm
                      "
                      onClick={() =>
                        onDelete(product.id)
                      }
                    >

                      <FaTrash />

                    </button>

                  </div>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default ProductsTable;