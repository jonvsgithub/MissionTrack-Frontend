import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchEmployeeMissions } from "../../redux/EmployeeRedux/EmpMissions";

type MissionStatus = "completed" | "approved" | "pending" | "rejected" | "financial_approved" | "manager_approved";

type Mission = {
  id: string;
  missionTitle: string;
  missionDescription: string;
  startDate: string;
  endDate: string;
  status: MissionStatus;
};

type FilterType = "all" | "approved" | "rejected" | "completed" | "pending";

const MissionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const dispatch = useDispatch<AppDispatch>();
  const { missions, loading, error } = useSelector(
    (state: RootState) =>
      state.EmployeeMissions as {
        missions: any[] | { missions: any[] };
        loading: boolean;
        error: string | null;
      }
  );

  useEffect(() => {
    dispatch(fetchEmployeeMissions());
  }, [dispatch]);

  // Normalize missions array
  const missionArray: Mission[] = Array.isArray(missions)
    ? missions
    : missions?.missions || [];

  // Get status icon
  const getStatusIcon = (status: MissionStatus) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus.includes("approved") || normalizedStatus === "completed") {
      return <FaCheck className="text-green-500" size={20} />;
    }
    if (normalizedStatus === "pending") {
      return <MdOutlinePendingActions className="text-orange-500" size={20} />;
    }
    if (normalizedStatus === "rejected") {
      return <RiFileCloseLine className="text-red-500" size={20} />;
    }
    return <BsFileEarmarkText className="text-blue-500" size={20} />;
  };

  // Get status text
  const getStatusText = (status: MissionStatus) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "financial_approved" || normalizedStatus === "manager_approved") {
      return "Approved";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Filter missions based on active filter
  const getFilteredMissions = () => {
    let filtered = missionArray;

    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((mission) => {
        const normalizedStatus = mission.status.toLowerCase();

        if (activeFilter === "approved") {
          return normalizedStatus.includes("approved");
        }
        if (activeFilter === "completed") {
          return normalizedStatus === "completed";
        }
        return normalizedStatus === activeFilter;
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((mission) =>
        mission.missionTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredMissions = getFilteredMissions();

  // Filter button component
  const FilterButton: React.FC<{
    label: string;
    filter: FilterType;
    active: boolean;
    onClick: () => void;
  }> = ({ label, filter, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${active
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg shadow-sm mb-6">
          <h1 className="font-bold text-2xl text-center text-gray-800">
            All missions
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-full">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            <FilterButton
              label="All"
              filter="all"
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            <FilterButton
              label="Approved"
              filter="approved"
              active={activeFilter === "approved"}
              onClick={() => setActiveFilter("approved")}
            />
            <FilterButton
              label="Rejected"
              filter="rejected"
              active={activeFilter === "rejected"}
              onClick={() => setActiveFilter("rejected")}
            />
            <FilterButton
              label="Completed"
              filter="completed"
              active={activeFilter === "completed"}
              onClick={() => setActiveFilter("completed")}
            />
            <FilterButton
              label="Pending"
              filter="pending"
              active={activeFilter === "pending"}
              onClick={() => setActiveFilter("pending")}
            />
          </div>
        </div>

        {/* Mission Cards */}
        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600">Loading missions...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && filteredMissions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No missions found.</p>
            </div>
          )}

          {!loading &&
            !error &&
            filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className="bg-white rounded-lg shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(mission.status)}
                </div>

                {/* Mission Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {mission.missionTitle}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {mission.missionDescription || "No description provided"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {mission.status === "completed"
                      ? `Completed ${new Date(mission.endDate).toLocaleDateString()} ago`
                      : mission.status.toLowerCase().includes("approved")
                        ? `Approved ${Math.floor(
                          (new Date().getTime() - new Date(mission.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                        )} days ago`
                        : `Pending since ${Math.floor(
                          (new Date().getTime() - new Date(mission.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                        )} days ago`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MissionList;
