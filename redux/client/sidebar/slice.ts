import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SidebarTypes {
  sidebarIsOpen: boolean;
  userSidebarIsOpen: boolean;
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: <SidebarTypes>{
    sidebarIsOpen: false,
    userSidebarIsOpen: false,
  },
  reducers: {
    setSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.sidebarIsOpen = action.payload;
    },
    setUserSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.userSidebarIsOpen = action.payload;
    },
  },
});

export const { setSidebarToggle, setUserSidebarToggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
