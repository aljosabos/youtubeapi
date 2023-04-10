import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapResponseToVideos } from "../../utils/responseUtils";
import {
  INITIAL_LOAD_SIZE_PARAM,
  LOAD_MORE_SIZE_PARAM,
  POPULAR_VIDEOS_URL,
} from "../../constants/endpointConstants";

export const getRecommendedVideosThunk = createAsyncThunk(
  "videos/initialLoad",
  async () => {
    const url = `${POPULAR_VIDEOS_URL}${INITIAL_LOAD_SIZE_PARAM}`;
    const response = await axios.get(url);

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);

export const getMoreRecommendedVideosThunk = createAsyncThunk(
  "videos/loadMore",
  async (nextPageToken: string) => {
    const nextPageTokenParam = `&pageToken=${nextPageToken}`;

    const url = `${POPULAR_VIDEOS_URL}${LOAD_MORE_SIZE_PARAM}${nextPageTokenParam}`;

    const response = await axios.get(url);

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);
