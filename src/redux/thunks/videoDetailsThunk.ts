import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_VIDEO_DETAILS_URL } from "../../constants/endpoints";

export const getVideoDetailsThunk = createAsyncThunk("videoDetails/get", async (videoId: string) => {
  const response = await axios.get(`${GET_VIDEO_DETAILS_URL}&id=${videoId}`);

  console.log(response);

  return {
    id: response.data.items[0].id,
    data: response.data.items[0].snippet,
    statistics: response.data.items[0].statistics,
  };
});
