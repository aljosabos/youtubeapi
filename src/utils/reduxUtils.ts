import axios from "axios";
import {
  RELATED_VIDEOS_URL,
  RELATED_VIDEO_IDS_URL,
} from "../constants/endpointConstants";
import {
  mapResponseToRelatedVideoIDs,
  mapResponseToVideos,
} from "./responseUtils";

export const getRelatedVideosIDs = async (videoId: string) => {
  const relatedToVideoIdParam = `&relatedToVideoId=${videoId}`;
  const url = `${RELATED_VIDEO_IDS_URL}${relatedToVideoIdParam}`;

  const response = await axios.get(url);

  return mapResponseToRelatedVideoIDs(response.data.items).join(",");
};

export const getRelatedVideos = async (videosIDs: string) => {
  const url = `${RELATED_VIDEOS_URL}&id=${videosIDs}&maxResults=${videosIDs.length}`;

  const response = await axios.get(url);

  return {
    items: mapResponseToVideos(response.data.items),
  };
};
