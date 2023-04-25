import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { IUserInfoState } from "../types/userInfoState";
import { getUserInfoThunk } from "../thunks/userInfoThunk";

const initialState: IUserInfoState = {
  data: {
    name: "",
    avatar: "",
  },
  status: "idle",
  error: {},
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getUserInfoThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data = action.payload;
    });

    builder.addCase(getUserInfoThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const userInfoSelector = ({ userInfo }: RootState) => ({
  username: userInfo.data.name,
  userAvatar: userInfo.data.avatar,
});

export default userInfoSlice.reducer;
