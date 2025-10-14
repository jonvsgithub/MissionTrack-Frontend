import React, { useState } from "react";
import HeaderFin from "./HeaderFin";
import FinanceSidebar from "./FinanceSidebar";
import { FaSearch } from "react-icons/fa";

const FundingAssignment: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  const missions = [
    {
      title: "Mission Title",
      employee: "Sarah Johnson",
      location: "Rusizi",
      duration: "12-12-2025 - 20-12-2025",
      status: "Pending Review",
    },
    {
      title: "Mission Title",
      employee: "Sarah Johnson",
      location: "Rusizi",
      duration: "12-12-2025 - 20-12-2025",
      status: "Funds Rejected",
    },
    {
      title: "Mission Title",
      employee: "Sarah Johnson",
      location: "Rusizi",
      duration: "12-12-2025 - 20-12-2025",
      status: "Pending Review",
    },
    {
      title: "Mission Title",
      employee: "Sarah Johnson",
      location: "Rusizi",
      duration: "12-12-2025 - 20-12-2025",
      status: "Funded",
    },
    {
      title: "Mission Title",
      employee: "Sarah Johnson",
      location: "Rusizi",
      duration: "12-12-2025 - 20-12-2025",
      status: "Drafted",
    },
    {
      title: "Mission Title",
      employee: "Sarah Johnson",
      location: "Rusizi",
      duration: "12-12-2025 - 20-12-2025",
      status: "Funds Rejected",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending review":
        return "bg-orange-50 text-orange-500 border border-orange-300";
      case "funded":
        return "bg-green-50 text-green-600 border border-green-300";
      case "funds rejected":
        return "bg-red-50 text-red-500 border border-red-300";
      case "drafted":
        return "bg-blue-50 text-blue-600 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredMissions =
    activeTab === "All"
      ? missions
      : missions.filter((m) => m.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="flex min-h-screen bg-[#E6EAF5] w-full">
      <FinanceSidebar />
      <HeaderFin />
      <div className="flex-1 flex flex-col mt-20 ml-65">
        

        {/* Title */}
        <div className="px-8 mt-6">
          <h1 className="bg-gradient-to-r from-primaryColor-10 to-accent-10 text-lg w-full font-semibold text-black px-5 py-3 rounded-xl shadow inline-block">
            Funding Assignment
          </h1>
        </div>

        {/* Search */}
        <div className="px-8 mt-6 flex flex-wrap items-center gap-4 bg-white p-3 rounded-xl mr-8 ml-8">
          <div className="flex items-center  bg-blue-50 rounded-xl shadow px-3  sm:w-96">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 outline-none text-sm text-gray-600"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white mt-4 mr-8 ml-8 gap-1 rounded-xl">
            <div className="px-8 mt-5 flex flex-wrap gap-20">
          {[
            { name: "All", count: 9 },
            { name: "Pending Review", count: 2 },
            { name: "Funded", count: 3 },
            { name: "Funds Rejected", count: 1 },
            { name: "Drafted", count: 2 },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={` py-2 rounded-xl font-medium text-sm  ${
                activeTab === tab.name
                  ? "bg-blue-600 w-30 text-white"
                  : " text-gray-600"
              }`}
            >
              {tab.name}({tab.count})
            </button>
          ))}
        </div>
        </div>

        {/* Missions List */}
        <div className="px-8 mt-6 space-y-3 pb-8">
          {filteredMissions.map((m, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white shadow-sm rounded-xl border border-gray-100 px-5 py-3 hover:shadow-md transition"
            >
              <div>
                <div className="font-medium text-gray-800">{m.title}</div>
                <div className="text-sm text-gray-500">
                  {m.employee} - {m.location}
                </div>
                <div className="text-xs text-gray-400">{m.duration}</div>
              </div>
              <div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                    m.status
                  )}`}
                >
                  {m.status}
                </span>
              </div>
            </div>
          ))}

          {filteredMissions.length === 0 && (
            <div className="text-center text-gray-400 py-6">
              No missions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundingAssignment;
