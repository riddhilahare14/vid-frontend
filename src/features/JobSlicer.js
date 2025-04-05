// features/JobSlicer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: []
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.jobs.push(action.payload);
    }
  }
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;  