import {
  getMoreSubscriptionsThunk,
  subscribeToChannelThunk,
  unsubscribeFromChannelThunk,
} from "./../thunks/subscriptionsThunk";
import { ISubscriptionsSliceState } from "../types/subscriptionsState";
import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptionsThunk } from "../thunks/subscriptionsThunk";
import {
  formatResponseToSubscription,
  mapResponseToSubscriptions,
} from "../../utils/response-utils";

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
    /* GET SUBSCRIPTIONS */
    builder.addCase(getSubscriptionsThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });
    builder.addCase(getSubscriptionsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data.nextPageToken = action.payload.nextPageToken;
      state.data.items = mapResponseToSubscriptions(action.payload.items);
    });

    builder.addCase(getSubscriptionsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    builder.addCase(getMoreSubscriptionsThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getMoreSubscriptionsThunk.fulfilled, (state, action) => {
      const mappedSubscriptions = mapResponseToSubscriptions(
        action.payload.items
      );
      state.status = "succeeded";
      state.error = {};
      state.data = {
        ...state.data,
        items: [...state.data.items, ...mappedSubscriptions],
        nextPageToken: action.payload.nextPageToken,
      };
    });

    builder.addCase(getMoreSubscriptionsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    /* SUBSCRIBE TO CHANNEL */
    builder.addCase(subscribeToChannelThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    builder.addCase(subscribeToChannelThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(subscribeToChannelThunk.fulfilled, (state, action) => {
      state.status = "loading";
      state.error = {};
      state.data.items.unshift(formatResponseToSubscription(action.payload));
    });

    /* UNSUBSCRIBE FROM CHANNEL */
    builder.addCase(unsubscribeFromChannelThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    builder.addCase(unsubscribeFromChannelThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(unsubscribeFromChannelThunk.fulfilled, (state, action) => {
      state.status = "loading";
      state.error = {};
      const filteredSubscriptions = state.data.items.filter(
        (subscription) => subscription.id !== action.payload.id
      );
      state.data.items = filteredSubscriptions;
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
