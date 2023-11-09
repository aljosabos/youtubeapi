import { SerializedError } from "@reduxjs/toolkit";
import { IComment, IVideo } from "../../types/types";

export interface ICommentsState {
  data: {
    items: IComment[];
    nextPageToken: string;
    totalCount: number;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
