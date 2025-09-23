import React from "react";

// ✅ Define prop types for StatusBadge
interface StatusBadgeProps {
  status: "Critical" | "Warning" | "On Track" | string;
}

// Reusable component for the status badges
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getColorClasses = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-600";
      case "Warning":
        return "bg-yellow-100 text-yellow-600";
      case "On Track":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className={`px-3 py-1 inline-block rounded-full font-medium text-xs ${getColorClasses(
        status
      )}`}
    >
      {status}
    </div>
  );
};

// ✅ Define type for each budget alert
interface BudgetAlert {
  name: string;
  utilization: string;
  status: "Critical" | "Warning" | "On Track" | string;
}

// The main component containing the list of budget alerts
const BudgetAlerts: React.FC = () => {
  const budgetAlerts: BudgetAlert[] = [
    {
      name: "Umurava Forum",
      utilization: "95% Budget utilized",
      status: "Critical",
    },
    {
      name: "M.E.M",
      utilization: "46% Budget utilized",
      status: "On Track",
    },
    {
      name: "Mission title",
      utilization: "70% Budget utilized",
      status: "Warning",
    },
    {
      name: "Digital Solutions Mission",
      utilization: "89% Budget utilized",
      status: "Critical",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Budget Alerts
      </h2>
      <div className="flex flex-col space-y-2">
        {budgetAlerts.map((alert, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div>
              <div className="font-semibold text-gray-800">{alert.name}</div>
              <div className="text-sm text-gray-500">{alert.utilization}</div>
            </div>
            <StatusBadge status={alert.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetAlerts;
