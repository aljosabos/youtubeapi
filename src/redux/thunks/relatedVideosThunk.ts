import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRelatedVideos, getRelatedVideosIDs } from "../../utils/reduxUtils";

/* Because of the youtubeapi limitation, related videos endpoint doesnt provide some informations like video duration. As a workaround, first, the related videos enpoint is called only to get related videos ids, and then video list endpoint is called by passing list of all ids to get all the neccessary information */

export const getRelatedVideosThunk = createAsyncThunk(
  "relatedVideos/initialLoad",
  async (videoId: string) => {
    const relatedVideosIDs = await getRelatedVideosIDs(videoId);

    return await getRelatedVideos(relatedVideosIDs);
  }
);
