import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./slices/bookmarkSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    auth: authReducer,
  },
});
