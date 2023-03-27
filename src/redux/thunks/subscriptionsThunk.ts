import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUBSCRIPTIONS_URL } from "../../data/constants";

export const getSubscriptionsThunk = createAsyncThunk("subscriptions/initialLoad", async () => {
  const accessToken = localStorage.getItem("access_token");

  const response = await axios.get(SUBSCRIPTIONS_URL, {
    headers: { Authorization: `Bearer ${accessToken} `, Accept: "application/json" },
  });

  return {
    items: response.data.items,
    nextPageToken: response.data.nextPageToken,
  };
});
