import { useSelector } from "react-redux";
import TaskList from "../TaskList/TaskList";

const ImportantTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const importantTasks = tasks.filter((task) => task.isImportant);

  const sortedTasks = [...importantTasks].sort((a, b) => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const completedTasks = sortedTasks.filter((task) => task.isCompleted);
  const incompleteTasks = sortedTasks.filter((task) => !task.isCompleted);

  return (
    <>
      <TaskList incompleteTasks={incompleteTasks} completedTasks={completedTasks} />
    </>
  );
};

export default ImportantTasks;
