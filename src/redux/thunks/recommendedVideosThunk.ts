import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { POPULAR_VIDEOS_URL } from "../../constants/endpointConstants";
import { INITIAL_LOAD_SIZE, LOAD_MORE_SIZE } from "../../constants/constants";

export const getRecommendedVideosThunk = createAsyncThunk(
  "videos/initialLoad",
  async () => {
    const response = await axios.get(POPULAR_VIDEOS_URL, {
      params: {
        maxResults: INITIAL_LOAD_SIZE,
      },
    });

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);

export const getMoreRecommendedVideosThunk = createAsyncThunk(
  "videos/loadMore",
  async (nextPageToken: string) => {
    const response = await axios.get(POPULAR_VIDEOS_URL, {
      params: {
        maxResults: LOAD_MORE_SIZE,
        pageToken: nextPageToken,
      },
    });

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);
