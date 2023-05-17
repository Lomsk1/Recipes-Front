import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PopupTypes {
  message: string | null;
}

export const popupSlice = createSlice({
  name: "popupClient",
  initialState: <PopupTypes>{
    message: null,
  },
  reducers: {
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = popupSlice.actions;

export default popupSlice.reducer;
