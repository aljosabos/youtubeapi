import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  mapResponseToRelatedVideoIDs,
  mapResponseToVideos,
} from "../../utils/mapResponse";
import {
  RELATED_VIDEOS_URL,
  RELATED_VIDEO_IDS_URL,
} from "../../constants/endpoints";

/* Because of the youtubeapi limitation, related videos endpoint doesnt provide some informations like video duration. Because of that, first, the related videos enpoint is called only to get related video ids, and then video list endpoint is called by passing list of all ids to get all the neccessary informations */

export const getRelatedVideosThunk = createAsyncThunk(
  "relatedVideos/initialLoad",
  async (videoId: string) => {
    const relatedToVideoIdParam = `&relatedToVideoId=${videoId}`;
    const idsURL = `${RELATED_VIDEO_IDS_URL}${relatedToVideoIdParam}`;

    const relatedVideoIDsResponse = await axios.get(idsURL);

    const relatedVideoIDs = mapResponseToRelatedVideoIDs(
      relatedVideoIDsResponse.data.items
    ).join(",");

    const videosURL = `${RELATED_VIDEOS_URL}&id=${relatedVideoIDs}&maxResults=${relatedVideoIDs.length}`;

    const relatedVideosResponse = await axios.get(videosURL);

    return {
      items: mapResponseToVideos(relatedVideosResponse.data.items),
    };
  }
);
