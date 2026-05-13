import ProductGrid
from "../home/ProductGrid";



function SimilarProducts({
  products
}) {

  return (

    <div className="mt-5">

      <h3
        className="
        fw-bold
        mb-4
        "
      >
        Similar Products
      </h3>

      <ProductGrid
        products={products}
      />

    </div>
  );
}

export default SimilarProducts;