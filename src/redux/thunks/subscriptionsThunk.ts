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
      nextPageToken: response.data.nextPageToken,
      totalCount: response.data.pageInfo.totalResults,
    };
  }
);

export const getMoreSubscriptionsThunk = createAsyncThunk(
  "subscriptions/loadMore",
  async (nextPageToken: string) => {
    const nextPageTokenParam = `&pageToken=${nextPageToken}`;
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const url = `${SUBSCRIPTIONS_URL}${nextPageTokenParam}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken} `,
        Accept: "application/json",
      },
    });

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }
);
