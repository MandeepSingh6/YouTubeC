import { createSlice } from "@reduxjs/toolkit";

const trendingVideosSlice = createSlice({
  name: "trendingVideos",
  initialState: { data: [] },
  reducers: {
    setTrendingVideos: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTrendingVideos } = trendingVideosSlice.actions;
export default trendingVideosSlice.reducer;
