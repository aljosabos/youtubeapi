import { SerializedError } from "@reduxjs/toolkit";
import { IVideoDetails } from "../../types/types";

export interface IVideoDetailsSliceState {
  data: IVideoDetails;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
