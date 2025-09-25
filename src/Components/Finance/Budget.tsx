import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  secondaryText: string;
  valueColor: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

// Reusable card component
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  secondaryText,
  valueColor,
  icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="w-[180px] p-3 gap-2 bg-white rounded-xl shadow-md flex flex-col ">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium leading-tight">{title}</p>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
        <p className="text-sm text-gray-500">{secondaryText}</p>
      </div>
    </div>
  );
};

// Main dashboard component
const Budget: React.FC = () => {
  // SVG icons
  const dollarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2c.473 0 .917-.083 1.31-.24M12 8V5m0 3a5 5 0 00-5 5c0 2.49 2.556 4 5 4s5-1.51 5-4a5 5 0 00-5-5zM12 18v3" />
    </svg>
  );

  const upArrowIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L11 2m7 17v2m0 0h2m0 0h-2v-2m0 2l-7-7m7 7l-7-7" />
    </svg>
  );

  const downArrowIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17h10M11 17v-8M11 17l-10-10m10 10l-10-10" />
    </svg>
  );

  const missionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 12h.01" />
    </svg>
  );

  const clockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // Card data
  const cards: DashboardCardProps[] = [
    {
      title: "Total Budget Allocated",
      value: "Rf 26 M",
      secondaryText: "For Current fiscal year",
      valueColor: "text-blue-600",
      icon: dollarIcon,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Spent",
      value: "15.6 M",
      secondaryText: "60% Of total allocated Budget",
      valueColor: "text-red-600",
      icon: upArrowIcon,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Remaining Balance",
      value: "11 M",
      secondaryText: "+9% from last month",
      valueColor: "text-yellow-600",
      icon: downArrowIcon,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Missions",
      value: "300",
      secondaryText: "12% This month",
      valueColor: "text-green-600",
      icon: missionIcon,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Ongoing Missions",
      value: "12",
      secondaryText: "5 Ending This week",
      valueColor: "text-yellow-600",
      icon: clockIcon,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="flex bg-accent-10  flex-row gap-4 p-4 overflow-x-auto">
      {cards.map((card, index) => ( 
        <DashboardCard key={index} {...card} />
      ))}
    </div>
  );
};

export default Budget;
