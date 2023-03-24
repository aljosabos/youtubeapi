import { SerializedError } from "@reduxjs/toolkit";
import { IVideo } from "./../types/response";

export interface IVideoSliceState {
  data: {
    items: IVideo[];
    nextPageToken: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
