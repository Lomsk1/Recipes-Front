import receiptStore from "@/redux/client/receipts/store";
import sidebarStore from "@/redux/client/sidebar/store";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  ...sidebarStore,
  ...receiptStore,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
