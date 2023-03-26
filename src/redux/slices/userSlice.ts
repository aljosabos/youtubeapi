import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const isLoggedInSelector = (state: RootState) => state.user.isUserLoggedIn;

export default userSlice.reducer;
export const { userLoggedIn } = userSlice.actions;
