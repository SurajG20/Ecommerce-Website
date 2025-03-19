import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/productSlice";
import Product from "../components/Product";
import Layout from "../components/Layout";
import {
  Loader2,
  Package2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import PropTypes from "prop-types";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Popular", value: "popular" },
];

const Products = ({ category }) => {
  const dispatch = useDispatch();
  const { products, isLoading, error, totalPages, currentPage } = useSelector((state) => state.products);
  const [page, setPage] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 15;

  useEffect(() => {
    const getSortField = (sortValue) => {
      switch (sortValue) {
        case 'newest':
          return 'createdAt';
        case 'price_asc':
          return 'price_asc';
        case 'price_desc':
          return 'price_desc';
        case 'popular':
          return 'createdAt';
        default:
          return 'createdAt';
      }
    };

    dispatch(fetchProducts({
      category,
      page,
      limit: productsPerPage,
      search: searchQuery,
      sort: getSortField(sortBy)
    }));
  }, [dispatch, category, page, searchQuery, sortBy]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const renderContent = () => {
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
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : category
                ? `No products found in ${category}`
                : "No products available"}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                dispatch(fetchProducts({ category, page, limit: productsPerPage }));
              }}
              className="gap-2"
            >
              <Package2 className="h-4 w-4" />
              Clear Search
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {category ? `${category} Products` : "All Products"}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className={`grid gap-4 ${showFilters ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button type="submit" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex justify-end gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {renderContent()}

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
    </Layout>
  );
};

Products.propTypes = {
  category: PropTypes.string,
};

export default Products;
