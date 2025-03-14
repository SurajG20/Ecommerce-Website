import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import ApiClass from "../../utils/api";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ category, page = 1, limit = 15 }, { rejectWithValue }) => {
    try {
      const url = category
        ? `/products?category=${category}&page=${page}&limit=${limit}`
        : `/products?page=${page}&limit=${limit}`;
      const response = await ApiClass.getRequest(url);

      // Handle the correct response structure
      return {
        products: response.data.products || [],
        totalProducts: response.data.totalProducts || 0,
        currentPage: parseInt(response.data.currentPage) || page,
        totalPages: parseInt(response.data.totalPages) || 1
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await ApiClass.postRequest("/products", true, productData);
      toast.success("Product created successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      return rejectWithValue(error.response?.data?.message || "Failed to create product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClass.putRequest(`/products/${id}`, true, data);
      toast.success("Product updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
      return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ApiClass.deleteRequest(`/products/${id}`);
      toast.success("Product deleted successfully!");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
      return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
        state.totalProducts += 1;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.totalProducts -= 1;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;