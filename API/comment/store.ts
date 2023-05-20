import { commentSliceApi } from "./slice";

const commentApiStore: any = {
  commentApi: commentSliceApi.reducer,
};

export default commentApiStore;
