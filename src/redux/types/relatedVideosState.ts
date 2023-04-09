import { SerializedError } from "@reduxjs/toolkit";
import { IVideo } from "../../types/types";

export interface IRelatedVideosSliceState {
  data: {
    items: IVideo[];
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
