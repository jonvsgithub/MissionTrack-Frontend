// pages/AllMission.tsx
import React, { useEffect, useState } from "react";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "../manager/ManagerSideBar";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import MissionTable from "../manager/ManagerTable";

const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AllMission: React.FC = () => {
  const [missions, setMissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);

  // Fetch missions from backend
  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://missiontrack-backend.onrender.com/api/missions/manager",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMissions(res.data.data);
    } catch (err) {
      console.error("Error fetching missions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const statusOptions = [
    "All Status",
    "pending",
    "manager_approved",
    "inProgress",
    "rejected",
  ];

  // ✅ Filter missions based on search + status
  const filteredMissions = missions.filter((m) => {
    const missionName = (m.missionTitle || "").toLowerCase();
    const managerName = (m.fullName || "").toLowerCase();
    const jobPosition = (m.jobPosition || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      missionName.includes(query) ||
      managerName.includes(query) ||
      jobPosition.includes(query);

    const matchesStatus =
      statusFilter === "All Status" ||
      (m.status || "").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Map filtered missions for table
  const tableData = filteredMissions.map((m) => ({
    id: m.id,
    missionName: m.missionTitle,
    email: m.email || "N/A",
    status: m.status,
    plan: m.jobPosition || "N/A",
    manager: m.fullName || "N/A",
    payment: m.paymentStatus || "N/A",
    lastActivity: new Date(m.updatedAt).toLocaleDateString(),
    // 🔹 Extra fields for manager to review
    description: m.description || "No description provided",
    startDate: m.startDate ? new Date(m.startDate).toLocaleDateString() : "N/A",
    endDate: m.endDate ? new Date(m.endDate).toLocaleDateString() : "N/A",
  }));

  return (
    <>
     

        <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
          {/* Add Mission Button */}
          <button className="bg-primaryColor-700 w-60 mb-5 text-lg text-center rounded-2xl text-white">
            <div className="flex items-center justify-center">
              <span className="text-4xl mr-2">+</span>
              <span>Add Mission</span>
            </div>
          </button>

          <div className="w-[900px] bg-white rounded-2xl overflow-x-auto">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center p-4">
              {/* Search Input */}
              <div className="flex-1 w-full sm:w-auto flex gap-2 items-center bg-white rounded-xl border border-gray-300 shadow-sm py-1 mb-2 sm:mb-0 px-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Search by title, manager, or job position"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white cursor-pointer text-gray-700"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Missions Table */}
            {loading ? (
              <p className="text-gray-500 p-4">Loading missions...</p>
            ) : (
              <MissionTable data={tableData} />
            )}
          </div>
        </main>
      
    </>
  );
};

export default AllMission;
