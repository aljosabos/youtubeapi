import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { formatResponseToChannelInfo } from "../../utils/responseUtils";
import { IChannelSliceState } from "../types/channelSliceState";
import { IChannelInfo } from "../../types/types";
import { getChannelInfoThunk } from "../thunks/channelInfoThunk";
import {
  getChannelVideosThunk,
  getMoreChannelVideosThunk,
} from "../thunks/channelVideosThunk";

const initialState: IChannelSliceState = {
  data: {
    items: [],
    nextPageToken: "",
    channelInfo: {} as IChannelInfo,
  },
  status: "idle",
  error: {},
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},

  extraReducers(builder) {
    /* channel info */

    builder.addCase(getChannelInfoThunk.pending, (state) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getChannelInfoThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data.channelInfo = formatResponseToChannelInfo(
        action.payload.channelInfo
      );
    });

    builder.addCase(getChannelInfoThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    /* channel videos */

    builder.addCase(getChannelVideosThunk.pending, (state) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getChannelVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data.items = action.payload.items;
      state.data.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getChannelVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    /* more channel videos */

    builder.addCase(getMoreChannelVideosThunk.pending, (state) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getMoreChannelVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = {
        ...state.data,
        items: [...state.data.items, ...action.payload.items],
        nextPageToken: action.payload.nextPageToken,
      };
    });

    builder.addCase(getMoreChannelVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const channelInfoSelector = (state: RootState) =>
  state.channel.data.channelInfo;

export const channelSelector = ({ channel }: RootState) => ({
  channelVideos: channel.data.items,
  nextPageToken: channel.data.nextPageToken,
  channelInfo: channel.data.channelInfo,
});

export default channelSlice.reducer;
