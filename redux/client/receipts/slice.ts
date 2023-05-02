import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReceiptsTypes {
  sideReceiptIsOpen: boolean;
}

export const receiptSlice = createSlice({
  name: "receipt",
  initialState: <ReceiptsTypes>{
    sideReceiptIsOpen: false,
  },
  reducers: {
    setSideReceiptToggle: (state, action: PayloadAction<boolean>) => {
      state.sideReceiptIsOpen = action.payload;
    },
  },
});

export const { setSideReceiptToggle } = receiptSlice.actions;

export default receiptSlice.reducer;
