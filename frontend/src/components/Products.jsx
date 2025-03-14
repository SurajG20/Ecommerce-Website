import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/productSlice";
import Product from "./Product";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../utils/cn";
import PropTypes from "prop-types";

const Products = ({ category }) => {
  const dispatch = useDispatch();
  const { products, isLoading, error, totalPages, currentPage } = useSelector((state) => state.products);
  const [page, setPage] = useState(currentPage);
  const productsPerPage = 15;

  useEffect(() => {
    dispatch(fetchProducts({ category, page, limit: productsPerPage }));
  }, [dispatch, category, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-600">{error}</p>
          <Button
            variant="outline"
            onClick={() => dispatch(fetchProducts({ category, page, limit: productsPerPage }))}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600">No products found</p>
          <Button
            variant="outline"
            onClick={() => dispatch(fetchProducts({ category, page, limit: productsPerPage }))}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="h-8 w-8"
            >
              <span className="sr-only">Previous page</span>
              &laquo;
            </Button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === page;
              const isNearCurrentPage =
                Math.abs(pageNumber - page) <= 2 ||
                pageNumber === 1 ||
                pageNumber === totalPages;

              if (!isNearCurrentPage) {
                if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return <span key={pageNumber} className="px-2">...</span>;
                }
                return null;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(pageNumber)}
                  className={cn(
                    "h-8 w-8",
                    isCurrentPage && "bg-teal-600 hover:bg-teal-500"
                  )}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="h-8 w-8"
            >
              <span className="sr-only">Next page</span>
              &raquo;
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};

Products.propTypes = {
  category: PropTypes.string,
};

export default Products;
