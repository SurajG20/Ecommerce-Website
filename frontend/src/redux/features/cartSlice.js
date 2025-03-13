import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const cartItems = localStorage.getItem("cart_items")
  ? JSON.parse(localStorage.getItem("cart_items"))
  : [];

const initialState = {
  products: cartItems,
  totalQuantity: cartItems.reduce((total, item) => total + item.quantity, 0),
  totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.products.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.products.push(newItem);
      }

      state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);

      localStorage.setItem("cart_items", JSON.stringify(state.products));
      toast.success("Item added to cart!");
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(item => item.id !== id);

      state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);

      localStorage.setItem("cart_items", JSON.stringify(state.products));
      toast.success("Item removed from cart!");
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.products.find(item => item.id === id);

      if (item) {
        item.quantity = quantity;
        state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);

        localStorage.setItem("cart_items", JSON.stringify(state.products));
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cart_items");
      toast.success("Cart cleared!");
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;