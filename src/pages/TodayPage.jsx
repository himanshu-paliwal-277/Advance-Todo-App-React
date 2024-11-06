import { useDispatch, useSelector } from "react-redux";
import TaskInput from "../components/taskInput";
import {
  deleteTask,
  fetchWeather,
  toggleCompletion,
  toggleImportance,
} from "../features/tasks/taskSlice";
import delete_button from "../assets/icons/delete_button.svg";
import { useEffect, useState } from "react";

// Define the selectTodayTasks function outside the component
function selectTodayTasks(tasks) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  return tasks.filter((task) => task?.createdAt?.startsWith(today));
}

function TodayPage() {
  const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux state
  const dispatch = useDispatch();
  const [city, setCity] = useState("Ujjain");

  // Get today's tasks
  const todayTasks = selectTodayTasks(tasks);
  console.log(todayTasks);

  const sortedTasks = [...todayTasks].sort((a, b) => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 }; // Define order of priorities
    return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort tasks based on priority
  });

  const completedTasks = sortedTasks.filter((task) => task.isCompleted);
  const incompleteTasks = sortedTasks.filter((task) => !task.isCompleted);

  const weather = useSelector((state) => state.tasks.weather);

  useEffect(() => {
    handleFetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchWeather = () => {
    const city = "Ujjain"; // Replace with dynamic input if needed
    dispatch(fetchWeather(city));
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <h1 className="px-4 pb-2 border-b-[1px] flex justify-between">
        <span>To Do:</span>
        {weather && (
          <div className="flex gap-4">
            {/* <h2 className="font-semibold">{weather.name}</h2> */}
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
        <div className="flex items-center ">
          <label htmlFor="city" className="font-semibold">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="w-16 px-2 py-1 border-none rounded outline-none"
          />
          <button
            onClick={() => dispatch(fetchWeather(city))}
            className="py-[2px] px-2 text-white bg-blue-500 rounded"
          >
            Fetch
          </button>
        </div>
      </h1>
      <TaskInput /> 
      <div className="py-4">
        <h2 className="text-xl font-semibold">Incomplete Tasks</h2>
        {incompleteTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between px-2 py-4 duration-500 border-b cursor-pointer group"
          >
            <div className="flex items-center">
              {/* Checkbox for marking the task as completed */}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => dispatch(toggleCompletion(task.id))}
                className="mr-4 scale-110"
              />

              <span
                className={`mr-2 ${
                  task.isCompleted ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text.length > 70
                  ? task.text.substring(0, 70) + "..."
                  : task.text}{" "}
                - {task.priority}
              </span>

              <input
                type="checkbox"
                checked={task.isImportant}
                onChange={() => dispatch(toggleImportance(task.id))}
                className="absolute right-6"
              />
            </div>

            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="hidden mr-12 duration-200 group-hover:block"
            >
              <img
                className="w-5 h-5 opacity-70 hover:scale-105 active:scale-95"
                src={delete_button}
                alt="delete button"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="py-4 mt-6">
        <h2 className="text-xl font-semibold">Completed Tasks</h2>
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between px-2 py-4 duration-500 border-b cursor-pointer group"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => dispatch(toggleCompletion(task.id))}
                className="mr-4 scale-110"
                disabled
              />

              <span
                className={`mr-2 ${
                  task.isCompleted ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text.length > 70
                  ? task.text.substring(0, 70) + "..."
                  : task.text}{" "}
                - {task.priority}
              </span>

              <input
                type="checkbox"
                checked={task.isImportant}
                onChange={() => dispatch(toggleImportance(task.id))}
                className="absolute right-6"
                disabled
              />
            </div>

            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="hidden mr-12 duration-200 group-hover:block"
            >
              <img
                className="w-5 h-5 opacity-70 hover:scale-105 active:scale-95"
                src={delete_button}
                alt="delete button"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodayPage;
