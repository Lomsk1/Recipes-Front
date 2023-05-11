import { createSlice } from "@reduxjs/toolkit";
import { getAllIngredientCategory } from "./action";

interface CategoryTypes {
  categoryData: any;
  isLoading: boolean;
  errorMessage: any;
}

export const ingredientCategorySlice = createSlice({
  name: "ingredientCategory",
  initialState: <CategoryTypes>{
    categoryData: [],
    isLoading: true,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllIngredientCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllIngredientCategory.fulfilled, (state, action) => {
      (state.isLoading = false), (state.categoryData = action.payload);
    });
    builder.addCase(getAllIngredientCategory.rejected, (state, action) => {
      state.isLoading = true;
      (state.categoryData = null), (state.errorMessage = action.error);
    });
  },
});

export default ingredientCategorySlice.reducer;
