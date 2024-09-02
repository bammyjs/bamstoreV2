import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pickUpStoreService from "./pickUpStoreService";
import { toast } from "react-toastify";

const initialState = {
  stores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch all stores
export const getStores = createAsyncThunk("stores/getStores", async (_, thunkAPI) => {
    try {
      const response = await pickUpStoreService.getStores();
      return response; // Just return response directly
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  

// Create New Product
export const createStore = createAsyncThunk(
  "stores/createStore",
  async (formData, thunkAPI) => {
    try {
      return await pickUpStoreService.createStore(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update a store
export const updateStore = createAsyncThunk(
  "stores/updateStore",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await pickUpStoreService.updateStore({ id, formData });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete a store
export const deleteStore = createAsyncThunk(
  "stores/deleteStore",
  async (id, thunkAPI) => {
    try {
      return await pickUpStoreService.deleteStore(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const pickUpStoreSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stores = action.payload;
        console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(getStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stores.push(action.payload);
        // console.log(action.payload);
      })
      .addCase(updateStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const index = state.stores.findIndex(
          (store) => store._id === action.payload._id
        );
        state.stores[index] = action.payload;
        console.log(action.payload);
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stores = state.stores.filter(
          (store) => store._id !== action.payload.id
        );
        toast.success("Store deleted successfully");
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export default pickUpStoreSlice.reducer;
