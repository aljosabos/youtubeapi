import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recommendedVideosReducer from "./slices/recommendedVideosSlice";
import subscriptionsReducer from "./slices/subscriptionsSlice";
import videoDetailsReducer from "./slices/videoDetailsSlice";
import relatedVideosReducer from "./slices/relatedVideosSlice";
import searchedVideosReducer from "./slices/searchVideosSlice";
import settingsReducer from "./slices/settingsSlice";
import userInfoReducer from "./slices/userInfoSlice";
import channelReducer from "./slices/channelSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  recommendedVideos: recommendedVideosReducer,
  subscriptions: subscriptionsReducer,
  videoDetails: videoDetailsReducer,
  relatedVideos: relatedVideosReducer,
  searchedVideos: searchedVideosReducer,
  channel: channelReducer,
  settings: settingsReducer,
  userInfo: userInfoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings", "userInfo"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
