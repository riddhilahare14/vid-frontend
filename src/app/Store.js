// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from "../features/JobSlicer";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
