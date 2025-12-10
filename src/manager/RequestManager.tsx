import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { PiBagSimple } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import MissionDetailsModal, { DetailsMission } from "./MissionDetailsModal";

// --------------------
// Types
// --------------------
type MissionStatus = "pending" | "approved" | "rejected";

interface Mission {
  id: string;
  name: string;
  role: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: MissionStatus;
  initials: string;
  description?: string;
  documents?: string[];
}

// --------------------
// Reusable Card
// --------------------
interface MissionCardProps {
  mission: Mission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDetails: (id: string) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onApprove,
  onReject,
  onDetails,
}) => {
  const {
    id,
    initials,
    name,
    role,
    title,
    location,
    startDate,
    endDate,
    status,
  } = mission;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-full border border-gray-100">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>

        {/* Status Badge */}
        {status === "pending" && (
          <span className="px-4 py-1 rounded-md text-xs font-medium text-orange-500 border border-orange-300 bg-orange-50">
            Pending
          </span>
        )}
        {status === "approved" && (
          <span className="px-4 py-1 rounded-md text-xs font-medium text-white bg-green-700">
            Approved
          </span>
        )}
        {status === "rejected" && (
          <span className="px-4 py-1 rounded-md text-xs font-medium text-red-500 border border-red-200 bg-red-50">
            Rejected
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="space-y-3 mb-8 flex-1">
        <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
          <PiBagSimple size={20} className="text-gray-500" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
          <IoLocationOutline size={20} className="text-gray-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
          <BsCalendar2Event size={18} className="text-gray-500" />
          <span>
            {startDate} - {endDate}
          </span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => onDetails(id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-400 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MdOutlineRemoveRedEye size={18} />
          Details
        </button>

        {status === "pending" && (
          <>
            <button
              onClick={() => onApprove(id)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 rounded-md text-sm font-semibold text-white hover:bg-green-700 transition-colors"
            >
              <FaCheck size={16} />
              Approve
            </button>
            <button
              onClick={() => onReject(id)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 bg-red-50 rounded-md text-sm font-semibold text-red-500 hover:bg-red-100 transition-colors"
            >
              <RxCross2 size={16} />
              Rejected
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// --------------------
// Main Page
// --------------------
const RequestManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");

  // Modal State
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const token = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")!).token
          : "";

        const res = await axios.get(
          "https://missiontrack-backend.onrender.com/api/reports/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Map API data
        const data = res.data.data.map((m: any) => ({
          id: m.id,
          name: m.name || "Unknown",
          role: m.role || "Employee",
          title: m.title || "Untitled Mission",
          location: m.location || "Unknown",
          startDate: m.startDate ? m.startDate.split("T")[0] : "",
          endDate: m.endDate ? m.endDate.split("T")[0] : "",
          status: m.status || "pending",
          initials: m.name ? m.name.charAt(0).toUpperCase() : "U",
          // Mocking description/docs if missing, or use actual API field if available
          description: m.description || "Visit key clients to discuss new project opportunities and strengthen business relationships. Will meet with 5 Major clients over 4 days",
          documents: m.documents || ["Flight ticket.pdf", "Clients meetings schedules.xls"],
        }));
        setMissions(data);
      } catch (err) {
        console.error("Error fetching missions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Filter Logic
  const filteredByTab = missions.filter((m) => {
    if (activeTab === "All") return true;
    return m.status.toLowerCase() === activeTab.toLowerCase();
  });

  const finalFiltered = filteredByTab.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Counts
  const getCount = (status: string) => {
    if (status === "All") return missions.length;
    return missions.filter((m) => m.status.toLowerCase() === status.toLowerCase()).length;
  };

  const tabs = ["All", "Pending", "Approved", "Rejected"];

  // Handlers
  const handleDetailsClick = (id: string) => {
    const mission = missions.find((m) => m.id === id);
    if (mission) setSelectedMission(mission);
  };

  const handleApprove = (id: string, feedback?: string) => {
    console.log("Approved", id, "Feedback:", feedback);
    // Add API call here
    // Optimistic Update
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: "approved" } : m));
    setSelectedMission(null);
  };

  const handleReject = (id: string, feedback?: string) => {
    console.log("Rejected", id, "Feedback:", feedback);
    // Add API call here
    // Optimistic Update
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: "rejected" } : m));
    setSelectedMission(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E6EAF5] overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-300 to-teal-200 rounded-lg p-4 mb-8 shadow-sm">
          <h1 className="font-bold text-xl text-gray-800">Mission Requests</h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-6 flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="Search"
            />
          </div>
          <div className="w-40">
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Filter</option>
              <option>Date</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-1 flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 text-sm font-semibold rounded-md transition-all ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
                }`}
            >
              {tab} ({getCount(tab)})
            </button>
          ))}
        </div>

        {/* Mission Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalFiltered.length > 0 ? (
              finalFiltered.map((m) => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  onApprove={(id) => handleApprove(id)} // Pass through handler
                  onReject={(id) => handleReject(id)}
                  onDetails={(id) => handleDetailsClick(id)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                No requests found in this category.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedMission && (
        <MissionDetailsModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default RequestManager;
