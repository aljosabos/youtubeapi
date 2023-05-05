import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { formatResponseToChannelInfo } from "../../utils/responseUtils";
import { IChannelSliceState } from "../types/channelSliceState";
import { IChannelInfo } from "../../types/types";
import { getChannelInfoThunk } from "../thunks/channelInfoThunk";

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
  },
});

export const channelInfoSelector = (state: RootState) =>
  state.channel.data.channelInfo;

export default channelSlice.reducer;
