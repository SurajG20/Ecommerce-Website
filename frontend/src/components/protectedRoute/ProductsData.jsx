import { useEffect } from "react";
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
} from "../ui/table";
import { Button } from "../ui/button";
import { Pencil, Trash2, Loader2, AlertCircle } from "lucide-react";
import { fetchProducts, deleteProduct } from "../../redux/features/productSlice";

const ProductsData = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(fetchProducts({}));
    } catch (error) {
      // Error is handled by the thunk and displayed via toast
      console.error("Failed to delete product:", error);
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
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p className="text-lg">{error}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => dispatch(fetchProducts({}))}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
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
            {products?.products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="line-clamp-1 max-w-[200px]">
                    {product.title}
                  </div>
                </TableCell>
                <TableCell>{product.category?.join(", ")}</TableCell>
                <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/admin/product/${product._id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
