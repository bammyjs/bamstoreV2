import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



export const updateCartItems = createAsyncThunk(
  'cart/updateCartItems',
  async (updatedItems, thunkAPI) => {
    try {
      // You can add any additional logic or API calls here if necessary
      return updatedItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
    clearCart(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity--;
        toast.info(`${action.payload.name} removed from cart`);
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
      state.totalItems = state.cartItems;
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
  extraReducers: (builder) => {
    builder.addCase(updateCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;  // Update the cart items with new storeId
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  itemTotalQuantity,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
