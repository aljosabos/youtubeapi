import { SerializedError } from "@reduxjs/toolkit";

export interface IUserInfoState {
  data: {
    name: string;
    avatar: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
