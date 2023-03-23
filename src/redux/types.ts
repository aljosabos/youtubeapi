import { SerializedError } from "@reduxjs/toolkit";
import { IVideoResponse } from "./../types/response";

export interface IVideoSliceState {
  data: {
    items: IVideoResponse[];
    nextPageToken: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
