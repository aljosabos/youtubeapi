import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { ISearchVideosStateSlice } from "../types/searchVideosState";
import { searchVideosThunk } from "../thunks/searchVideosThunk";

const initialState: ISearchVideosStateSlice = {
  data: {
    items: [],
  },
  status: "idle",
  error: {},
};

export const searchedVideosSlice = createSlice({
  name: "searchedVideos",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(searchVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(searchVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload;
    });

    builder.addCase(searchVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const searchedVideosSelector = (state: RootState) =>
  state.searchedVideos.data.items;

export default searchedVideosSlice.reducer;
