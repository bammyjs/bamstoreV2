import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import cartReducer, { getTotals } from "./features/cartSlice";
import productReducer from "../redux/features/product/productSlice";
import categoryReducer from "./features/categoryAndBrand/categorySlice";
import { productsApi } from "./features/product/productsApi";
import { userApi } from "./features/user/usersApi";

import orderReducer from "./features/product/orderSlice";
import { ordersApi } from "./features/order/ordersApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
    orders: orderReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productsApi.middleware,
      userApi.middleware,
      ordersApi.middleware
    );
  },
  devTools: false,
});

// store.dispatch(productsFetch());
store.dispatch(getTotals());

// const rootReducer = combineReducers({
//   authReducer: authReducer,
//   cartReducer: cartReducer,
// });

// export default configureStore({ reducer: rootReducer });
