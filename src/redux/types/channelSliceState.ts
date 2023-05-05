import { SerializedError } from "@reduxjs/toolkit";
import { IChannelInfo, IVideo } from "../../types/types";

export interface IChannelSliceState {
  data: {
    items: IVideo[];
    nextPageToken: string;
    channelInfo: IChannelInfo;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
