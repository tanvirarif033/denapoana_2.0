import ProductCard
from "../product/ProductCard";



function ProductGrid({
  products
}) {

  return (

    <div className="row g-4">

      {
        products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      }

    </div>
  );
}

export default ProductGrid;