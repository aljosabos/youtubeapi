import { POPULAR_VIDEOS_URL } from "../constants/endpointConstants";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  moreRecommendedVideosMock,
  recommendedVideosMock,
} from "./recommendedVideosMock";

export const mockAxiosRequests = () => {
  const mock = new MockAdapter(axios);

  mock.onGet(POPULAR_VIDEOS_URL, { params: { maxResults: 16 } }).reply(200, {
    items: recommendedVideosMock.data.items,
    nextPageToken: recommendedVideosMock.data.nextPageToken,
  });

  mock
    .onGet(POPULAR_VIDEOS_URL, {
      params: {
        maxResults: 4,
        pageToken: recommendedVideosMock.data.nextPageToken,
      },
    })
    .reply(200, {
      items: moreRecommendedVideosMock.data.items,
      nextPageToken: moreRecommendedVideosMock.data.nextPageToken,
    });
};
