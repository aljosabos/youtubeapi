import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RELATED_VIDEOS_URL,
  RELATED_VIDEO_IDS_URL,
} from "../../constants/endpointConstants";
import axios from "axios";
import {
  mapResponseToRelatedVideoIDs,
  mapResponseToVideos,
} from "../../utils/responseUtils";

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
  const param = `&relatedToVideoId=${videoId}`;
  const url = `${RELATED_VIDEO_IDS_URL}${param}`;

  const response = await axios.get(url);

  return mapResponseToRelatedVideoIDs(response.data.items).join(",");
};

const getRelatedVideos = async (videosIDs: string) => {
  const param = `&maxResults=${videosIDs.length}`;
  const url = `${RELATED_VIDEOS_URL}&id=${videosIDs}${param}`;

  const response = await axios.get(url);

  return {
    items: mapResponseToVideos(response.data.items),
  };
};
