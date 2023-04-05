import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VIDEO_DETAILS_URL } from "../../constants/endpointConstants";

export const getVideoDetailsThunk = createAsyncThunk(
  "videoDetails/get",
  async (videoId: string) => {
    const url = `${VIDEO_DETAILS_URL}&id=${videoId}`;
    const response = await axios.get(url);

    return {
      id: response.data.items[0].id,
      data: response.data.items[0].snippet,
      statistics: response.data.items[0].statistics,
    };
  }
);
