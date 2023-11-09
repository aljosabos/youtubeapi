import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { mapResponseToComments } from "../../utils/response-utils";
import { ICommentsState } from "../types/commentsSliceState";
import { getCommentsThunk } from "../thunks/commentsThunk";

const initialState: ICommentsState = {
  data: {
    items: [],
    nextPageToken: "",
    totalCount: 0,
  },
  status: "idle",
  error: {},
};

export const commentsSlice = createSlice({
  name: "recommendedVideos",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getCommentsThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getCommentsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data.items = mapResponseToComments(action.payload.items);
      state.data.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getCommentsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const commentsSelector = ({ comments }: RootState) => ({
  comments: comments.data.items,
});

export default commentsSlice.reducer;
