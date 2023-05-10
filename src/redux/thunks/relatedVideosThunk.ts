import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  VIDEOS_LIST_URL,
  RELATED_VIDEO_IDS_URL,
} from "../../constants/endpointConstants";
import axios from "axios";
import {
  mapResponseToVideoIDs,
  mapResponseToVideos,
} from "../../utils/response-utils";

/* Because of the youtubeapi limitation, related videos endpoint doesnt provide some informations like video duration. As a workaround, first, the related videos enpoint is called only to get related videos ids, and then video list endpoint is called by passing list of all ids to get all the neccessary information */

export const getRelatedVideosThunk = createAsyncThunk(
  "relatedVideos/initialLoad",
  async (videoId: string) => {
    const relatedVideosIDs = await getRelatedVideosIDs(videoId);

    return await getRelatedVideos(relatedVideosIDs);
  }
);

/* helpers */
const getRelatedVideosIDs = async (videoId: string) => {
  const response = await axios.get(RELATED_VIDEO_IDS_URL, {
    params: {
      relatedToVideoId: videoId,
    },
  });

  return mapResponseToVideoIDs(response.data.items).join(",");
};

const getRelatedVideos = async (videosIDs: string) => {
  const response = await axios.get(VIDEOS_LIST_URL, {
    params: {
      id: videosIDs,
      maxResults: videosIDs.length,
    },
  });

  return {
    items: mapResponseToVideos(response.data.items),
  };
};
