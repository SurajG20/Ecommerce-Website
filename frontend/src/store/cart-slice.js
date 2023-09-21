import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    deleteProduct: (state, action) => {
      const productId = state.products.findIndex(
        (i) => i._id === action.payload.id
      );
      state.products.splice(productId, 1);

      state.totalQuantity -= action.payload.totalquantity;
      state.totalPrice -= action.payload.total;
      if (isNaN(state.totalQuantity)) {
        state.totalQuantity = 0;
      }
      if (isNaN(state.totalPrice)) {
        state.totalPrice = 0;
      }
    },
    emptyCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    addProduct(state, action) {
      const newProduct = {
        _id: action.payload.product._id,
        title: action.payload.product.title,
        description: action.payload.product.description,
        image: action.payload.product.image,
        price: action.payload.product.price,
        quantity: action.payload.quantity,
        size: action.payload.size,
        color: action.payload.color,
      };

      const existingProduct = state.products.find(
        (product) => product._id === newProduct._id
      );

      if (existingProduct) {
        // Product already exists in the cart, update its quantity
        existingProduct.quantity += newProduct.quantity;
      } else {
        // Product is not in the cart, add it as a new item
        state.products.push(newProduct);
      }

      state.totalQuantity += newProduct.quantity;
      state.totalPrice += newProduct.price * newProduct.quantity;
    },
  },
});

export const { addProduct, deleteProduct, emptyCart } = cartSlice.actions;
export default cartSlice;
