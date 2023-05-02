import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SidebarTypes {
  sidebarIsOpen: boolean;
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: <SidebarTypes>{
    sidebarIsOpen: false,
  },
  reducers: {
    setSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.sidebarIsOpen = action.payload;
    },
  },
});

export const { setSidebarToggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
