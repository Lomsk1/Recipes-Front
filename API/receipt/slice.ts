import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFilteredRecipe,
  getAllRecipe,
  getRecipeById,
  getRecipeBySlug,
  getRecipeForPagination,
  getRecipesAnnuallyStats,
} from "./action";

interface RecipeTypes {
  recipeData: any;
  isLoading: boolean;
  errorMessage: any;
  receptDataById: any;
  annuallyStats: any;
  annuallyIsLoading: boolean;
  slugRecipe: any;
  slugRecipeIsLoading: boolean;
  recipesForPagination: any;
  paginationIsLoading: boolean;
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
    slugRecipe: [],
    slugRecipeIsLoading: true,
    recipesForPagination: [],
    paginationIsLoading: true,
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

    /* Slug Recipe */
    builder.addCase(getRecipeBySlug.pending, (state) => {
      state.slugRecipeIsLoading = true;
    });
    builder.addCase(getRecipeBySlug.fulfilled, (state, action) => {
      (state.slugRecipeIsLoading = false), (state.slugRecipe = action.payload);
    });
    builder.addCase(getRecipeBySlug.rejected, (state, action) => {
      state.slugRecipeIsLoading = true;
    });

    /* Pagination */
    builder.addCase(getRecipeForPagination.pending, (state) => {
      state.paginationIsLoading = true;
    });
    builder.addCase(getRecipeForPagination.fulfilled, (state, action) => {
      (state.paginationIsLoading = false),
        (state.recipesForPagination = action.payload);
    });
    builder.addCase(getRecipeForPagination.rejected, (state, action) => {
      state.paginationIsLoading = true;
    });
  },
});

export default recipeAPISlice.reducer;
