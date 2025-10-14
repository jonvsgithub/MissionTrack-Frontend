import React from "react";
import HeaderFin from "./HeaderFin";
import FinanceSidebar from "./FinanceSidebar";
import { FaSearch } from "react-icons/fa";

const ApprovedMission: React.FC = () => {
  const missions = [
    {
      employee: "John Smith",
      position: "Sales Manager",
      purpose: "Client Technical Review",
      location: "Huye, Tumba",
      status: "Approved",
      duration: "24-12-2025 - 31-12-2025",
      budget: "1.2 M",
    },
    {
      employee: "John Smith",
      position: "Sales Manager",
      purpose: "Client Technical Review",
      location: "Huye, Tumba",
      status: "In Progress",
      duration: "24-12-2025 - 31-12-2025",
      budget: "1.2 M",
    },
    {
      employee: "John Smith",
      position: "Sales Manager",
      purpose: "Client Technical Review",
      location: "Huye, Tumba",
      status: "Completed",
      duration: "24-12-2025 - 31-12-2025",
      budget: "1.2 M",
    },
    {
      employee: "John Smith",
      position: "Sales Manager",
      purpose: "Client Technical Review",
      location: "Huye, Tumba",
      status: "Pending Review",
      duration: "24-12-2025 - 31-12-2025",
      budget: "1.2 M",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-blue-100 text-blue-600";
      case "in progress":
        return "bg-yellow-100 text-yellow-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "pending review":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E6EAF5] w-full">
      <FinanceSidebar />
      <div className="flex-1 flex flex-col mt-20 ml-65">
        <HeaderFin />

        {/* Page Header */}
        <div className="px-8 mt-6">
          <h1 className="bg-gradient-to-r w-full from-primaryColor-10 to-accent-10 text-lg font-semibold text-black px-5 py-3 rounded-xl shadow inline-block">
            Approved Missions
          </h1>
        </div>

        {/* Search + Filters */}
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

        {/* Missions Table */}
        <div className="bg-white shadow-md rounded-xl mx-8 mt-6 p-4">
          <h2 className="text-gray-800 font-semibold mb-4">Missions</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Mission Purpose</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((m, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium text-sm text-gray-800">{m.employee}</span>
                        <div className="text-xs text-gray-400">Sales</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{m.position}</td>
                    <td className="py-3 px-4">{m.purpose}</td>
                    <td className="py-3 px-4">{m.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          m.status
                        )}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{m.duration}</td>
                    <td className="py-3 px-4">{m.budget}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-gray-500 hover:text-gray-700">
                        &#x22EE;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {missions.length === 0 && (
              <div className="text-center text-gray-400 py-6">
                No missions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedMission;
