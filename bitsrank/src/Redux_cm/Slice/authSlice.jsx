import { createSlice } from "@reduxjs/toolkit";

// Check if token is available in localStorage
const tokenFromLocalStorage = localStorage.getItem("accessToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: tokenFromLocalStorage,
    // Set isAuthenticated based on whether a token exists
    setIsAuthenticated: !!tokenFromLocalStorage, // true if token exists, false otherwise
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.setIsAuthenticated = true; // Set authenticated to true when token is set
      state.accessToken = action.payload;
      // Store token in localStorage when set in Redux
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.setIsAuthenticated = false;
      // Clear token from localStorage when removed from Redux
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
