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

export const getRecipesAnnuallyStats = createAsyncThunk(
  "recipeAPI/getAnnuallyStats",
  async (params: { year: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `api/v1/recipe/recipe-stats/${params.year}`
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getRecipeBySlug = createAsyncThunk(
  "recipeAPI/getRecipeBySlug",
  async (params: { slug: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `api/v1/recipe/slug/${params.slug}`
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getRecipeForPagination = createAsyncThunk(
  "recipeAPI/getRecipeForPagination",
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `api/v1/recipe?page=${params.page}&limit=${params.limit}`
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createRecipe = createAsyncThunk(
  "recipeAPI/createRecipe",
  async (params: { recipe: any }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("api/v1/recipe", params.recipe);
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "recipeAPI/updateRecipe",
  async (params: { recipeID: string; recipe: any }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `api/v1/recipe/${params.recipeID}`,
        params.recipe
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);
