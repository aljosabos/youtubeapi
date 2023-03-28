import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_SUBSCRIPTIONS_URL } from "../../data/constants";

export const getSubscriptionsThunk = createAsyncThunk("subscriptions/initialLoad", async () => {
  const accessToken = localStorage.getItem("access_token");

  const response = await axios.get(GET_SUBSCRIPTIONS_URL, {
    headers: { Authorization: `Bearer ${accessToken} `, Accept: "application/json" },
  });

  return {
    items: response.data.items,
    nextPageToken: response.data.nextPageToken,
    totalCount: response.data.pageInfo.totalResults,
  };
});

export const getMoreSubscriptionsThunk = createAsyncThunk("subscriptions/loadMore", async (nextPageTokenParam: string) => {
  const accessToken = localStorage.getItem("access_token");

  const response = await axios.get(`${GET_SUBSCRIPTIONS_URL}${nextPageTokenParam}`, {
    headers: { Authorization: `Bearer ${accessToken} `, Accept: "application/json" },
  });

  return {
    items: response.data.items,
    nextPageToken: response.data.nextPageToken,
  };
});
