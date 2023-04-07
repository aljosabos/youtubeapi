import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  mapResponseToRelatedVideoIDs,
  mapResponseToVideos,
} from "../../utils/responseUtils";
import {
  RELATED_VIDEOS_URL,
  RELATED_VIDEO_IDS_URL,
} from "../../constants/endpointConstants";

/* Because of the youtubeapi limitation, related videos endpoint doesnt provide some informations like video duration. As a workaround, first, the related videos enpoint is called only to get related videos ids, and then video list endpoint is called by passing list of all ids to get all the neccessary informations */

export const getRelatedVideosThunk = createAsyncThunk(
  "relatedVideos/initialLoad",
  async (videoId: string) => {
    const relatedToVideoIdParam = `&relatedToVideoId=${videoId}`;
    const url = `${RELATED_VIDEO_IDS_URL}${relatedToVideoIdParam}`;

    const response = await axios.get(url);

    const relatedVideosIDs = mapResponseToRelatedVideoIDs(
      response.data.items
    ).join(",");

    return getRelatedVideos(relatedVideosIDs);
  }
);

const getRelatedVideos = async (videosIDs: string) => {
  const url = `${RELATED_VIDEOS_URL}&id=${videosIDs}&maxResults=${videosIDs.length}`;

  const response = await axios.get(url);

  return {
    items: mapResponseToVideos(response.data.items),
  };
};
