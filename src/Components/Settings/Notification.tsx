import React, { useState } from "react";

interface NotificationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between py-4 px-5 bg-gray-50 rounded-lg">
    <div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-0.5">{description}</p>
    </div>

    {/* Toggle Switch */}
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-5"></div>
    </label>
  </div>
);

const Notification: React.FC = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    missionStatus: true,
    budgetAlerts: true,
    missionStatus2: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    console.log("Saved Preferences:", preferences);
    // TODO: Send to backend API
    alert("Preferences saved successfully!");
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Notification Preferences
      </h2>

      {/* Notification Settings */}
      <div className="space-y-3 max-w-2xl">
        <NotificationItem
          title="Email Notification"
          description="Receive notification via Email"
          checked={preferences.email}
          onChange={() => handleToggle("email")}
        />

        <NotificationItem
          title="Push Notification"
          description="Receive Push Notification"
          checked={preferences.push}
          onChange={() => handleToggle("push")}
        />

        <NotificationItem
          title="Mission Status"
          description="Get notified when mission status changes"
          checked={preferences.missionStatus}
          onChange={() => handleToggle("missionStatus")}
        />

        <NotificationItem
          title="Budget Alerts"
          description="Get notified when mission status changes"
          checked={preferences.budgetAlerts}
          onChange={() => handleToggle("budgetAlerts")}
        />

        <NotificationItem
          title="Mission Status"
          description="Get notified when mission status changes"
          checked={preferences.missionStatus2}
          onChange={() => handleToggle("missionStatus2")}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 px-8 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Notification;
