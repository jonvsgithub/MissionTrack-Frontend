import React, { useState } from "react";

const Calendar: React.FC = () => {
    const [calendarSync, setCalendarSync] = useState(true);
    const [calendarProvider, setCalendarProvider] = useState("Google Calendar");
    const [defaultReminder, setDefaultReminder] = useState("15 Minutes");

    const handleSubmit = () => {
        console.log("Calendar Settings:", {
            calendarSync,
            calendarProvider,
            defaultReminder,
        });
        alert("Calendar preferences saved successfully!");
    };

    return (
        <div>
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Calendar Integration
            </h2>

            {/* Calendar Sync Toggle */}
            <div className="max-w-2xl space-y-6">
                <div className="flex items-center justify-between py-4 px-5 bg-gray-50 rounded-lg">
                    <div>
                        <h3 className="font-medium text-gray-800">Calendar Sync</h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                            Sync approved missions with your calendar
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={calendarSync}
                            onChange={() => setCalendarSync(!calendarSync)}
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-5"></div>
                    </label>
                </div>

                {/* Calendar Provider */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calendar Provider
                    </label>
                    <select
                        value={calendarProvider}
                        onChange={(e) => setCalendarProvider(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="Google Calendar">Google Calendar</option>
                        <option value="Outlook Calendar">Outlook Calendar</option>
                        <option value="Apple Calendar">Apple Calendar</option>
                    </select>
                </div>

                {/* Default Reminder */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Reminder
                    </label>
                    <select
                        value={defaultReminder}
                        onChange={(e) => setDefaultReminder(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="5 Minutes">5 Minutes</option>
                        <option value="15 Minutes">15 Minutes</option>
                        <option value="30 Minutes">30 Minutes</option>
                        <option value="1 Hour">1 Hour</option>
                        <option value="1 Day">1 Day</option>
                    </select>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSubmit}
                    className="px-8 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all"
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default Calendar;
