import React, { useEffect, useState } from "react";
import { LiaUniversitySolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const navigate = useNavigate();
  const singOut = () => {
    logOut();
    const name = user?.displayName
      ? ` ${user.displayName}`
      : "Logout successful";
    toast.success(`Logout successful${name}!`);
    navigate("/");
  };
  const link = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/findpartners"}>Find Partners</Link>
      </li>

      {user && (
        <>
          <li>
            <Link to={"/create-partner-profile"}>Create Partner Profile</Link>
          </li>
          <li>
            <Link to={"/myconnections"}>My Connections</Link>
          </li>
        </>
      )}
    </>
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   html.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <div>
          <Link to={"/"}>
            <p className="btn btn-ghost text-xl">
              StudyMate <br />
              <LiaUniversitySolid className="text-5xl" />
            </p>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      {/* Right side: profile dropdown when logged in, otherwise login/register buttons */}
      <div className="navbar-end">
        {loading ? (
          <div className="pr-2">
            <span
              className="loading loading-spinner text-primary"
              aria-hidden="true"
            ></span>
          </div>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-sm font-semibold">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                  className="toggle"
                />
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={singOut} className="text-left w-full">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
