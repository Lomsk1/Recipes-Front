import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IngredientTypes {
  ingredients: string[];
}

export const ingredientSlice = createSlice({
  name: "ingredientClient",
  initialState: <IngredientTypes>{
    ingredients: [],
  },
  reducers: {
    setIngredients: (state, action: PayloadAction<string[]>) => {
      state.ingredients = action.payload;
    },
  },
});

export const { setIngredients } = ingredientSlice.actions;

export default ingredientSlice.reducer;
