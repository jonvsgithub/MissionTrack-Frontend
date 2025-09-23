import React from "react";

// ✅ Define props for each activity item
interface ActivityItemProps {
  event: string;
  companyName: string;
  time: string;
}

// A reusable component for each recent activity item
const ActivityItem: React.FC<ActivityItemProps> = ({ event, companyName, time }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="text-sm text-gray-700">
        <span className="font-medium">{event}:</span>{" "}
        <span className="font-semibold text-gray-800">{companyName}</span>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
};

// ✅ Define type for each activity record
interface Activity {
  event: string;
  companyName: string;
  time: string;
}

// The main component containing the list of recent activities
const RecentActivity: React.FC = () => {
  const activityData: Activity[] = [
    {
      event: "New Company Registration",
      companyName: "DataFlow Inc.",
      time: "20 min ago",
    },
    {
      event: "Payment Received",
      companyName: "TechStart Inc.",
      time: "20 min ago",
    },
    {
      event: "Trial Ended",
      companyName: "Digital Solutions",
      time: "20 min ago",
    },
    {
      event: "Subscription Renewed",
      companyName: "Company Name",
      time: "20 min ago",
    },
    {
      event: "TechStart Inc.", // ✅ This looks more like a companyName than an event
      companyName: "",
      time: "20 min ago",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <div className="flex flex-col space-y-2 mb-4">
        {activityData.map((item, index) => (
          <div key={index}>
            <ActivityItem
              event={item.event}
              companyName={item.companyName}
              time={item.time}
            />
          </div>
        ))}
      </div>
      <button className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
        View Activity Log
      </button>
    </div>
  );
};

export default RecentActivity;
