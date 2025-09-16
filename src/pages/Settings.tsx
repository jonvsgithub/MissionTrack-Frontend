import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useTheme } from "../hook/useTheme";

// Import the components you are rendering
import Profile from "../Components/Settings/Profile";
import Password from "../Components/Settings/Password";
import Notification from "../Components/Settings/Notification";

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      {/* ✅ Full-Width Header */}
      <header
        className={`flex items-center justify-between px-6 py-4 border-b ${
          theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
        }`}
      >
        {/* Left: Title */}
        <div>
          <h1 className="bg-gradient-to-r font-bold text-2xl max-sm:text-2xl from-[#4D8FFAE5] to-[#11A677E5] text-transparent bg-clip-text">
            Mission Track
          </h1>
        </div>

        {/* Right: Theme Toggle + User Icon */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg border text-sm font-medium hover:opacity-80 transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* User Icon */}
          <Link to="/profile">
            <FiUser
              size={28}
              className={theme === "light" ? "text-gray-700 hover:text-blue-500" : "text-gray-200 hover:text-blue-400"}
            />
          </Link>
        </div>
      </header>

      {/* ✅ Body: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`w-64 p-5 ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          {/* Navigation */}
          <nav className="space-y-3">
            <div
              className={`flex gap-3 items-center p-2 rounded ${
                theme === "light"
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <VscHome size={20} className="text-blue-500" />
              <Link to="/dashboard" className="font-bold">
                Dashboard
              </Link>
            </div>

            <div
              className={`flex gap-3 items-center p-2 rounded ${
                theme === "light"
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <CiBellOn size={20} className="text-blue-500" />
              <Link to="/notifications" className="font-bold">
                Notifications
              </Link>
            </div>

            <div
              className={`flex gap-3 items-center p-2 rounded ${
                theme === "light"
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <FiUser size={20} className="text-blue-500" />
              <Link to="/profile" className="font-bold">
                Profile
              </Link>
            </div>
          </nav>

          {/* Quick Actions */}
          <div className="mt-10">
            <p className="font-bold mb-3">Quick Actions</p>
            <div className="space-y-3">
              <div className="flex gap-2 items-center text-sm">
                <VscHome size={20} className="text-blue-500" />
                <Link to="/missions/new" className="text-sm">
                  New Mission Request
                </Link>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <VscHome size={20} className="text-blue-500" />
                <Link to="/missions/manage" className="text-sm">
                  Manage Missions
                </Link>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <VscHome className="text-blue-500" size={20} />
                <Link to="/missions/history" className="text-sm">
                  Mission History
                </Link>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-orange-500 text-white mt-20  p-2 items-center rounded-2xl text-center text-xl w-32">
            <Link to="/login">Logout</Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 overflow-auto">

          <Profile />
          <Password />
          <Notification />
        </main>
      </div>
    </div>
  );
};

export default Settings;
