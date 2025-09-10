import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useTheme } from "../hook/useTheme";


import MissionOverview from "../Components/MissionOverview";
import RecentActivities from "../Components/RecentActivities";
import QuickLinks from "../Components/QuickLinks";

import AnnualMissionStatuses from "../chart/AnnualMissionStatuses";
import ThisMonthChart from "../chart/ThisMonthChart";
import ExpensesChart from "../chart/ExpensesChart";

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Helper for theme-based classes
  const twTheme = (light: string, dark: string) => (theme === "light" ? light : dark);

  // Sidebar navigation
  const navItems = [
    { icon: VscHome, label: "Dashboard", path: "/dashboard" },
    { icon: CiBellOn, label: "Notifications", path: "/notifications" },
    { icon: FiUser, label: "Profile", path: "/profile" },
  ];

  // Quick actions
  const quickActions = [
    { icon: VscHome, label: "New Mission Request", path: "/missions/new" },
    { icon: VscHome, label: "Expanse Loging", path: "/missions/loging" },
    { icon: VscHome, label: "Mission History", path: "/missions/history" },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${twTheme("bg-gray-50", "bg-gray-900")}`}>
      {/* Header */}
      <header
        className={`flex items-center justify-between px-6 py-4 border-b ${twTheme(
          "bg-white border-gray-200",
          "bg-gray-800 border-gray-700"
        )}`}
      >
        <div className="flex justify-between gap-4">
          <img src="src/assets/logo.svg" alt="" />
          <h1 className=" font-bold text-3xl mt-1 max-sm:text-2xl  text-transparent bg-clip-text">
            <span className="text-primaryColor-700">Mission</span> <span className="text-accent-700">Track</span>T
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg border text-sm font-medium hover:opacity-80 transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <Link to="/profile">
            <FiUser
              size={28}
              className={twTheme("text-gray-700 hover:text-blue-500", "text-gray-200 hover:text-blue-400")}
            />
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`w-64 p-5 ${twTheme("bg-white text-black", "bg-gray-800 text-white")}`}>
          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map(({ icon: Icon, label, path }) => (
              <div
                key={label}
                className={`flex gap-3 items-center p-2 rounded ${twTheme(
                  "bg-white text-black hover:bg-gray-100",
                  "bg-gray-800 text-white hover:bg-gray-700"
                )}`}
              >
                <Icon size={20} className="text-blue-500" />
                <Link to={path} className="font-bold">
                  {label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="mt-10">
            <p className="font-bold mb-3">Quick Actions</p>
            <div className="space-y-3">
              {quickActions.map(({ icon: Icon, label, path }) => (
                <div key={label} className="flex gap-2 items-center text-sm">
                  <Icon size={20} className="text-blue-500" />
                  <Link to={path} className="text-sm">
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <Link
            to="/login"
            className="bg-green-800 mt-60 justify-center items-center text-white p-2 rounded-2xl text-center text-xl w-32 block "
          >
            Logout
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-10 mr-15">
          {/* Overview */}
          <div className="mb-6">
            <h1 className={`font-bold mb-4 ${twTheme("text-black", "text-white")}`}>
              Here's your mission request overview
            </h1>
            <MissionOverview />
          </div>

          {/* Grid Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivities />
            <QuickLinks />
          </div>
          <div className="flex mt-10 gap-20 p-6">
            
             <div className="flex gap-20">
              <div className="w-100 h-100">
                <AnnualMissionStatuses/>
              </div>
              <div className="w-100 h-100">
                <ThisMonthChart/>
              </div>
               
    </div>
   <div className="w-100 ">
      <ExpensesChart />
    </div>
          </div>
         
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
