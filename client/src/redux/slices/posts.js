import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const  { data } = await axios.get("/api/posts");
    return data
  }
);
export const fetchTags = createAsyncThunk(
  "posts/fetchTags",
  async () => {
    const  { data } = await axios.get("/api/posts/tags");
    return data
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  }
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "loaded"
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error"
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading"
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = "loaded"
      state.tags.items = action.payload
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error"
    },
  }
})

export const postReducer = postSlice.reducer