// store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from "../features/JobSlicer.js";

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});