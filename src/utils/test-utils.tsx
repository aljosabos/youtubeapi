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
import { MemoryRouter } from "react-router-dom";
import { RootState, persistor } from "../redux/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { IUserContextProps, UserContext } from "../context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ToolkitStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  initialEntries?: Array<string>,
  userContext?: IUserContextProps,
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
      <MemoryRouter initialEntries={initialEntries}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <Provider store={store}>
            <UserContext.Provider value={userContext || ({} as IUserContextProps)}>
              <PersistGate loading={null} persistor={persistor}>
                <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
              </PersistGate>
            </UserContext.Provider>
          </Provider>
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
