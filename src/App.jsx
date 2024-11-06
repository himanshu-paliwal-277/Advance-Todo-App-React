import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import "./index.css";
import TaskList from './components/taskList';
import TodayPage from "./pages/TodayPage";
import ImportantTasks from "./pages/ImportantTasks";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/allTasks" element={<TaskList />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/important" element={<ImportantTasks />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
