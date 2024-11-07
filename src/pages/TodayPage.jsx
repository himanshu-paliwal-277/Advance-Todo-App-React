import { useDispatch, useSelector } from "react-redux";
import TaskInput from "../components/TaskInput";
import { fetchWeather } from "../features/tasks/taskSlice";
import { useEffect, useState } from "react";
import TaskList from "../TaskList/TaskList";

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
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
          <span className="hidden sm:block">To Do:</span>
          {weather && (
            <div className="flex gap-12 sm:gap-4">
              {/* <h2 className="font-semibold">{weather.name}</h2> */}
              <p>Temperature: {weather.main.temp} °C</p>
              <p className="hidden sm:block">Humidity: {weather.main.humidity}%</p>
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
        </div>
      </h1>
      <TaskInput />
      <TaskList
        incompleteTasks={incompleteTasks}
        completedTasks={completedTasks}
      />
    </>
  );
}

export default TodayPage;
