import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <>
      <nav className="absolute z-10 flex items-center justify-between w-full h-16 px-10 bg-white shadow">
        <div className="flex items-center gap-3 text-xl">
          <div className="p-4">
            <FontAwesomeIcon icon={faBars} /> {/* Bars icon */}
          </div>
          <h1 className="font-bold">Advance Todo App</h1>
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
