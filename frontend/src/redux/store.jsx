import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "../redux/features/auth/authSlice";
import cartReducer from "./features/cartSlice";
import productReducer from "../redux/features/product/productSlice";
import categoryReducer from "./features/categoryAndBrand/categorySlice";
import { productsApi } from "./features/product/productsApi";
import { userApi } from "./features/user/usersApi";
import orderReducer from "./features/product/orderSlice";
import { ordersApi } from "./features/order/ordersApi";
import pickUpStoreReducer from "./features/pickupStore/pickUpStoreSlice";
import feedPostReducer from "./features/feed/feedPostSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","cart"], // Only persist auth and cart reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
  orders: orderReducer,
  stores: pickUpStoreReducer,
  feeds: feedPostReducer,
  [userApi.reducerPath]: userApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware, userApi.middleware, ordersApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// store.dispatch(getTotals());
