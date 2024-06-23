import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isFetching = true;
      state.error = false; // Reset error on new login attempt
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false; // Clear error on successful login
    },
    loginFailure(state) {
      state.isFetching = false;
      state.error = true; // Set error on login failure
    },
    registerStart(state) {
      state.isFetching = true;
      state.error = false; // Reset error on new registration attempt
    },
    registerSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false; // Clear error on successful registration
    },
    registerFailure(state) {
      state.isFetching = false;
      state.error = true; // Set error on registration failure
    },
    logout(state) {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false; // Reset error on logout
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerFailure, registerSuccess } =
  authSlice.actions;

export default authSlice;
