// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Verify path

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      console.log("Store received action:", action); // Log every action
      return next(action);
    }),
});

export default store;