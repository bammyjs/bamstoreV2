import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import feedPostService from "./feedPostService";
import { toast } from "react-toastify";

const initialState = {
  feeds: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create New feed
export const createFeedPost = createAsyncThunk(
  "feeds/create",
  async (feedData, thunkAPI) => {
    try {
      return await feedPostService.createFeedPost(feedData);
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

// Get all feeds
export const getFeedPost = createAsyncThunk(
  "feeds/getFeedPost",
  async (_, thunkAPI) => {
    try {
      return await feedPostService.getFeedPost();
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

//Like feed post
export const likeFeedPost = createAsyncThunk(
  "feeds.like",
  async (id, thunkAPI) => {
    try {
      return await feedPostService.likeFeedPost(id);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Comment on a feed post
export const commentFeedPost = createAsyncThunk(
  "feeds/comment",
  async ({ id, comment }, thunkAPI) => {
    try {
      return await feedPostService.commentFeedPost(id, { comment });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Product
export const deleteFeedPost = createAsyncThunk(
  "feeds/delete",
  async (id, thunkAPI) => {
    try {
      return await feedPostService.deleteFeedPost(id);
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

const feedPostSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFeedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.feeds.push(action.payload);
        toast.success("new Feed added successfully");
      })
      .addCase(createFeedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getFeedPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.feeds = action.payload;
        // console.log(action.payload);
      })
      .addCase(getFeedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(likeFeedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { likes, id } = action.payload;
        const feedIndex = state.feeds.findIndex((feed) => feed._id === id);
        if (feedIndex >= 0) {
          state.feeds[feedIndex].likes = likes;
        }
      })
      .addCase(commentFeedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { comments, id } = action.payload;
        const feedIndex = state.feeds.findIndex((feed) => feed._id === id);
        if (feedIndex >= 0) {
          state.feeds[feedIndex].comments = comments;
        }
      });
  },
});

export default feedPostSlice.reducer;
