import { axiosInstance, axiosUnAuthorized } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRecipe = createAsyncThunk(
  "recipeAPI/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("api/v1/recipe");
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
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

export const makeRecipeReview = createAsyncThunk(
  "makeRecipeReview",
  async (
    params: { user: string; recipe: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `api/v1/recipe/${params.recipe}/reviews`,
        {
          user: params.user,
          receipt: params.recipe,
          rating: params.rating,
        },
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
