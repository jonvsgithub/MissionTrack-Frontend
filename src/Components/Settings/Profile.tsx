import React, { useState } from "react";
import { FaBell, FaCalendar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

const Profile: React.FC = () => {
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("password")) return "password";
    if (path.includes("preference")) return "notifications";
    if (path.includes("calendar")) return "calendar";
    return "personal";
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg shadow-sm mb-6">
          <h1 className="font-semibold text-xl text-center text-gray-800">
            Manage your information and preferences
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <Link
                to="profileA"
                className={`flex items-center gap-2 py-4 border-b-2 transition-all ${activeTab === "personal"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
              >
                <FiUser size={18} />
                <span className="font-medium">Personal Information</span>
              </Link>

              <Link
                to="passwordA"
                className={`flex items-center gap-2 py-4 border-b-2 transition-all ${activeTab === "password"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
              >
                <MdLockOutline size={18} />
                <span className="font-medium">Password</span>
              </Link>

              <Link
                to="preferencea"
                className={`flex items-center gap-2 py-4 border-b-2 transition-all ${activeTab === "notifications"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
              >
                <FaBell size={18} />
                <span className="font-medium">Notifications</span>
              </Link>

              <Link
                to="calendar"
                className={`flex items-center gap-2 py-4 border-b-2 transition-all ${activeTab === "calendar"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
              >
                <FaCalendar size={18} />
                <span className="font-medium">Calendar</span>
              </Link>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
