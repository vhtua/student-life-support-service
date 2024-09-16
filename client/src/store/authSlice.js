import { createSlice } from '@reduxjs/toolkit';

// Retrieve the user from localStorage if it exists
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user: storedUser,  // Initialize the user from localStorage
  isAuthenticated: !!storedUser,  // Set isAuthenticated to true if user exists
  error: null,  // Holds any error message from login
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;  // Clear any previous errors

      // Store user in localStorage
      // localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Remove user from localStorage
      localStorage.removeItem('user');
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;
