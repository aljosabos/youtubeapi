import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHANNEL_INFO_URL } from "../../constants/endpointConstants";

export const getChannelInfoThunk = createAsyncThunk(
  "channelInfo/get",
  async (channelId: string) => {
    const response = await axios.get(CHANNEL_INFO_URL, {
      params: {
        id: channelId,
      },
    });

    return {
      channelInfo: response.data.items[0],
    };
  }
);
