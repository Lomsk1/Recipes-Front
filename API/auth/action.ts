import { axiosUnAuthorized } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.post("api/v1/users/login", {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (err: any) {
      throw rejectWithValue(err);
    }
  }
);
