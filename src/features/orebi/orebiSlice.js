import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  wishlist: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Use productName as unique key if id is missing in dummy data
      const id = action.payload.id || action.payload.productName;
      const item = state.cart.find((product) => (product.id || product.productName) === id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => (item.id || item.productName) !== id);
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((product) => (product.id || product.productName) === id);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((product) => (product.id || product.productName) === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addToWishlist: (state, action) => {
      const id = action.payload.id || action.payload.productName;
      const exists = state.wishlist.some((item) => (item.id || item.productName) === id);
      if (!exists) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.filter((item) => (item.id || item.productName) !== id);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
} = orebiSlice.actions;

export default orebiSlice.reducer;
