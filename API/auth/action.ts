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
      throw rejectWithValue(err.response.data);
    }
  }
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (
    params: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      passwordConfirm: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosUnAuthorized.post("api/v1/users/signup", {
        email: params.email,
        password: params.password,
        passwordConfirm: params.passwordConfirm,
        firstName: params.firstName,
        lastName: params.lastName,
      });
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.response.data);
    }
  }
);
