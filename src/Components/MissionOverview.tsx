import React, { useEffect, useState } from "react";
import { ClipboardList, CheckCircle, Clock, XCircle } from "lucide-react";
import OverviewCard from "./OverviewCard";

type Mission = {
  id: string;
  missionTitle: string;
  status: "approved" | "pending" | "rejected" | "manager_approved";
};

const MissionOverview: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const token = localStorage.getItem("token");

        // Check if using mock token
        const isMockToken = token?.startsWith("mock-token");

        if (isMockToken) {
          // Use mock data for testing
          const mockMissions: Mission[] = [
            { id: "1", missionTitle: "TechCorp Meeting", status: "pending" },
            { id: "2", missionTitle: "Client Visit - Kigali", status: "approved" },
            { id: "3", missionTitle: "Training Session", status: "approved" },
            { id: "4", missionTitle: "Site Inspection", status: "pending" },
            { id: "5", missionTitle: "Budget Review", status: "manager_approved" },
          ];
          setMissions(mockMissions);
          setLoading(false);
          return;
        }

        // Real API call
        const res = await fetch(
          "https://missiontrack-backend.onrender.com/api/missions/employee",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setMissions(data.data);
        } else {
          // If API fails, use empty array
          setMissions([]);
        }
      } catch (error) {
        console.error("Error fetching missions:", error);
        // On error, use empty array instead of staying in loading state
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // ✅ Approved statuses can be multiple now
  const approvedStatuses = ["approved", "manager_approved"];

  const allMissions = missions.length;
  const completed = missions.filter((m) => approvedStatuses.includes(m.status)).length;
  const pending = missions.filter((m) => m.status === "pending").length;
  const rejected = missions.filter((m) => m.status === "rejected").length;

  const stats = [
    {
      title: "Upcoming Missions",
      value: allMissions,
      color: "text-blue-600",
      icon: ClipboardList,
    },
    {
      title: "Approved Requests",
      value: completed,
      color: "text-green-600",
      icon: CheckCircle,
    },
    {
      title: "Completed Missions",
      value: completed,
      color: "text-blue-600",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: pending,
      color: "text-orange-600",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        <p className="col-span-4 text-center text-gray-500">Loading...</p>
      ) : (
        stats.map((stat, index) => (
          <OverviewCard
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
          />
        ))
      )}
    </div>
  );
};

export default MissionOverview;
