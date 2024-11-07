import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
function Navbar({isOpenSideBar, setIsOpenSideBar}) {
  return (
    <>
      <nav className="absolute z-10 flex items-center justify-between w-full h-16 bg-white shadow sm:px-10">
        <div className="flex items-center sm:gap-3">
          <div className="p-4" onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
            <FontAwesomeIcon icon={faBars} /> {/* Bars icon */}
          </div>
          <h1 className="text-lg font-bold sm:text-xl">Advance Todo App</h1>
        </div>
        <div className="flex gap-5">
          <button className="">
            <FontAwesomeIcon className="text-xl" icon={faMagnifyingGlass} />{" "}
          </button>
          <div>{/* <ThemeButton /> */}</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
