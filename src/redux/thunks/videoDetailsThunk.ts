import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_VIDEO_DETAILS_URL } from "../../constants/endpoints";

export const getVideoDetailsThunk = createAsyncThunk("videoDetails/get", async (videoId: string) => {
  const response = await axios.get(`${GET_VIDEO_DETAILS_URL}&id=${videoId}`);

  console.log(response);

  return {
    data: response.data.items[0].snippet,
    id: response.data.items[0].id,
  };
});
