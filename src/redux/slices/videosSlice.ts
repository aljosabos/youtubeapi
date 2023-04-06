import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { IVideoSliceState } from "../types/videosState";
import {
  getInitialVideosThunk,
  getMoreVideosThunk,
} from "../thunks/videosThunk";

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
    builder.addCase(getInitialVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getInitialVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload;
    });

    builder.addCase(getInitialVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    // LOAD MORE //
    builder.addCase(getMoreVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getMoreVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = {
        items: [...state.data.items, ...action.payload.items],
        nextPageToken: action.payload.nextPageToken,
      };
    });

    builder.addCase(getMoreVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

// export const videosSelector = (state: RootState) => state.videos.data.items;
// export const videosStatusSelector = (state: RootState) => state.videos.status;
// export const nextPageTokenSelector = (state: RootState) =>
//   state.videos.data.nextPageToken;

export const videosSelector = ({ videos }: RootState) => ({
  videos: videos.data.items,
  status: videos.status,
  nextPageToken: videos.data.nextPageToken,
});

export default videosSlice.reducer;
