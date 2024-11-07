import { useSelector } from "react-redux";
import TaskList from "../TaskList/TaskList";

function AllTasks() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  // Separate tasks into completed and incomplete
  const completedTasks = sortedTasks.filter((task) => task.isCompleted);
  const incompleteTasks = sortedTasks.filter((task) => !task.isCompleted);

  return (
    <>
      {/* incompleteTasks, completedTasks, isSmallScreen */}
      <TaskList incompleteTasks={incompleteTasks} completedTasks={completedTasks} />
    </>
  );
}

export default AllTasks;
