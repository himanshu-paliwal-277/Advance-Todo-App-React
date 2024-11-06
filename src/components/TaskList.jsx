import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleCompletion,
  toggleImportance,
} from "../features/tasks/taskSlice";
import delete_button from "../assets/icons/delete_button.svg";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 }; 
    return priorityOrder[b.priority] - priorityOrder[a.priority]; 
  });

  // Separate tasks into completed and incomplete
  const completedTasks = sortedTasks.filter((task) => task.isCompleted);
  const incompleteTasks = sortedTasks.filter((task) => !task.isCompleted);

  return (
    <div>
      <div className="py-4">
        <h2 className="text-xl font-semibold">Incomplete Tasks</h2>
        {incompleteTasks.map((task) => (
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
              {/* <label>Important</label> */}
            </div>

            {/* Delete button */}
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
    </div>
  );
};

export default TaskList;
