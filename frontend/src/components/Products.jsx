import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/productSlice";
import Product from "./Product";
import { Loader2, Package2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <p className="text-lg font-medium">{error}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => dispatch(fetchProducts({ category, page, limit: productsPerPage }))}
            className="gap-2"
          >
            <Package2 className="h-4 w-4" />
            Reload Products
          </Button>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package2 className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">No products found</h3>
          <p className="text-muted-foreground">
            {category ? `No products found in ${category}` : "No products available"}
          </p>
          <Button
            variant="outline"
            onClick={() => dispatch(fetchProducts({ category, page, limit: productsPerPage }))}
            className="gap-2"
          >
            <Package2 className="h-4 w-4" />
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
        <div className="flex items-center justify-center gap-2 py-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === page;
              const isNearCurrentPage =
                Math.abs(pageNumber - page) <= 2 ||
                pageNumber === 1 ||
                pageNumber === totalPages;

              if (!isNearCurrentPage) {
                if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return <span key={pageNumber} className="px-2 text-muted-foreground">...</span>;
                }
                return null;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className={isCurrentPage ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

Products.propTypes = {
  category: PropTypes.string,
};

export default Products;
