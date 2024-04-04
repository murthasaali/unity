// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save the token to local storage
    },
    setUserid: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload); // Save the token to local storage
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('username', action.payload); // Save the token to local storage
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const { setToken,setUserid,logout,setUser } = authSlice.actions;
export default authSlice.reducer;

