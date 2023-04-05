import { SerializedError } from "@reduxjs/toolkit";
import { ISubscriptionsResponse } from "../../types/response";

export interface ISubscriptionsSliceState {
  data: {
    items: ISubscriptionsResponse[];
    nextPageToken: string;
    totalCount: number;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}