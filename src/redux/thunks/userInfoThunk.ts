import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_INFO_URL } from "../../constants/endpointConstants";

export const getUserInfoThunk = createAsyncThunk(
  "userInfo/get",
  async (accessToken: string) => {
    const response = await axios.get(USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken} `,
        Accept: "application/json",
      },
    });

    return {
      name: response.data.items[0].snippet.title,
      avatar: response.data.items[0].snippet.thumbnails.default.url,
    };
  }
);
