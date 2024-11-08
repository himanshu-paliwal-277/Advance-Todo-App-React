import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import "./index.css";
import TodayPage from "./pages/TodayPage";
import ImportantTasks from "./pages/ImportantTasks";
import AllTasks from "./pages/AllTasks";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/allTasks" element={<AllTasks />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/important" element={<ImportantTasks />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
