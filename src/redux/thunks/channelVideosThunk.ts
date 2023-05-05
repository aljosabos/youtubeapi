import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CHANNEL_INFO_URL,
  VIDEOS_LIST_URL,
  VIDEO_IDS_URL,
} from "../../constants/endpointConstants";
import axios from "axios";
import {
  mapResponseToVideoIDs,
  mapResponseToVideos,
} from "../../utils/responseUtils";

/* Because of the youtubeapi limitation, search videos endpoint doesnt provide some informations like video duration. As a workaround, first, the search videos enpoint is called only to get search videos ids, and then video list endpoint is called by passing list of all ids to get all the neccessary information */

export const getChannelVideosThunk = createAsyncThunk(
  "channel/get",
  async (channelId: string) => {
    const searchVideosIDs = await getChannelVideosIDs(channelId);

    return await getChannelVideos(searchVideosIDs);
  }
);

export const getMoreChannelVideosThunk = createAsyncThunk(
  "channel/getMore",
  async ({
    channelId,
    nextPageToken,
  }: {
    channelId: string;
    nextPageToken: string;
  }) => {
    const searchVideosIDs = await getMoreChannelVideosIDs(
      channelId,
      nextPageToken
    );

    return await getChannelVideos(searchVideosIDs);
  }
);

/* helpers */
const getChannelVideosIDs = async (channelId: string) => {
  const response = await axios.get(VIDEO_IDS_URL, {
    params: {
      id: channelId,
    },
  });

  console.log(response);

  return mapResponseToVideoIDs(response.data.items).join(",");
};

const getMoreChannelVideosIDs = async (
  channelId: string,
  nextPageToken: string
) => {
  const response = await axios.get(VIDEO_IDS_URL, {
    params: {
      id: channelId,
      pageToken: nextPageToken,
    },
  });

  return mapResponseToVideoIDs(response.data.items).join(",");
};

const getChannelVideos = async (videosIDs: string) => {
  const response = await axios.get(VIDEOS_LIST_URL, {
    params: {
      id: videosIDs,
      maxResults: videosIDs.length,
    },
  });

  console.log(response);

  return {
    items: mapResponseToVideos(response.data.items),
    nextPageToken: response.data.nextPageToken,
  };
};
