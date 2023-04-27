import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  VIDEOS_LIST_URL,
  SEARCH_VIDEO_IDS_URL,
} from "../../constants/endpointConstants";
import axios from "axios";
import {
  mapResponseToVideoIDs,
  mapResponseToVideos,
} from "../../utils/responseUtils";

/* Because of the youtubeapi limitation, search videos endpoint doesnt provide some informations like video duration. As a workaround, first, the search videos enpoint is called only to get search videos ids, and then video list endpoint is called by passing list of all ids to get all the neccessary information */

export const searchVideosThunk = createAsyncThunk(
  "searchedVideos/get",
  async (searchTerm: string) => {
    const searchVideosIDs = await getSearchedVideosIDs(searchTerm);

    return await getSearchedVideos(searchVideosIDs);
  }
);

/* helpers */
const getSearchedVideosIDs = async (searchTerm: string) => {
  const response = await axios.get(SEARCH_VIDEO_IDS_URL, {
    params: {
      q: searchTerm,
    },
  });

  return mapResponseToVideoIDs(response.data.items).join(",");
};

const getSearchedVideos = async (videosIDs: string) => {
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
