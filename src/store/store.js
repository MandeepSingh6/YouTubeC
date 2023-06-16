import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import suggestionsSlice from "./suggestionsSlice";
import trendingVideosSlice from "./trendingVideosSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    trendingVideos: trendingVideosSlice,
    suggestions: suggestionsSlice,
  },
});

export default store;
