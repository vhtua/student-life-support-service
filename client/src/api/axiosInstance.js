import axios from 'axios';

import context from "../context";


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: context.serverBaseUrl,  // Adjust the base URL to match your backend
  withCredentials: true,  // Include credentials (cookies) in the requests
});

// Request Interceptor: Attach the access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach access token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 errors (access token expiration)
axiosInstance.interceptors.response.use(
  (response) => response,  // Simply return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 response, it means the access token is expired
    if (error.response.status === 401 || error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;  // Avoid infinite retries

      try {
        // Call the /refresh-token endpoint to get a new access token
        const { data } = await axiosInstance.post(context.apiEndpoint.refreshTokenRoute, {}, { withCredentials: true });

        // Store the new access token in localStorage
        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // console.clear();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, log out the user and redirect to /login
        // await axiosInstance.post('/logout', {}, { withCredentials: true });
        window.location.href = context.appRoute.logout; 
        localStorage.removeItem('accessToken');
        window.location.href = context.appRoute.login;  // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    // Return the error if it's not a 401 or retry failed
    return Promise.reject(error);
  }
);

export default axiosInstance;
