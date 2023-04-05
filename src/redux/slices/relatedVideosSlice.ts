import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { getRelatedVideosThunk } from "../thunks/relatedVideosThunk";
import { IRelatedVideosSliceState } from "../types/relatedVideosState";

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
  },
});

export const relatedVideosSelector = (state: RootState) =>
  state.relatedVideos.data.items;

export default relatedVideosSlice.reducer;
