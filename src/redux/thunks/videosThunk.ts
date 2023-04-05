import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapResponseToVideos } from "../../utils/mapResponseUtils";
import {
  INITIAL_LOAD_SIZE_PARAM,
  LOAD_MORE_SIZE_PARAM,
  POPULAR_VIDEOS_URL,
} from "../../constants/endpointConstants";

export const getInitialVideosThunk = createAsyncThunk(
  "videos/initialLoad",
  async () => {
    const url = `${POPULAR_VIDEOS_URL}${INITIAL_LOAD_SIZE_PARAM}`;
    const response = await axios.get(url);

    return {
      items: mapResponseToVideos(response.data.items),
      nextPageToken: response.data.nextPageToken,
    };
  }
);

export const getMoreVideosThunk = createAsyncThunk(
  "videos/loadMore",
  async (nextPageTokenParam: string) => {
    const url = `${POPULAR_VIDEOS_URL}${LOAD_MORE_SIZE_PARAM}${nextPageTokenParam}`;
    const response = await axios.get(url);

    return {
      items: mapResponseToVideos(response.data.items),
      nextPageToken: response.data.nextPageToken,
    };
  }
);
