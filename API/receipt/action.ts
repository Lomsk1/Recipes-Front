import { axiosUnAuthorized } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRecipe = createAsyncThunk(
  "recipeAPI/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("api/v1/recipe");
      return data;
    } catch (err: any) {
      throw  rejectWithValue(err.message);
    }
  }
);

export const getAllFilteredRecipe = createAsyncThunk(
  "recipeAPI/getAllFiltered",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.post("api/v1/recipe/filter", {
        id: params.id,
      });
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "recipeAPI/getByID",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `api/v1/recipe/${params.id}`
      );
      return data;
    } catch (err: any) {
     throw rejectWithValue(err.message);
    }
  }
);
