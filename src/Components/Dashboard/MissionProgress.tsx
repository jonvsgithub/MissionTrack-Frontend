import React, { useEffect, useState } from "react";
import { useTheme } from "../../hook/useTheme";

type Mission = {
  id: string;
  missionTitle: string;
  startDate: string;
  endDate: string;
};

const MissionProgress: React.FC<{ missions?: Mission[] }> = ({ missions = [] }) => {
  const { theme } = useTheme();
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

  useEffect(() => {
    const now = new Date().getTime();
    const filtered = missions.filter((m) => {
      const start = new Date(m.startDate).getTime();
      const end = new Date(m.endDate).getTime();
      return now >= start && now <= end; // ✅ Ongoing missions only
    });
    setOngoingMissions(filtered);
  }, [missions]);

  return (
    <div
      className={`rounded-xl bg-white shadow-sm p-5 ${
        theme === "light" ? "bg-[#E6EAF5] text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h3 className="font-bold text-gray-800 mb-4">Mission Progress</h3>

      {ongoingMissions.length === 0 ? (
        <p className="text-gray-500">No ongoing missions</p>
      ) : (
        <div className="space-y-4">
          {ongoingMissions.map((mission) => {
            const percent = calculateProgress(mission.startDate, mission.endDate);
            return (
              <div key={mission.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{mission.missionTitle}</span>
                  <span className="text-red-500 text-lg">{percent}%</span>
                </div>
                {/* Progress bar */}
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      percent === 100
                        ? "bg-green-600"
                        : percent > 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
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
