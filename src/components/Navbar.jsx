import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, handleSingOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-5 md:mx-0 flex justify-between items-center mt-10">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img className="w-9 h-9" src={logo} alt="" />
          <h2 className="hidden md:block font-black text-3xl font-row">
            TASKS
          </h2>
        </Link>
      </div>
      <div className="hidden lg:block">
        <div className="flex gap-5 font-semibold text-gray-500 text-p">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/myTasks">My Tasks</NavLink>
          <NavLink to="/addTask">Add Task</NavLink>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <i className="fa-solid fa-moon text-black text-4xl"></i>
          ) : (
            <i className="fa-regular fa-moon text-4xl"></i>
          )}
        </button>
        {user ? (
          <div className="flex items-center gap-2">
            <h2 className="hidden md:block font-black text-xl">
              {user?.displayName}
            </h2>
            <div>
              <img
                data-tooltip-id="tooltip"
                data-tooltip-content={user?.displayName}
                className="w-12 h-12 object-cover rounded-full"
                src={user?.photoURL}
                alt="User"
              />
            </div>
            <button
              onClick={handleSingOut}
              className="hidden md:block bg-black text-white font-bold py-2 lg:py-2.5 px-7 rounded-full"
            >
              Sign Out
            </button>
            <button onClick={handleSingOut} className="block md:hidden">
              <i className="fa-solid fa-right-to-bracket text-4xl"></i>
            </button>
            <Tooltip id="tooltip" place="top" type="dark" effect="float" />
          </div>
        ) : (
          <div>
            <button className="hidden md:block bg-black text-white font-bold py-2 lg:py-2.5 px-7 rounded-full">
              <Link to="/signIn">Sign In</Link>
            </button>
            <button className="block md:hidden">
              <Link to="/signIn">
                <i className="fa-solid fa-user text-4xl"></i>
              </Link>
            </button>
          </div>
        )}
        <div className="block lg:hidden">
          <i
            className="fa-solid fa-bars text-4xl dark:text-white"
            onClick={toggleSidebar}
          ></i>
          <div
            className={`fixed z-10 left-0 top-0 h-screen w-2/3 md:w-1/3 bg-gray-800 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform`}
          >
            <i
              className="fa-solid fa-times text-white text-3xl absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            ></i>
            <nav className="flex flex-col text-white p-8 space-y-4">
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/myTasks" onClick={() => setIsOpen(false)}>
                My Tasks
              </NavLink>
              <NavLink to="/addTask" onClick={() => setIsOpen(false)}>
                Add Task
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
