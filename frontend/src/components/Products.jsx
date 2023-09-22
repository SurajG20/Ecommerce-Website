import React, { useEffect, useState } from "react";
import { publicRequest } from "../request-methods";
import Product from "./Product";
import LoadingSpinner from "./Loading";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 15;

  const getProducts = async () => {
    try {
      const url = category
        ? `/products?category=${category}&page=${page}&limit=${productsPerPage}`
        : `/products?page=${page}&limit=${productsPerPage}`;
      const response = await publicRequest.get(url);
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category, page]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div className="text-center">Something went wrong!</div>;
  }

  const totalPages = Math.max(Math.ceil(totalProducts / productsPerPage), 1);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <section
        className="pb-8 mx-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5"
        id="products"
      >
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </section>
      <div className="flex justify-center mt-4">
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex items-center">
            <li>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-2xl text-neutral-600 font-bold  transition-all duration-300 hover:bg-neutral-100 "
                href="#"
                onClick={() => handlePageChange(page - 1)}
              >
                <span>&laquo;</span>
              </a>
            </li>
            {pageNumbers.map((_, i) => (
              <li key={i}>
                <a
                  className="relative block rounded bg-transparent px-3 py-1.5 text-xl font-semibold  text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
                  href="#"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-2xl text-neutral-600 transition-all duration-300 font-bold hover:bg-neutral-100 "
                href="#"
                onClick={() => handlePageChange(page + 1)}
              >
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Products;
