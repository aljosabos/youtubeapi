import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  VIDEOS_LIST_URL,
  VIDEO_IDS_URL,
} from "../../constants/endpointConstants";
import axios from "axios";
import {
  mapResponseToVideoIDs,
  mapResponseToVideos,
} from "../../utils/responseUtils";

export interface IChannelVideosThunkParams {
  channelId: string;
  nextPageToken: string;
}

/* Because of the youtubeapi limitation, search videos endpoint doesnt provide some informations like video duration. As a workaround, first, the search videos enpoint is called only to get search videos ids, and then video list endpoint is called by passing list of all ids to get all the neccessary information */

export const getChannelVideosThunk = createAsyncThunk(
  "channel/get",
  async (channelId: string) => {
    const { IDs, nextPageToken } = await getChannelVideosIDs(channelId);

    return {
      items: await getChannelVideos(IDs),
      nextPageToken: nextPageToken,
    };
  }
);

export const getMoreChannelVideosThunk = createAsyncThunk(
  "channel/getMore",
  async (params: IChannelVideosThunkParams) => {
    const { IDs, nextPageToken } = await getMoreChannelVideosIDs(
      params.channelId,
      params.nextPageToken
    );

    return {
      items: await getChannelVideos(IDs),
      nextPageToken: nextPageToken,
    };
  }
);

/* helpers */
const getChannelVideosIDs = async (channelId: string) => {
  const response = await axios.get(VIDEO_IDS_URL, {
    params: {
      channelId,
    },
  });

  return {
    IDs: mapResponseToVideoIDs(response.data.items).join(","),
    nextPageToken: response.data.nextPageToken,
  };
};

const getMoreChannelVideosIDs = async (
  channelId: string,
  nextPageToken: string
) => {
  const response = await axios.get(VIDEO_IDS_URL, {
    params: {
      channelId: channelId,
      pageToken: nextPageToken,
    },
  });

  return {
    IDs: mapResponseToVideoIDs(response.data.items).join(","),
    nextPageToken: response.data.nextPageToken,
  };
};

const getChannelVideos = async (videosIDs: string) => {
  const response = await axios.get(VIDEOS_LIST_URL, {
    params: {
      id: videosIDs,
      maxResults: videosIDs.length,
    },
  });

  return mapResponseToVideos(response.data.items);
};
