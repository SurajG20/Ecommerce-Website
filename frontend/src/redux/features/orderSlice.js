import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import ApiClass from "../../utils/api";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  selectedOrder: null,
  totalOrders: 0,
  currentPage: 1,
  totalPages: 1,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async ({ page = 1, limit = 10, status = '' }, { rejectWithValue }) => {
    try {
      const url = `/orders?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`;
      const response = await ApiClass.getRequest(url);

      return {
        orders: response.data.orders || [],
        totalOrders: response.data.total || 0,
        currentPage: parseInt(response.data.currentPage) || page,
        totalPages: parseInt(response.data.pages) || 1
      };
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const fetchSingleOrder = createAsyncThunk(
  "orders/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiClass.getRequest(`/orders/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch order details");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrder, clearSelectedOrder, setCurrentPage } = orderSlice.actions;
export default orderSlice.reducer;