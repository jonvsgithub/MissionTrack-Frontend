import React from "react";
import { FaBuilding } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCreditCard, FaXmark } from "react-icons/fa6"
// ✅ Define props for the reusable card
interface DashboardCardProps {
  title: string;
  value: string | number;
  change: string;
  valueColor: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}
interface AdminStatsProps {
  totalCompanies: number;
  activeCompanies: number;
  underReview: number;
  upcomingPayments: number;
  blockedCompanies: number;
   rejectedCompanies: number;
}
// ✅ Reusable card component
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  valueColor,
  icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="flex-1 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-small line-clamp-2">{title}</p>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <div className={`${iconColor}`} aria-hidden="true">
            {icon}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <h3
          className={`text-2xl font-bold ${valueColor}`}
          aria-label={title}
        >
          {value}
        </h3>
        <p className="text-sm text-gray-500">{change}</p>
      </div>
    </div>
  );
};

// ✅ Main dashboard component
const TopCard: React.FC <AdminStatsProps>= ({
  totalCompanies,
  activeCompanies,
  underReview,
  upcomingPayments,
  blockedCompanies,
  rejectedCompanies,
}) => {
  // Inline SVG icons
  const documentIcon = <FaBuilding />

  const clockIcon = <FaRegClock />

  const crossIcon =<FaXmark />

  const calendarIcon = <FaCreditCard/>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      <DashboardCard
        title="Total Registered Companies"
        value={totalCompanies}
        change="+12% from last month"
        valueColor="text-blue-600"
        icon={documentIcon}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <DashboardCard
        title="Active Companies"
        value={activeCompanies}
        change="+11% from last month"
        valueColor="text-green-600"
        icon={documentIcon}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <DashboardCard
        title="Companies Under Review"
        value={underReview}
        change="+10% from last month"
        valueColor="text-orange-600"
        icon={clockIcon}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-600"
      />
      <DashboardCard
        title="Rejected Companies "
        value={rejectedCompanies}
        change="+12% from last month"
        valueColor="text-red-600"
        icon={crossIcon}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />
      <DashboardCard
        title="Unpaid Subscription and Blocked"
        value={blockedCompanies}
        change="+5% from last month"
        valueColor="text-red-600"
        icon={calendarIcon}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />
       <DashboardCard
        title="Upcoming Payments"
        value={upcomingPayments}
        change="+8% from last month"
        valueColor="text-green-600"
        icon={calendarIcon}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
    </div>
  );
};

export default TopCard;
