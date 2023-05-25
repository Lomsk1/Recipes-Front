import { createSlice } from "@reduxjs/toolkit";
import { getCommentByRecipe } from "./action";

interface CommentTypes {
  commentData: any;
  isLoading: boolean;
}

export const commentSliceApi = createSlice({
  name: "commentApi",
  initialState: <CommentTypes>{
    commentData: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentByRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCommentByRecipe.fulfilled, (state, action) => {
      (state.isLoading = false), (state.commentData = action.payload);
    });
    builder.addCase(getCommentByRecipe.rejected, (state, action) => {
      state.isLoading = true;
      state.commentData = null;
    });
  },
});

export default commentSliceApi.reducer;
