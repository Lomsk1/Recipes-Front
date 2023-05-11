import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecipesTypes {
  sideRecipeIsOpen: boolean;
  filteredRecipe: string[];
}

export const recipeSlice = createSlice({
  name: "recipe",
  initialState: <RecipesTypes>{
    sideRecipeIsOpen: false,
    filteredRecipe: [],
  },
  reducers: {
    setSideRecipeToggle: (state, action: PayloadAction<boolean>) => {
      state.sideRecipeIsOpen = action.payload;
    },
    setFilteredRecipe: (state, action: PayloadAction<string[]>) => {
      state.filteredRecipe = action.payload;
    },
  },
});

export const { setSideRecipeToggle, setFilteredRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
