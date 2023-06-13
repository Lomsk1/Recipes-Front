import { axiosInstance, axiosUnAuthorized } from "@/helper/axios";
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

export const userUpdate = createAsyncThunk(
  "auth/userUpdate",
  async (params: { userData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        "api/v1/users/updateMe",
        params.userData
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const passwordUpdate = createAsyncThunk(
  "auth/passwordUpdate",
  async (
    params: {
      password: {
        password: string;
        passwordConfirm: string;
        passwordCurrent: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.patch(
        "api/v1/users/updateMyPassword",
        {
          passwordCurrent: params.password.passwordCurrent,
          password: params.password.password,
          passwordConfirm: params.password.passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("api/v1/users/logout");
      return data;
    } catch (err:any) {
      throw rejectWithValue(err.message);
    }
  }
);
