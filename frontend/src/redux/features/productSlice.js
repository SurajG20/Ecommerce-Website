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

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiClass.getRequest(`/products/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch product details");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product details");
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
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;