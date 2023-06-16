import { createSlice } from "@reduxjs/toolkit";

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {},
  reducers: {
    cacheSuggestions: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { cacheSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
