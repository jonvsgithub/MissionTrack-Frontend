import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";
import RecentActivities from "./RecentActivities";
import QuickLinks from "./QuickLinks";
import MissionOverview from "./MissionOverview";
import { useTheme } from "../hook/useTheme";


const Dashboard: React.FC = () => {
  const { theme } = useTheme(); 

  return (
    <div className={`flex min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      {/* Sidebar */}
      <aside className={`w-64 p-5 ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
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

          <div className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded">
            <CiBellOn size={20} className="text-blue-500" />
            <Link to="/notifications" className="font-bold">
              Notifications
            </Link>
          </div>
          <div className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded">
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
              <Link to="" className="text-lg">New Mission Request</Link>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <VscHome size={20} className="text-blue-500" />
              <Link to="" className="text-lg">New Mission Request</Link>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <VscHome className="text-blue-500" size={20}/>
              <Link to="" className="text-lg">New Mission Request</Link>
            </div>
          </div>
        </div>

        <div className="bg-orange-500 text-white mt-30 p-2 items-center rounded-2xl text-center text-xl w-27">
          <a href="/login">Logout</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Overview Section */}
        <div className="p-6">
          <h1 className={`font-bold mb-4 ${theme === "light"?" text-black" : " text-white"}`}>
            Here's your mission request overview
          </h1>
          <MissionOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <QuickLinks />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
