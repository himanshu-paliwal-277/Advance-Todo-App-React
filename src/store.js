// src/store.js
// import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/taskSlice';
import authReducer from './features/auth/authSlice';

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});

export default store;
