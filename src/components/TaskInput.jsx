import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import icon_2 from "../assets/icons/icon_2.svg";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium"); // Add state for priority
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task) {
      dispatch(
        addTask({
          id: Date.now(),
          text: task,
          priority,
          isImportant: false,
          isCompleted: false,
        })
      );
      setTask(""); 
      setPriority("Medium"); 
    }
    else{
      alert("Please enter a task");
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-6 px-4 pt-8 pb-2 bg-gradient-to-b from-[#eef6ef30] to-[#eef6ef]">
          <input
            type="text"
            className="py-2 duration-200 bg-transparent outline-none focus:border-[1px] focus:border-black focus:bg-white focus:px-4 focus:py-4 rounded"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 mt-2 border border-gray-300 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="flex justify-between mt-4">
            <img className="w-8 h-8 cursor-pointer" src={icon_2} alt="icon" />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 ml-2 font-semibold text-green-600 bg-green-200 rounded bg-opacity-60 hover:bg-opacity-100 acitve:bg-opacity-60"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskInput;
