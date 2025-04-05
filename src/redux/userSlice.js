// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    role: "",
    profilePicture: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("setUser action received in reducer:", action.payload); // Debug
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      console.log("clearUser action received in reducer");
      return { id: null, firstname: "", lastname: "", email: "", country: "", role: "", profilePicture: null, token: null };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;