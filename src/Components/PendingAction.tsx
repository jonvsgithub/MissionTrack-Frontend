import React from "react";

// ✅ Define props for the reusable PriorityBadge component
interface PriorityBadgeProps {
  priority: "High" | "Medium" | "Low";
}

// Reusable component for the priority badges
const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getColorClasses = (priority: PriorityBadgeProps["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className={`px-3 py-1 inline-block rounded-full font-medium text-xs ${getColorClasses(
        priority
      )}`}
    >
      {priority}
    </div>
  );
};

// ✅ Define type for each pending action
interface PendingAction {
  company: string;
  action: string;
  priority: "High" | "Medium" | "Low";
}

const PendingActions: React.FC = () => {
  const pendingActions: PendingAction[] = [
    {
      company: "TechStart Inc.",
      action: "Approval Required",
      priority: "High",
    },
    {
      company: "Digital Solutions.",
      action: "Resubmission Review",
      priority: "High",
    },
    {
      company: "TechStart Inc.",
      action: "TechStart Inc.",
      priority: "Low",
    },
    {
      company: "TechStart Inc.",
      action: "Payment Overdue",
      priority: "Medium",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Pending Actions
      </h2>
      <div className="flex flex-col space-y-2 mb-4">
        {pendingActions.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div>
              <div className="font-semibold text-gray-800">{item.company}</div>
              <div className="text-sm text-gray-500">{item.action}</div>
            </div>
            <PriorityBadge priority={item.priority} />
          </div>
        ))}
      </div>
      <button className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
        View More Pending
      </button>
    </div>
  );
};

export default PendingActions;
