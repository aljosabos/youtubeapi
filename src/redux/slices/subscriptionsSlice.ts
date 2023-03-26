import { ISubscriptionsSliceState } from "./../types/subscriptionsTypes";
import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptionsThunk } from "../thunks/subscriptionsThunk";

const initialState: ISubscriptionsSliceState = {
  data: {
    items: [],
    nextPageToken: "",
  },
  status: "idle",
  error: {},
};

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // INITIAL LOAD //
    builder.addCase(getSubscriptionsThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getSubscriptionsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload;
    });

    builder.addCase(getSubscriptionsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const subscriptionsSelector = (state: RootState) => state.subscriptions.data.items;
export const subscriptionsStatusSelector = (state: RootState) => state.subscriptions.status;
export const nextPageTokenSelector = (state: RootState) => state.subscriptions.data.nextPageToken;

export default subscriptionsSlice.reducer;
