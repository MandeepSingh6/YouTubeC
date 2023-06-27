import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    searchQuery: "",
    darkMode: false,
    sidebarAbsolute: false,
  },

  reducers: {
    toogleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    toogleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    makeSidebarAbsolute: (state) => {
      state.sidebarAbsolute = true;
    },
    makeSidebarRelative: (state) => {
      state.sidebarAbsolute = false;
    },
  },
});

export const {
  toogleMenu,
  openMenu,
  closeMenu,
  setSearchQuery,
  toogleDarkMode,
  makeSidebarAbsolute,
  makeSidebarRelative,
} = appSlice.actions;
export default appSlice.reducer;
