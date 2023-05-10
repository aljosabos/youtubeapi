import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VIDEO_DETAILS_URL } from "../../constants/endpointConstants";
import { formatResponseToVideoDetails } from "../../utils/response-utils";

export const getVideoDetailsThunk = createAsyncThunk(
  "videoDetails/get",
  async (videoId: string) => {
    const response = await axios.get(VIDEO_DETAILS_URL, {
      params: {
        id: videoId,
      },
    });

    return formatResponseToVideoDetails(response.data.items[0]);
  }
);
