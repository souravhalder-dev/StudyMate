import React, { useEffect, useState } from "react";
import { LiaUniversitySolid } from "react-icons/lia";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const singOut = () => {
    logOut();
    const name = user?.displayName ? ` ${user.displayName}` : "";
    toast.success(`Logout successful${name}!`);
    navigate("/");
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/findpartners" onClick={() => setMenuOpen(false)}>
          Find Partners
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/create-partner-profile"
              onClick={() => setMenuOpen(false)}
            >
              Create Partner Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/myconnections" onClick={() => setMenuOpen(false)}>
              My Connections
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto px-4">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-between lg:justify-start">
          {/* Mobile Menu Button */}
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <LiaUniversitySolid className="text-4xl text-primary" />
            <span className="text-xl font-bold">StudyMate</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right Section */}
        <div className="flex-none">
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full">
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <label className="flex items-center gap-2">
                    <span>Dark Mode</span>
                    <input
                      onChange={(e) => handleTheme(e.target.checked)}
                      type="checkbox"
                      defaultChecked={theme === "dark"}
                      className="toggle"
                    />
                  </label>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={singOut}>Logout</button>
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-base-100 shadow-md border-t">
          <ul className="menu menu-vertical p-3 space-y-2">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
