import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapResponseToVideos } from "../../utils/mapResponse";
import {
  GET_INITIAL_RELATED_VIDEOS_URL,
  GET_MORE_RELATED_VIDEOS_URL,
} from "../../constants/endpoints";

export const getRelatedVideosThunk = createAsyncThunk(
  "relatedVideos/initialLoad",
  async (videoId: string) => {
    const relatedToVideoIdParam = `&relatedToVideoId=${videoId}`;
    const response = await axios.get(
      `${GET_INITIAL_RELATED_VIDEOS_URL}${relatedToVideoIdParam}`
    );

    return {
      items: mapResponseToVideos(response.data.items),
      nextPageToken: response.data.nextPageToken,
    };
  }
);

export const getMoreRelatedVideosThunk = createAsyncThunk(
  "relatedVideos/loadMore",
  async (nextPageTokenParam: string) => {
    const response = await axios.get(
      `${GET_MORE_RELATED_VIDEOS_URL}${nextPageTokenParam}`
    );

    return {
      items: mapResponseToVideos(response.data.items),
      nextPageToken: response.data.nextPageToken,
    };
  }
);
