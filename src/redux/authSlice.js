// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null,
  notificationCount:localStorage.getItem("notificationCount")||0
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUserid: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    setUser: (state, action) => {
      state.username = action.payload; // Corrected the key to username
      localStorage.setItem('username', action.payload);
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
      localStorage.setItem('notificationCount', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const { setToken, setUserid, setUser, setNotificationCount, logout } = authSlice.actions;
export default authSlice.reducer;
