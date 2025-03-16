import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Pencil, Trash2, Loader2, AlertCircle, Package2, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAdminProducts, deleteProduct } from "../../redux/features/adminSlice";

const ProductsData = () => {
  const dispatch = useDispatch();
  const { products,  error, totalPages, currentPage, isDeleting, isLoading } = useSelector((state) => state.admin);
  const [page, setPage] = useState(currentPage);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAdminProducts({ page, limit: productsPerPage }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(fetchAdminProducts({ page, limit: productsPerPage }));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
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
            onClick={() => dispatch(fetchAdminProducts({ page, limit: productsPerPage }))}
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
          <p className="text-muted-foreground">Start by adding some products to your store.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="group">
                <TableCell className="font-medium">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/20 transition-colors">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="line-clamp-2 max-w-[200px]">
                    {product.title}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.category?.join(", ")}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </TableCell>
                <TableCell className="font-medium">₹{product.price}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {product.discount}% OFF
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/admin/product/${product.id}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-primary/20 hover:border-primary hover:bg-primary/5"
                      >
                        <Pencil className="h-4 w-4 text-primary" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="h-8 w-8 border-destructive/20 hover:border-destructive hover:bg-destructive/5"
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
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

ProductsData.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.arrayOf(PropTypes.string),
      inStock: PropTypes.bool,
      price: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
    })
  ),
};

export default ProductsData;
