import { recipeSlice } from "./slice";

const recipeStore: any = {
  recipe: recipeSlice.reducer,
};

export default recipeStore;
