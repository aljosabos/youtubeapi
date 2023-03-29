import { SerializedError } from "@reduxjs/toolkit";

export interface IVideoDetails {
  id: string;
  title: string;
  channelId: string;
  channnelTitle: string;
  description: string;
  publishedAt: string;
  tags: string[];
  thumbnails: {
    high: {
      url: string;
    };
  };
}

export interface IVideoDetailsSliceState {
  data: IVideoDetails;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
