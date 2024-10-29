import { configureStore } from "@reduxjs/toolkit";
import { userAuthApi } from "./Service/userAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./Slice/authSlice";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth: authReducer,
  },

  // Middleware is a function that takes getDefaultMiddleware and returns
  // an array of middleware functions. getDefaultMiddleware returns an
  // array of middleware functions that are included with Redux Toolkit.
  // We concatenate the userAuthApi.middleware with the default middleware
  // to add the RTK Query middleware to the store. RTK Query middleware
  // is required for RTK Query to work.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});

setupListeners(store.dispatch);


