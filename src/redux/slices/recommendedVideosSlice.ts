import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import {
  getMoreRecommendedVideosThunk,
  getRecommendedVideosThunk,
} from "../thunks/recommendedVideosThunk";
import { IRecommendedVideosState } from "../types/recommendedVideosState";
import { mapResponseToVideos } from "../../utils/responseUtils";

const initialState: IRecommendedVideosState = {
  data: {
    items: [],
    nextPageToken: "",
  },
  status: "idle",
  error: {},
};

export const recommendedVideosSlice = createSlice({
  name: "recommendedVideos",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRecommendedVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(getRecommendedVideosThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = {};
      state.data.items = mapResponseToVideos(action.payload.items);
      state.data.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getRecommendedVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });

    builder.addCase(getMoreRecommendedVideosThunk.pending, (state, _) => {
      state.status = "loading";
      state.error = {};
    });

    builder.addCase(
      getMoreRecommendedVideosThunk.fulfilled,
      (state, action) => {
        const mappedVideos = mapResponseToVideos(action.payload.items);
        state.status = "succeeded";
        state.error = {};
        state.data = {
          items: [...state.data.items, ...mappedVideos],
          nextPageToken: action.payload.nextPageToken,
        };
      }
    );

    builder.addCase(getMoreRecommendedVideosThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const recommendedVideosSelector = ({
  recommendedVideos,
}: RootState) => ({
  recommendedVideos: recommendedVideos.data.items,
  status: recommendedVideos.status,
  nextPageToken: recommendedVideos.data.nextPageToken,
});

export default recommendedVideosSlice.reducer;
