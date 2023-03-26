import { GET_INITIAL_VIDEOS_URL, GET_MORE_VIDEOS_URL } from "./../data/constants";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapResponseToVideos } from "../utils/mapResponse";

export const getInitialVideosThunk = createAsyncThunk("videos/initialLoad", async () => {
  const response = await axios.get(GET_INITIAL_VIDEOS_URL);

  return {
    items: mapResponseToVideos(response.data.items),
    nextPageToken: response.data.nextPageToken,
  };
});

export const getMoreVideosThunk = createAsyncThunk("videos/loadMore", async (nextPageTokenParam: string) => {
  const response = await axios.get(`${GET_MORE_VIDEOS_URL}${nextPageTokenParam}`);

  return {
    items: mapResponseToVideos(response.data.items),
    nextPageToken: response.data.nextPageToken,
  };
});
