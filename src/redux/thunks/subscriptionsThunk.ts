import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUBSCRIPTIONS_URL } from "../../constants/endpoints";

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
  async (nextPageTokenParam: string) => {
    const accessToken = localStorage.getItem("access_token");
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
