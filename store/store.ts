import ingredientCategoryStore from "@/API/ingCategory/store";
import sidebarStore from "@/redux/client/sidebar/store";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import ingredientStore from "@/redux/client/ingredients/store";
import recipeStore from "@/redux/client/receipts/store";
import recipeAPIStore from "@/API/receipt/store";
import authStore from "@/API/auth/store";
import popupStore from "@/redux/client/popup/store";
import commentApiStore from "@/API/comment/store";
import commentLikeApiStore from "@/API/commentLike/store";
import recipeFavoriteApiStore from "@/API/recipeFavorite/store";

const rootReducer = combineReducers({
  ...sidebarStore,
  ...recipeStore,
  ...ingredientCategoryStore,
  ...recipeAPIStore,
  ...ingredientStore,
  ...authStore,
  ...popupStore,
  ...commentApiStore,
  ...commentLikeApiStore,
  ...recipeFavoriteApiStore,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
