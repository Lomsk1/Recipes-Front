import { axiosInstance } from "@/helper/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCommentLikeApi = createAsyncThunk(
  "commentLikeApi/create",
  async (
    params: {
      user: string;
      comment: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `api/v1/commentLike`,
        {
          user: params.user,
          comment: params.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteCommentLikeApi = createAsyncThunk(
  "commentLikeApi/delete",
  async (
    params: {
      userId: string;
      commentID: string
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.delete(
        `api/v1/commentLike/deleteByUser/${params.userId}/${params.commentID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue(err.message);
    }
  }
);
