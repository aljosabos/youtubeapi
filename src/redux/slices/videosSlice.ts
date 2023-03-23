import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { IVideoSliceState } from "../types";
import { initialVideosLoadThunk, loadMoreVideosThunk } from "../thunks";

const initialState: IVideoSliceState = {
  data: {
    items: [],
    nextPageToken: "",
  },
  status: "idle",
  error: {},
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // INITIAL LOAD //
    builder.addCase(initialVideosLoadThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(initialVideosLoadThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload;
    });

    builder.addCase(initialVideosLoadThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    // LOAD MORE //
    builder.addCase(loadMoreVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(loadMoreVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = {
        items: [...state.data.items, ...action.payload.items],
        nextPageToken: action.payload.nextPageToken,
      };
    });

    builder.addCase(loadMoreVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const videosSelector = (state: RootState) => state.videos.data.items;
export const videosStatusSelector = (state: RootState) => state.videos.status;
export const nextPageTokenSelector = (state: RootState) =>
  state.videos.data.nextPageToken;

export default videosSlice.reducer;
