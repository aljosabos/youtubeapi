import { IVideoDetails } from "./../types/videoDetailsTypes";
import { createSlice } from "@reduxjs/toolkit";
import { getVideoDetailsThunk } from "../thunks/videoDetailsThunk";
import { IVideoDetailsSliceState } from "../types/videoDetailsTypes";
import { RootState } from "../store";

const initialState: IVideoDetailsSliceState = {
  data: {} as IVideoDetails,
  status: "idle",
  error: {},
};

export const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getVideoDetailsThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getVideoDetailsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload.data;
      state.data.id = action.payload.id;
      state.data.statistics = action.payload.statistics;
    });

    builder.addCase(getVideoDetailsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const videosDetailsSelector = (state: RootState) => state.videoDetails.data;

export default videoDetailsSlice.reducer;
