import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VIDEO_COMMENTS_URL } from "../../constants/endpointConstants";

export const getCommentsThunk = createAsyncThunk(
  "comments/get",
  async (videoId: string) => {
    const response = await axios.get(VIDEO_COMMENTS_URL, {
      params: {
        videoId,
        textFormat: "plainText",
      },
    });

    return {
      nextPageToken: response.data.nextPageToken,
      totalResults: response.data.pageInfo.totalResults,
      items: response.data?.items,
    };
  }
);
