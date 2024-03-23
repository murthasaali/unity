// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have more slices
  },
});

export default store;

