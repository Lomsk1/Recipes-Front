import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsBySearch } from "./action";

interface IngredientType {
  ingredientSearchData: {
    _id: string;
    name: string;
  }[];
  searchIsLoading: boolean;
}

export const ingredientApiSlice = createSlice({
  name: "ingredientApi",
  initialState: <IngredientType>{
    ingredientSearchData: [],
    searchIsLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsBySearch.pending, (state) => {
      state.searchIsLoading = true;
    });
    builder.addCase(getIngredientsBySearch.fulfilled, (state, action) => {
      (state.searchIsLoading = false),
        (state.ingredientSearchData = action.payload);
    });
    builder.addCase(getIngredientsBySearch.rejected, (state, action) => {
      state.searchIsLoading = true;
    });
  },
});

export default ingredientApiSlice.reducer;
