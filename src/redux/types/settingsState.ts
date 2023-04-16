import { SerializedError } from "@reduxjs/toolkit";

export interface ISettingsState {
  data: {
    language: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: SerializedError;
}
