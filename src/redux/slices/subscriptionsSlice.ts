import { getMoreSubscriptionsThunk } from "./../thunks/subscriptionsThunk";
import { ISubscriptionsSliceState } from "../types/subscriptionsState";
import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptionsThunk } from "../thunks/subscriptionsThunk";

const initialState: ISubscriptionsSliceState = {
  data: {
    items: [],
    nextPageToken: "",
    totalCount: 0,
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

    // LOAD MORE //

    builder.addCase(getMoreSubscriptionsThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getMoreSubscriptionsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = {
        ...state.data,
        items: [...state.data.items, ...action.payload.items],
        nextPageToken: action.payload.nextPageToken,
      };
    });

    builder.addCase(getMoreSubscriptionsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const subscriptionsSelector = ({ subscriptions }: RootState) => ({
  subscriptions: subscriptions.data.items,
  status: subscriptions.status,
  nextPageToken: subscriptions.data.nextPageToken,
  totalCount: subscriptions.data.totalCount,
});

export default subscriptionsSlice.reducer;
