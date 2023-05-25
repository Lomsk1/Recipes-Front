import { axiosInstance } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createRecipeFavorite = createAsyncThunk(
  "recipeFavorite/create",
  async (
    params: {
      user: string;
      recipeID: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `api/v1/recipeFavorite`,
        {
          user: params.user,
          recipe: params.recipeID,
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

export const deleteRecipeFavoriteApi = createAsyncThunk(
    "RecipeFavoriteApi/delete",
    async (
      params: {
        userId: string;
        recipeId: string
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axiosInstance.delete(
          `api/v1/recipeFavorite/deleteByUser/${params.userId}/${params.recipeId}`,
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
  
