/* eslint-disable react/prop-types */
import {
  deleteTask,
  toggleCompletion,
  toggleImportance,
} from "../features/tasks/taskSlice";
import delete_button from "../assets/icons/delete_button.svg";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
function TaskList({incompleteTasks, completedTasks }) {
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      <div className="pb-10 pl-4 sm:pl-0 sm:pb-0">
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

                <div
                  className={`mr-2 flex flex-col sm:flex-row sm:items-center ${
                    task.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  <span>{task.text.length > (isSmallScreen ? 18 : 70)
                    ? task.text.substring(0, isSmallScreen ? 18 : 70) + "..."
                    : task.text}</span>{" "}
                    <span>
                    - {task.priority}  
                    </span>
                </div>

                <input
                  type="checkbox"
                  checked={task.isImportant}
                  onChange={() => dispatch(toggleImportance(task.id))}
                  className="absolute right-6"
                />
              </div>

              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="absolute hidden duration-200 right-14 group-hover:block z-[4]"
              >
                <img
                  className="w-4 h-4 sm:h-5 sm:w-5 opacity-70 hover:scale-105 active:scale-95"
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

<div
                  className={`mr-2 flex flex-col sm:flex-row sm:items-center ${
                    task.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  <span>{task.text.length > (isSmallScreen ? 18 : 70)
                    ? task.text.substring(0, isSmallScreen ? 18 : 70) + "..."
                    : task.text}</span>{" "}
                    <span>
                    - {task.priority}  
                    </span>
                </div>

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
                className="absolute hidden duration-200 right-14 group-hover:block z-[4]"
              >
                <img
                  className="w-4 h-4 sm:h-5 sm:w-5 opacity-70 hover:scale-105 active:scale-95"
                  src={delete_button}
                  alt="delete button"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TaskList;
