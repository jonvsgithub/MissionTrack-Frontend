import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsCalendar2Event } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface Report {
  id: string;
  title: string;
  manager: string;
  dateRange: string;
  budgetUsed: number;
  totalBudget: number;
  status: string;
}

const ReportManager: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")!).token
          : "";

        const response = await axios.get(
          "https://missiontrack-backend.onrender.com/api/reports/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.data.success) {
          // Normalize status case for badges
          const data = (response.data.data || []).map((r: any) => ({
            ...r,
            status: r.status === "completed" ? "Completed" : "Ongoing" // Normalize or map status
          }));
          setReports(data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Format currency helpers
  const formatK = (num: number) => `${Math.round(num / 1000)}k`;
  const formatCurrency = (num: number) => `$${num.toLocaleString()}`;

  // Derived stats
  const totalMissions = reports.length;
  const activeMissions = reports.filter(r => r.status !== "Completed").length;

  const totalBudget = reports.reduce((acc, r) => acc + r.totalBudget, 0);
  const spentBudget = reports.reduce((acc, r) => acc + r.budgetUsed, 0);

  const completedCount = reports.filter(r => r.status === "Completed").length;
  const avgCompletion = totalMissions > 0 ? Math.round((completedCount / totalMissions) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E6EAF5] pr-5">
      <div className="py-2 mt-5 bg-gradient-to-r from-blue-300 to-teal-200 rounded-md shadow-sm">
        <h1 className="font-bold text-xl text-gray-800 ml-4">Mission reports</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Total Missions */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-700 font-medium text-lg">Total missions</span>
            <span className="text-gray-500 font-medium">Active</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-3xl font-bold text-gray-900">{totalMissions}</span>
            <span className="text-3xl font-bold text-orange-400">{activeMissions}</span>
          </div>
        </div>

        {/* Total Budget */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-700 font-medium text-lg">Total budget</span>
            <span className="text-gray-500 font-medium">Spent</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(totalBudget)}</span>
            <span className="text-3xl font-bold text-green-500">{formatCurrency(spentBudget)}</span>
          </div>
        </div>

        {/* Avg Completion */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-700 font-medium text-lg">Av.g completion</span>
            <span className="text-gray-500 font-medium">Completed</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-3xl font-bold text-gray-900">{avgCompletion}%</span>
            <span className="text-3xl font-bold text-blue-600">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex justify-center py-20 text-gray-500">No reports found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {reports.map((report) => {
            const progress = Math.min((report.budgetUsed / report.totalBudget) * 100, 100);
            const isCompleted = report.status === "Completed";

            return (
              <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base font-bold text-gray-900 leading-tight max-w-[70%]">
                    {report.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isCompleted ? "bg-[#107C41] text-white" : "bg-orange-400 text-white"
                      }`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FiUser size={16} />
                    <span>{report.manager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <BsCalendar2Event size={16} />
                    <span>{report.dateRange}</span>
                  </div>
                </div>

                {/* Budget Bar */}
                <div className="mt-auto">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <span className="text-gray-600 font-semibold">$</span> Budget Used
                    </span>
                    <span className="text-gray-500 text-xs font-medium">
                      {formatK(report.budgetUsed)} Rwf/{formatK(report.totalBudget)} Rwf
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isCompleted ? 'bg-[#107C41]' : 'bg-blue-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className="mt-6 w-full bg-[#1C58D2] hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <MdOutlineRemoveRedEye size={18} />
                  View Report
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportManager;
