import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { getRelatedVideosThunk } from "../thunks/relatedVideosThunk";
import { IRelatedVideosSliceState } from "../types/relatedVideosTypes";

const initialState: IRelatedVideosSliceState = {
  data: {
    items: [],
  },
  status: "idle",
  error: {},
};

export const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // INITIAL LOAD //
    builder.addCase(getRelatedVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getRelatedVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload;
    });

    builder.addCase(getRelatedVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    // LOAD MORE //
    // builder.addCase(getMoreRelatedVideosThunk.pending, (state, _) => {
    //   state.status = "loading";
    //   state.error = {};
    // });

    // builder.addCase(getMoreRelatedVideosThunk.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.error = {};
    //   state.data = {
    //     items: [...state.data.items, ...action.payload.items],
    //     nextPageToken: action.payload.nextPageToken,
    //   };
    // });

    // builder.addCase(getMoreRelatedVideosThunk.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error;
    // });
  },
});

export const relatedVideosSelector = (state: RootState) =>
  state.relatedVideos.data.items;

export default relatedVideosSlice.reducer;
