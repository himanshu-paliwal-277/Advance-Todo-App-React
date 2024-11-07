import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

function Layout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  return (
    <>
      <Navbar isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
      <div
        className={`${
          isAuthenticated ? "hidden" : ""
        } flex-col flex justify-center items-center h-screen`}
      >
        <LoginPage />
      </div>
      <main className={`flex ${isAuthenticated ? "" : "hidden"} `}>
        <aside className={`sm:w-[30%] w-[100%] sm:relative absolute sm:z-0 z-[5] bg-white ${isOpenSideBar ? "block" : "hidden"}`}>
          <SideBar isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
        </aside>
        <div className="relative w-full pt-20">
          <Outlet />
          <div className="fixed z-20 bottom-4 right-4">
            <button
              onClick={() => dispatch(logout())}
              className="p-2 text-white bg-red-500 rounded"
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
