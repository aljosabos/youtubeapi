import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUBSCRIPTIONS_URL } from "../../constants/endpointConstants";
import { ACCESS_TOKEN } from "../../constants/constants";

export const getSubscriptionsThunk = createAsyncThunk(
  "subscriptions/initialLoad",
  async (accessToken: string) => {
    const response = await axios.get(SUBSCRIPTIONS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken} `,
        Accept: "application/json",
      },
    });

    return {
      items: response.data.items,
      nextPageToken: response?.data?.nextPageToken,
      totalCount: response.data.pageInfo.totalResults,
    };
  }
);

export const getMoreSubscriptionsThunk = createAsyncThunk(
  "subscriptions/loadMore",
  async (nextPageToken: string) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const response = await axios.get(SUBSCRIPTIONS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken} `,
        Accept: "application/json",
      },
      params: {
        pageToken: nextPageToken,
      },
    });

    return {
      items: response?.data?.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);

export const subscribeToChannelThunk = createAsyncThunk(
  "subscriptions/subscribe",
  async (channelId: string) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const response = await axios.post(
      "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&fields=id,snippet(title,resourceId(channelId),thumbnails(high(url)))",
      {
        snippet: { resourceId: { channelId: channelId } },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    console.log(response.data);

    return response.data;
  }
);

export const unsubscribeFromChannelThunk = createAsyncThunk(
  "subscriptions/unsubscribe",
  async (id: string) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    await axios.delete(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?id=${id}&key=${process.env.REACT_APP_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken} `,
          Accept: "application/json",
        },
      }
    );

    return { id };
  }
);
