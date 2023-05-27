import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFilteredRecipe,
  getAllRecipe,
  getRecipeById,
  getRecipesAnnuallyStats,
} from "./action";

interface RecipeTypes {
  recipeData: any;
  isLoading: boolean;
  errorMessage: any;
  receptDataById: any;
  annuallyStats: any;
  annuallyIsLoading: boolean;
}

export const recipeAPISlice = createSlice({
  name: "recipeAPI",
  initialState: <RecipeTypes>{
    recipeData: [],
    receptDataById: [],
    isLoading: true,
    errorMessage: null,
    annuallyStats: [],
    annuallyIsLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRecipe.fulfilled, (state, action) => {
      (state.isLoading = false), (state.recipeData = action.payload);
    });
    builder.addCase(getAllRecipe.rejected, (state, action) => {
      state.isLoading = true;
      (state.recipeData = null), (state.errorMessage = action.error);
    });

    /* Filtered Data */
    builder.addCase(getAllFilteredRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFilteredRecipe.fulfilled, (state, action) => {
      (state.isLoading = false), (state.recipeData = action.payload);
    });
    builder.addCase(getAllFilteredRecipe.rejected, (state, action) => {
      state.isLoading = true;
      (state.recipeData = null), (state.errorMessage = action.error);
    });

    /* By ID */
    builder.addCase(getRecipeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeById.fulfilled, (state, action) => {
      (state.isLoading = false), (state.receptDataById = action.payload);
    });
    builder.addCase(getRecipeById.rejected, (state, action) => {
      state.isLoading = true;
      (state.receptDataById = null), (state.errorMessage = action.error);
    });

    // Annually Stats
    builder.addCase(getRecipesAnnuallyStats.pending, (state) => {
      state.annuallyIsLoading = true;
    });
    builder.addCase(getRecipesAnnuallyStats.fulfilled, (state, action) => {
      (state.annuallyIsLoading = false), (state.annuallyStats = action.payload);
    });
    builder.addCase(getRecipesAnnuallyStats.rejected, (state, action) => {
      state.annuallyIsLoading = true;
    });
  },
});

export default recipeAPISlice.reducer;
