import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import { logout } from "../features/auth/authSlice";

function Layout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div
        className={`${
          isAuthenticated ? "hidden" : ""
        } flex-col flex justify-center items-center h-screen`}
      >
        <LoginPage />
      </div>
      <main className={`flex ${isAuthenticated ? "" : "hidden"}`}>
        <aside className="w-[30%] ">
          <SideBar />
        </aside>
        <div className="relative w-full pt-20">
          <Outlet />
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => dispatch(logout())}
              className="p-2 text-white bg-red-500 rounded "
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
