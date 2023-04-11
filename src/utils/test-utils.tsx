import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import recommendedVideosReducer from "../redux/slices/recommendedVideosSlice";
import subscriptionsReducer from "../redux/slices/subscriptionsSlice";
import videoDetailsReducer from "../redux/slices/videoDetailsSlice";
import relatedVideosReducer from "../redux/slices/relatedVideosSlice";
import { BrowserRouter } from "react-router-dom";
import type { RootState } from "../redux/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ToolkitStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {} as RootState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        recommendedVideos: recommendedVideosReducer,
        subscriptions: subscriptionsReducer,
        videoDetails: videoDetailsReducer,
        relatedVideos: relatedVideosReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
