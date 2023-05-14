import { axiosUnAuthorized } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllIngredientCategory = createAsyncThunk(
  "IngCategory/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("api/v1/ingredientCategory");
      return data;
    } catch (err: any) {
     throw rejectWithValue(err.message);
    }
  }
);
