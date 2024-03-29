import { createSlice } from "@reduxjs/toolkit";
import { IChangeLanguageAction, ISettingsState } from "../types/settingsState";
import { RootState } from "../store";

const initialState: ISettingsState = {
  data: {
    language: "",
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeLanguage(state, action: IChangeLanguageAction) {
      state.data.language = action.payload;
    },
  },
});

export const languageSelector = (state: RootState) =>
  state.settings?.data?.language;

export const { changeLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
