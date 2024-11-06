import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!savedUser,
    user: savedUser || null, 
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; 
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; 
      localStorage.removeItem('user'); 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
