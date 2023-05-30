import { axiosUnAuthorized } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIngredientsBySearch = createAsyncThunk(
  "IngredientApi/bySearch",
  async (params: { ingredient: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `api/v1/ingredient/search/${params.ingredient}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);
