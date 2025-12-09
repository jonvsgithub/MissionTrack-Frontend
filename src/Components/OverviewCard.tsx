import type { LucideIcon } from "lucide-react";
import React from "react";


interface OverviewCardProps {
  title: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, color, icon: Icon }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 flex flex-col justify-between min-h-[120px]">
      {/* Header with title and icon */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>

      {/* Value */}
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
    </div>
  );
};

export default OverviewCard;

