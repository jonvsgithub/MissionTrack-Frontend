import React, { useEffect, useState } from "react";

type Mission = {
  id: string;
  missionTitle: string;
  startDate: string;
  endDate: string;
};

const MissionProgress: React.FC<{ missions?: Mission[] }> = ({ missions = [] }) => {
  const [ongoingMissions, setOngoingMissions] = useState<Mission[]>([]);

  // ✅ Calculate percentage progress between start & end
  const calculateProgress = (startDate: string, endDate: string) => {
    const now = new Date().getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    return Math.round(((now - start) / (end - start)) * 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    // Check if using mock token to provide sample mission
    const token = localStorage.getItem("token");
    const isMockToken = token?.startsWith("mock-token");

    if (isMockToken && missions.length === 0) {
      // Provide a sample ongoing mission for testing
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 5); // Started 5 days ago
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 8); // Ends in 8 days

      const mockMission: Mission = {
        id: "mock-1",
        missionTitle: "M.E.M- Rubavu",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      setOngoingMissions([mockMission]);
      return;
    }

    const now = new Date().getTime();
    const filtered = missions.filter((m) => {
      const start = new Date(m.startDate).getTime();
      const end = new Date(m.endDate).getTime();
      return now >= start && now <= end; // ✅ Ongoing missions only
    });
    setOngoingMissions(filtered);
  }, [missions]);

  return (
    <div className="rounded-xl bg-white shadow-sm p-5 w-[280px]">
      <h3 className="font-semibold text-gray-800 mb-4">Mission Progress</h3>

      {ongoingMissions.length === 0 ? (
        <p className="text-gray-500 text-sm">No ongoing missions</p>
      ) : (
        <div className="space-y-4">
          {ongoingMissions.slice(0, 1).map((mission) => {
            const percent = calculateProgress(mission.startDate, mission.endDate);
            return (
              <div key={mission.id} className="space-y-3">
                {/* Progress percentage */}
                <div className="text-center">
                  <span className="text-3xl font-bold text-orange-500">{percent}%</span>
                </div>

                {/* Progress bar */}
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Date range */}
                <div className="text-center text-xs text-gray-600">
                  {formatDate(mission.startDate)}-{formatDate(mission.endDate)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MissionProgress;
