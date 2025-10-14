import React from "react";
import HeaderFin from "./HeaderFin";
import FinanceSidebar from "./FinanceSidebar";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const OngoingMissions: React.FC = () => {
  const missions = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      title: "Mission Title",
      location: "Location",
      startDate: "Jan 12,2025",
      endDate: "Jan 12,2025",
      progressDay: 6,
      totalDays: 7,
      budgetPercent: 70,
      totalSpent: "RF800k",
      totalBudget: "RF 1.2 M",
      status: "On Track",
      expenses: [
        { label: "Accommodation", spent: 120, limit: 200 },
        { label: "Transport", spent: 120, limit: 200 },
        { label: "Meal", spent: 120, limit: 200 },
        { label: "Others", spent: 120, limit: 200 },
      ],
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      title: "Mission Title",
      location: "Location",
      startDate: "Jan 12,2025",
      endDate: "Jan 12,2025",
      progressDay: 7,
      totalDays: 7,
      budgetPercent: 104,
      totalSpent: "RF800k",
      totalBudget: "RF 1.2 M",
      status: "Over Budget",
      expenses: [
        { label: "Accommodation", spent: 120, limit: 200 },
        { label: "Transport", spent: 120, limit: 200 },
        { label: "Meal", spent: 220, limit: 200 },
        { label: "Others", spent: 210, limit: 200 },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "on track":
        return "bg-green-50 text-green-600 border border-green-400";
      case "over budget":
        return "bg-red-50 text-red-600 border border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E6EAF5] w-full">
      <FinanceSidebar />
      <HeaderFin />
      <div className="flex-1 flex flex-col mt-20 ml-65">
        

        {/* Header Title */}
        <div className="px-8 mt-6">
          <h1 className="bg-gradient-to-r from-primaryColor-10 to-accent-10 text-lg w-full font-semibold text-black px-5 py-3 rounded-xl shadow inline-block">
            Ongoing Missions
          </h1>
        </div>
        {/* <div className="px-8 mt-6">
          <h1 className="bg-gradient-to-r from-primaryColor-10 to-accent-10 text-lg w-full font-semibold text-black px-5 py-3 rounded-xl shadow inline-block">
            Ongoing Missions
          </h1>
        </div>

        Search + Filters
        <div className="px-8 mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-white rounded-xl border border-gray-200 px-4 py-2 w-full sm:w-96 shadow-sm">
            <FaSearch className="text-gray-400 mr-2 text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-sm text-gray-600 bg-transparent"
            />
          </div>

          <select className="bg-white border border-gray-200 shadow-sm rounded-xl px-3 py-2 text-sm text-gray-600">
            <option>All Status</option>
            <option>On Track</option>
            <option>Over Budget</option>
          </select>

          <select className="bg-white border border-gray-200 shadow-sm rounded-xl px-3 py-2 text-sm text-gray-600">
            <option>All Departments</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>IT</option>
          </select>
        </div> */}
<div className="px-8 mt-6 bg-white rounded-2xl p-3 lg:ml-8 mr-7 flex gap-5 justify-between items-center">
          <div className="flex items-center border border-gray-400 bg-blue-50 rounded-xl shadow px-3 w-full sm:w-96">
            <FaSearch className="text-gray-400 " />
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 outline-none text-sm text-gray-600"
            />
          </div>

         <div className="flex gap-5">
             <select className="bg-blue-50 border border-gray-400 shadow rounded-xl px-3 py-2 text-sm text-gray-600">
            <option>All Status</option>
            <option>Approved</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending Review</option>
          </select>

          <select className="bg-blue-50 border border-gray-400 shadow rounded-xl px-3 py-2 text-sm text-gray-600">
            <option>All Departments</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>IT</option>
          </select>
         </div>
        </div>
        {/* Missions Grid */}
        <div className="px-8 mt-8 grid sm:grid-cols-2 gap-6 pb-10">
          {missions.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow border border-gray-200 p-5 hover:shadow-md transition"
            >
              {/* Header: Avatar + Name + Status */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {m.name.split(" ")[0][0]}
                    {m.name.split(" ")[1][0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{m.name}</h3>
                    <p className="text-sm text-gray-500">{m.role}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                    m.status
                  )}`}
                >
                  {m.status}
                </span>
              </div>

              {/* Mission Info */}
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500 text-xs" />
                  <span>{m.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500 text-xs" />
                  <span>{m.startDate} - {m.endDate}</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Mission Progress</span>
                  <span>Day {m.progressDay} of {m.totalDays}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-blue-600 rounded-full"
                    style={{ width: `${(m.progressDay / m.totalDays) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-3 mb-1">
                  <span className="flex items-center gap-1">
                    <FaDollarSign className="text-gray-500 text-xs" />
                    Budget Utilization
                  </span>
                  <span>{m.budgetPercent}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-1.5 ${
                      m.budgetPercent > 100 ? "bg-red-500" : "bg-green-500"
                    } rounded-full`}
                    style={{ width: `${Math.min(m.budgetPercent, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                {m.expenses.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg py-2 ${
                      exp.spent > exp.limit ? "border-red-400" : "border-gray-300"
                    }`}
                  >
                    <p className="text-xs text-gray-500">{exp.label}</p>
                    <p
                      className={`text-sm font-medium ${
                        exp.spent > exp.limit ? "text-red-500" : "text-gray-800"
                      }`}
                    >
                      RF {exp.spent}k /{exp.limit}k
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center border-t pt-3">
                <p className="text-sm text-gray-500">
                  Total Spent: <span className="font-medium text-gray-800">{m.totalSpent}</span> /
                  {m.totalBudget}
                </p>
                <button className="text-sm font-medium text-blue-600 border border-blue-500 rounded-lg px-4 py-1 hover:bg-blue-50">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OngoingMissions;
