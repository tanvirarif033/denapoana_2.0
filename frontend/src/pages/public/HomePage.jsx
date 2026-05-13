import {
  useEffect,
  useState
} from "react";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import HeroSection
from "../../components/home/HeroSection";

import SearchFilter
from "../../components/home/SearchFilter";

import ProductGrid
from "../../components/home/ProductGrid";

import {
  getProducts
} from "../../services/productService";



function HomePage() {

  const [products, setProducts] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // fetch products
  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const data =
          await getProducts(
            page,
            search,
            category,
            sort
          );

        if (page === 1) {

          setProducts(
            data.products
          );

        } else {

          setProducts((prev) => [
            ...prev,
            ...data.products
          ]);
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // reload
  useEffect(() => {

    setPage(1);

  }, [
    search,
    category,
    sort
  ]);


  useEffect(() => {

    fetchProducts();

  }, [
    page,
    search,
    category,
    sort
  ]);


  return (

    <>
      <Navbar />

      <HeroSection />

      <div className="container py-5">

        {/* FILTER */}
        <SearchFilter

          search={search}
          setSearch={setSearch}

          category={category}
          setCategory={setCategory}

          sort={sort}
          setSort={setSort}
        />


        {/* PRODUCTS */}
        <ProductGrid
          products={products}
        />


        {/* LOAD MORE */}
        <div className="text-center mt-5">

          <button
            className="
            btn btn-warning px-5
            "
            onClick={() =>
              setPage(page + 1)
            }
          >

            {
              loading
                ? "Loading..."
                : "Load More"
            }

          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default HomePage;