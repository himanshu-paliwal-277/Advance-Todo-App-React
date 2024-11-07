/* eslint-disable react/prop-types */
import icon_1 from "../assets/icons/icon_1.svg";
import icon_2 from "../assets/icons/icon_2.svg";
import icon_3 from "../assets/icons/icon_3.svg";
import icon_4 from "../assets/icons/icon_4.svg";
import icon_5 from "../assets/icons/icon_5.svg";
// import icon_6 from "../assets/icons/icon_6.svg";
import PieChart from "./PieChart";
import icon_7 from "../assets/icons/icon_7.svg";
import { useLocation, useNavigate } from "react-router-dom";
import userImage from "../assets/images/userImage.jpg";
import { useSelector } from "react-redux";

function SideBar({ setIsOpenSideBar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.tasks);

  console.log(path);

  return (
    <>
      <div
        className={`sticky top-[-76px] flex flex-col items-center w-full h-screen sm:px-[52px] pt-32 text-sm `}
      >
        <div className="absolute flex flex-col items-center top-20">
          <div className="w-20 h-[76px]  rounded-full bg-gray-100">
            <img
              className="w-full h-full opacity-60"
              src={userImage}
              alt="user Image"
            />
          </div>
          <h1 className="mt-1 font-semibold">
            Hey, {user ? user.name.split(" ")[0] : "ABCD"}
          </h1>
        </div>
        <div className={`w-full px-5 pt-16 bg-[#eef6ef] `}>
          <ul className="w-full px-1 mb-2 bg-white py-7">
            <li
              className={`flex items-center h-[35px] gap-3 px-3 rounded-lg cursor-pointer hover:bg-green-50 ${
                path === "/allTasks" ? "bg-green-50" : ""
              }`}
              onClick={() => {
                navigate("/allTasks");
                setTimeout(() => {
                  setIsOpenSideBar(false);
                }, 400);
              }}
            >
              <img className="w-5 h-5 mx-1" src={icon_1} />
              <span className="font-semibold">All Tasks</span>
            </li>
            <li
              className={`flex items-center h-[35px] gap-3 px-3 rounded-lg cursor-pointer hover:bg-green-50 ${
                path === "/today" ? "bg-green-50" : ""
              }`}
              onClick={() => {navigate("/today"); setTimeout(() => {
                setIsOpenSideBar(false);
              }, 400);}}
            >
              <img className="w-7 h-7" src={icon_2} />
              <span className="font-semibold">Today</span>
            </li>
            <li
              className={`flex items-center h-[35px] gap-3 px-3 rounded-lg cursor-pointer hover:bg-green-50 ${
                path === "/important" ? "bg-green-50" : ""
              }`}
              onClick={() => {navigate("/important"); setTimeout(() => {
                setIsOpenSideBar(false);
              }, 400);}}
            >
              <img className="w-7 h-7" src={icon_3} />
              <span className="font-semibold">Important</span>
            </li>
            <li className="flex items-center h-[35px] gap-3 px-3 rounded-lg cursor-pointer hover:bg-green-50">
              <img className="w-7 h-7" src={icon_4} />
              <span className="font-semibold">Planned</span>
            </li>
            <li className="flex items-center h-[35px] gap-3 px-3 rounded-lg cursor-pointer hover:bg-green-50">
              <img className="w-7 h-7" src={icon_5} />
              <span className="font-semibold">Assigned to me</span>
            </li>
          </ul>
          {/* <div className="bg-white cursor-pointer ">
            <button className="flex items-center gap-2 px-4 py-3 ">
              <img className="w-7 h-7 " src={icon_6} alt="" />
              <span>Add list</span>
            </button>
          </div> */}
          <div className="font-semibold">
            <div className="flex justify-between px-6 py-4 mt-2 text-base bg-white">
              <div className="flex gap-2">
                <h2>Total Tasks</h2>
                <span>{tasks?.length}</span>
              </div>
              <div>
                <img className="w-6 h-6" src={icon_7} />
              </div>
            </div>
            <div className="w-full px-[36px] pt-4 mt-1 bg-white">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
