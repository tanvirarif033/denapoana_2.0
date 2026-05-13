import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import ProductDetails
from "../../components/product/ProductDetails";

import ReviewSection
from "../../components/product/ReviewSection";

import SimilarProducts
from "../../components/product/SimilarProducts";

import AIRecommendationButton
from "../../components/product/AIRecommendationButton";

import {
  getSingleProduct,
  getSimilarProducts
} from "../../services/productService";



function ProductDetailsPage() {

  const { id } =
    useParams();

  const [product, setProduct] =
    useState(null);

  const [similarProducts,
    setSimilarProducts] =
    useState([]);


  // fetch product
  const fetchProduct =
    async () => {

      try {

        const data =
          await getSingleProduct(id);

        setProduct(data.product);

      } catch (error) {

        console.log(error);
      }
    };


  // similar products
  const fetchSimilar =
    async () => {

      try {

        const data =
          await getSimilarProducts(id);

        setSimilarProducts(
          data.products
        );

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    fetchProduct();

    fetchSimilar();

  }, [id]);


  if (!product) {

    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }


  return (

    <>
      <Navbar />

      <div className="container py-5">

        {/* PRODUCT DETAILS */}
        <ProductDetails
          product={product}
        />


        {/* AI BUTTON */}
        <AIRecommendationButton
          product={product}
        />


        {/* REVIEWS */}
        <ReviewSection
          reviews={product.reviews}
        />


        {/* SIMILAR PRODUCTS */}
        <SimilarProducts
          products={similarProducts}
        />

      </div>

      <Footer />
    </>
  );
}

export default ProductDetailsPage;