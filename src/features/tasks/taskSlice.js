import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

export const fetchWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (city) => {
    const API_key = "06ba6cec98feb37a49e4a88663a54251";
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    );
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: loadTasks(), weather: null },
  reducers: {
    addTask: (state, action) => {
      const taskWithDateAndProps = {
        ...action.payload,
        createdAt: new Date().toISOString(),
        isCompleted: false, 
        isImportant: false, 
      };
      state.tasks.push(taskWithDateAndProps);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },

    toggleCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save tasks to localStorage
      }
    },

    toggleImportance: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
        // Save tasks to localStorage
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    });
  },
});

export const { addTask, deleteTask, toggleCompletion, toggleImportance } =
  tasksSlice.actions;

export default tasksSlice.reducer;
