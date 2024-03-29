import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister } from "./action";

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
    /*       Login        */
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
    /*        Sing Up          */
    builder.addCase(authRegister.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(authRegister.fulfilled, (state, action) => {
      (state.isAuthenticated = true),
        (state.userInfo = action.payload),
        (state.userToken = action.payload.token);
    });
    builder.addCase(authRegister.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    });
  },
});

export default authSlice.reducer;
