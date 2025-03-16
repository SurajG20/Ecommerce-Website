import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import ApiClass from "../../utils/api";

const initialState = {
  users: [],
  products: [],
  isLoading: false,
  isDeleting: false,
  error: null,
  selectedProduct: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
  currentUserPage: 1,
  totalUserPages: 1,
};

export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchProducts",
  async ({ page = 1, limit = 15 }, { rejectWithValue }) => {
    try {
      const response = await ApiClass.getRequest(`/admin/products?page=${page}&limit=${limit}`, true);
      if (response.success) {
        return {
          products: response.data.products || [],
          totalProducts: response.data.totalProducts || 0,
          currentPage: parseInt(response.data.currentPage) || page,
          totalPages: parseInt(response.data.totalPages) || 1
        };
      }
      return rejectWithValue(response.message || "Failed to fetch products");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await ApiClass.postRequest("/admin/products", true, productData);
      if (response.success) {
        toast.success("Product created successfully!");
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to create product");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      return rejectWithValue(error.response?.data?.message || "Failed to create product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClass.putRequest(`/admin/products/${id}`, true, data);
      if (response.success) {
        toast.success("Product updated successfully!");
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to update product");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
      return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await ApiClass.deleteRequest(`/admin/products/${id}`, true);
      toast.success("Product deleted successfully!");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
      return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
  }
);

export const fetchAdminProductDetails = createAsyncThunk(
  "admin/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiClass.getRequest(`/admin/products/${id}`, true);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch product details");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product details");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ page = 1, limit = 10, search = "", sortBy = "createdAt", sortOrder = "desc" }, { rejectWithValue }) => {
    try {
      const response = await ApiClass.getRequest(
        `/admin/users?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        true
      );
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch users");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async ({ userId, isBlocked }, { rejectWithValue }) => {
    try {
      const response = await ApiClass.putRequest(`/admin/users/${userId}/status`, true, { isBlocked });
      if (response.success) {
        toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully!`);
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to update user status");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user status");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
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
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
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
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.totalProducts -= 1;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.currentUserPage = action.payload.currentPage;
        state.totalUserPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.user.id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
        state.error = null;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct, setCurrentPage } = adminSlice.actions;
export default adminSlice.reducer;

