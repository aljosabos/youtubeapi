import { INITIAL_LOAD_SIZE, LOAD_MORE_SIZE } from "./../data/constants";

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INITIAL_LOAD_ENDPOINT } from "../data/constants";

export const initialVideosLoadThunk = createAsyncThunk(
  "videos/initialLoad",
  async () => {
    const response = await axios.get(INITIAL_LOAD_ENDPOINT);
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);

export const loadMoreVideosThunk = createAsyncThunk(
  "videos/loadMore",
  async (nextPageToken: string) => {
    const LOAD_MORE_ENDPOINT =
      `${INITIAL_LOAD_ENDPOINT}&pageToken=${nextPageToken}`.replace(
        `maxResults=${INITIAL_LOAD_SIZE}`,
        `maxResults=${LOAD_MORE_SIZE}`
      );
    const response = await axios.get(LOAD_MORE_ENDPOINT);

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);
