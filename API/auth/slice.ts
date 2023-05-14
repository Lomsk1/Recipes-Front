import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "./action";

interface AuthTypes {
  isAuthenticated: boolean;
  userInfo: Object | null;
  userToken: string | null;
  allUserInfo: any;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: <AuthTypes>{
    isAuthenticated: false,
    userInfo: {},
    userToken: null,
    allUserInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      (state.isAuthenticated = true),
        (state.userInfo = action.payload),
        (state.userToken = action.payload.token);
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    });
  },
});

export default authSlice.reducer;
