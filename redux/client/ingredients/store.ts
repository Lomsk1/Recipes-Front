import { ingredientSlice } from "./slice";

const ingredientStore: any = {
  ingredientClient: ingredientSlice.reducer,
};

export default ingredientStore;
