import { createSlice } from "@reduxjs/toolkit";

interface CommentLikeTypes {
  commentLikeData: any;
  isLoading: boolean;
}

export const commentLikeSliceApi = createSlice({
  name: "commentLikeApi",
  initialState: <CommentLikeTypes>{
    commentLikeData: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getAllRecipe.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getAllRecipe.fulfilled, (state, action) => {
    //   (state.isLoading = false), (state.recipeData = action.payload);
    // });
    // builder.addCase(getAllRecipe.rejected, (state, action) => {
    //   state.isLoading = true;
    //   (state.recipeData = null), (state.errorMessage = action.error);
    // });
  },
});

export default commentLikeSliceApi.reducer;
