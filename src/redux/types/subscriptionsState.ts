import { SerializedError } from "@reduxjs/toolkit";
import { ISubscription } from "../../types/types";

export interface ISubscriptionsSliceState {
  data: {
    items: ISubscription[];
    nextPageToken: string;
    totalCount: number;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
