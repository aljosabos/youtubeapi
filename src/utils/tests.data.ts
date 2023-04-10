import {
  INITIAL_LOAD_SIZE_PARAM,
  LOAD_MORE_SIZE_PARAM,
  POPULAR_VIDEOS_URL,
} from "../constants/endpointConstants";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  moreRecommendedVideosMock,
  recommendedVideosMock,
} from "./recommendedVideosMock";

export const getRecommendedVideosMockResponse = () => {
  const mock = new MockAdapter(axios);

  const getVideosUrl = `${POPULAR_VIDEOS_URL}${INITIAL_LOAD_SIZE_PARAM}`;

  const getMoreVideosUrl = `${POPULAR_VIDEOS_URL}${LOAD_MORE_SIZE_PARAM}&pageToken=${recommendedVideosMock.data.nextPageToken}`;

  mock
    .onGet(getVideosUrl)
    .reply(200, {
      items: recommendedVideosMock.data.items,
      nextPageToken: recommendedVideosMock.data.nextPageToken,
    });

  mock
    .onGet(getMoreVideosUrl)
    .reply(200, {
      items: moreRecommendedVideosMock.data.items,
      nextPageToken: moreRecommendedVideosMock.data.nextPageToken,
    });
};
