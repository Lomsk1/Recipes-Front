import { authSlice } from "./slice";

const authStore: any = {
  auth: authSlice.reducer,
};

export default authStore;
