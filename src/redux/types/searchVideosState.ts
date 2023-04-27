import { SerializedError } from "@reduxjs/toolkit";
import { IVideo } from "../../types/types";

export interface ISearchVideosStateSlice {
  data: {
    items: IVideo[];
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
