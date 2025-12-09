import React from "react";
import { FiFilePlus, FiCalendar, FiBarChart2 } from "react-icons/fi";

// Example quick links
const links = [
  {
    label: "Create a new request",
    icon: <FiFilePlus />,
    color: "text-blue-600",
    background: "bg-blue-100",
  },
  {
    label: "View Calendar",
    icon: <FiCalendar />,
    color: "text-red-600",
    background: "bg-red-100",
  },
  {
    label: "View Reports",
    icon: <FiBarChart2 />,
    color: "text-green-600",
    background: "bg-green-100",
  },
];

const QuickLinks: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>

      <div className="space-y-3">
        {links.map((link, index) => (
          <button
            key={index}
            className="flex items-center gap-3 w-full rounded-lg px-4 py-3 bg-gray-50 transition"
          >
            {/* Icon box */}
            <div className={`w-8 h-8 rounded-md grid place-items-center ${link.background}`}>
              <span className={`text-lg ${link.color}`}>{link.icon}</span>
            </div>

            {/* Link text */}
            <span className="text-gray-700 font-medium">{link.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
