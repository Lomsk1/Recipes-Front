import { axiosInstance, axiosUnAuthorized } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getRecipeReviewByRecipe = createAsyncThunk(
//   "reviewApi/getByRecipe",
//   async (params: { recipeID: string }, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosUnAuthorized.get(
//         `api/v1/review/byRecipe/${params.recipeID}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return data;
//     } catch (err: any) {
//       throw rejectWithValue(err.message);
//     }
//   }
// );

// export const updateCommentApi = createAsyncThunk(
//   "commentApi/update",
//   async (
//     params: {
//       id: string | null;
//       user: string | null;
//       receipt: string | null;
//       comment: string | null;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await axiosInstance.patch(
//         `api/v1/comment/${params.id}`,
//         { user: params.user, comment: params.comment, receipt: params.receipt }
//       );
//       return data;
//     } catch (err: any) {
//       throw rejectWithValue(err.message);
//     }
//   }
// );

// export const createCommentApi = createAsyncThunk(
//   "commentApi/create",
//   async (
//     params: { user: string; receipt: string; comment: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await axiosInstance.post(
//         "api/v1/comment",
//         {
//           user: params.user,
//           receipt: params.receipt,
//           comment: params.comment,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return data;
//     } catch (err: any) {
//       throw rejectWithValue(err.message);
//     }
//   }
// );
