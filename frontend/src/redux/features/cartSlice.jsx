import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`New ${state.cartItems[itemIndex].name} Added `);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} Product Added to cart`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from cart`);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id == action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity--;
        toast.error(`${action.payload.name} removed from cart`);
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );

        state.cartItems = nextCartItems;
        toast.error(`${action.payload.name} removed from cart`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    itemTotalQuantity(state, action) {
      state.totalItems = cartItem;
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  itemTotalQuantity,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
