import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { setHeaders } from "./auth/api";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/product/`;

const initialState = {
  items: [],
  itemsStatus: null,
  itemSingle: [],
  itemSingleStatus: null,
  createStatus: null,
};

//getting all product data

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(API_URL + "products");

    return response?.data;
  }
);

//getting single product data
export const singleProductsFetch = createAsyncThunk(
  "products/singleProductsFetch",
  async (id) => {
    const response = await axios.get(API_URL + `product${id}`);
    return response?.data;
  }
);
//creating new product to db

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values) => {
    try {
      const response = await axios.post(
        API_URL + "createProduct",
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.itemsStatus = "pending";
      })

      .addCase(productsFetch.fulfilled, (state, action) => {
        state.itemsStatus = "success";
        state.items = action.payload;
      })

      .addCase(productsFetch.rejected, (state) => {
        state.itemsStatus = "rejected";
      })
      .addCase(singleProductsFetch.pending, (state) => {
        state.itemSingleStatus = "pending";
      })

      .addCase(singleProductsFetch.fulfilled, (state, action) => {
        state.itemSingleStatus = "success";
        state.itemSingle = action.payload;
      })

      .addCase(singleProductsFetch.rejected, (state) => {
        state.itemSingleStatus = "rejected";
      })

      .addCase(createProduct.pending, (state) => {
        state.status = "pending";
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.createStatus = "success";
        toast.success("Product created");
      })

      .addCase(createProduct.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default productSlice.reducer;
