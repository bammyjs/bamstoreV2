import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import cartReducer, { getTotals } from "./features/cartSlice";
import { productsApi } from "./features/product/productsApi";
import { userApi } from "./features/user/usersApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    // filter: filterReducer,
    // category: couponSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

// store.dispatch(productsFetch());
store.dispatch(getTotals());

// const rootReducer = combineReducers({
//   authReducer: authReducer,
//   cartReducer: cartReducer,
// });

// export default configureStore({ reducer: rootReducer });
