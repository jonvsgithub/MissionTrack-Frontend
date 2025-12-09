import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa"; // Sun & Moon
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hook/useTheme";
 // your custom hook

const NavBar: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme(); // get theme and toggle function

  return (
    <nav
      className={`flex justify-between items-center px-6 py-3 shadow ${
        theme === "light" ? "bg-white text-gray-700" : "bg-gray-900 text-gray-200"
      }`}
    >
      {/* Left side - Logo */}
      <div className="flex items-center space-x-3">
        {/* Wave Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 72 40"
          className="w-10 h-10"
          fill="currentColor"
        >
          <rect x="2" y="4" width="3" height="32" rx="1.5" />
          <rect x="10" y="6" width="3" height="28" rx="1.5" />
          <rect x="18" y="8" width="3" height="24" rx="1.5" />
          <rect x="26" y="10" width="3" height="20" rx="1.5" />
          <rect x="34" y="12" width="3" height="16" rx="1.5" />
          <rect x="42" y="14" width="3" height="12" rx="1.5" />
          <rect x="50" y="16" width="3" height="8" rx="1.5" />
          <rect x="58" y="18" width="3" height="4" rx="1.5" />
          <rect x="66" y="20" width="3" height="2" rx="1.5" />
        </svg>

        {/* Logo Text */}
        <span className="font-bold tracking-wide text-lg">
          LOGO<span className="font-normal">IPSUM</span>
        </span>
      </div>

      {/* Right side - Notification + User + Theme */}
      <div className="flex  items-center gap-6">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className=""
        >
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>

        {/* Notification */}
        <div className="relative">
          <CiBellOn size={22} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            {user?.name?.charAt(0).toUpperCase() || <FiUser />}
          </div>
          <span>{user?.name || "Employee"}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;