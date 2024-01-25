import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import cartReducer, { getTotals } from "./features/cartSlice";
import filterReducer from "../redux/features/product/filterSlice";
import productReducer from "../redux/features/product/productSlice";
import { productsApi } from "./features/product/productsApi";
import { userApi } from "./features/user/usersApi";
import categoryReducer from "./features/categoryAndBrand/categorySlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    filter: filterReducer,
    category: categoryReducer,
    product: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productsApi.middleware,
      userApi.middleware
    );
  },
});

// store.dispatch(productsFetch());
store.dispatch(getTotals());

// const rootReducer = combineReducers({
//   authReducer: authReducer,
//   cartReducer: cartReducer,
// });

// export default configureStore({ reducer: rootReducer });
