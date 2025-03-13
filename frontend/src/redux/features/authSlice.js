import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiClass from "../../utils/api";
import { toast } from "sonner";

const user = localStorage.getItem("user_info")
  ? JSON.parse(localStorage.getItem("user_info"))
  : null;

const initialState = {
  user: user,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ApiClass.postRequest("/auth/login", false, userData);
      if (response?.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_info", JSON.stringify(response.data.user));
        toast.success("Login successful!");
        return response.data;
      }
      return rejectWithValue(response?.message || "Login failed");
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ApiClass.postRequest("/auth/register", false, userData);
      if (response?.data) {
        toast.success("Registration successful! Please login.");
        return response.data;
      }
      return rejectWithValue(response?.message || "Registration failed");
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Registration failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_info");
  toast.success("Logged out successfully");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;