import React, { useEffect, useState } from "react";

type Mission = {
  id: string;
  missionTitle: string;
  location?: string;
  status: "pending" | "in-progress" | "completed" | "rejected" | "approved" | "manager_approved";
};

const OngoingMissions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const isMockToken = token?.startsWith("mock-token");

        if (isMockToken) {
          // Use mock data for testing
          const mockMissions: Mission[] = [
            {
              id: "1",
              missionTitle: "M.E.M- Rubavu",
              location: "Rubavu District",
              status: "approved"
            },
          ];
          setMissions(mockMissions);
          setLoading(false);
          return;
        }

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
          // ✅ Only approved/ongoing missions
          const ongoing = data.data.filter(
            (m: Mission) => m.status === "approved" || m.status === "manager_approved" || m.status === "in-progress"
          );
          setMissions(ongoing);
        } else {
          setMissions([]);
        }
      } catch (err) {
        console.error("Error fetching ongoing missions:", err);
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div className="rounded-xl shadow-sm p-5 bg-white w-[280px]">
      <h3 className="font-semibold text-gray-800 mb-4">Ongoing</h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : missions.length === 0 ? (
        <p className="text-gray-500 text-sm">No ongoing missions</p>
      ) : (
        <div className="space-y-3">
          {missions.slice(0, 1).map((mission) => (
            <div
              key={mission.id}
              className="space-y-2"
            >
              {/* Mission Title */}
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{mission.missionTitle}</p>
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Location */}
              <p className="text-sm text-gray-600">{mission.location || "Location not specified"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingMissions;
