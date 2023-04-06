import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VIDEO_DETAILS_URL } from "../../constants/endpointConstants";
import { formatResponseToVideoDetails } from "../../utils/responseUtils";

export const getVideoDetailsThunk = createAsyncThunk(
  "videoDetails/get",
  async (videoId: string) => {
    const url = `${VIDEO_DETAILS_URL}&id=${videoId}`;
    const response = await axios.get(url);

    return formatResponseToVideoDetails(response.data.items[0]);
  }
);
