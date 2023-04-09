import { SerializedError } from "@reduxjs/toolkit";
import { IVideo } from "../../types/types";

export interface IRecommendedVideosState {
  data: {
    items: IVideo[];
    nextPageToken: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
