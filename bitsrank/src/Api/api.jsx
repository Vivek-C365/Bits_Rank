import axios from "axios";
import { store } from "../Redux_cm/store";
import { logout, setAccessToken } from "../Redux_cm/Slice/authSlice";

// Set up Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your API URL
  withCredentials: true, // Allow cookies (for refresh token)
});

// Axios interceptor for attaching the access token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios interceptor for handling token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; //s infinite retry loop
      store.dispatch(logout()); // Log out user from Redux state
    }

    // Check if error is 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevents infinite retry loops

      try {
        // Call refresh token endpoint
        const { data } = await api.post(
          "access/Newtoken",
          {},
          { withCredentials: true }
        );

        // Store new access token in Redux
        store.dispatch(setAccessToken(data.accessToken));

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out and redirect
        if (
          refreshError.response?.status === 401 ||
          refreshError.response?.status === 403
        ) {
          store.dispatch(logout()); // Log out user from Redux state
          window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
