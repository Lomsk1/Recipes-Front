import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SidebarTypes {
  sidebarIsOpen: boolean;
  userSidebarIsOpen: boolean;
  adminSidebarIsOpen: boolean;
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: <SidebarTypes>{
    sidebarIsOpen: false,
    userSidebarIsOpen: false,
    adminSidebarIsOpen: false,
  },
  reducers: {
    setSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.sidebarIsOpen = action.payload;
    },
    setUserSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.userSidebarIsOpen = action.payload;
    },
    setAdminSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.adminSidebarIsOpen = action.payload;
    },
  },
});

export const { setSidebarToggle, setUserSidebarToggle, setAdminSidebarToggle } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
