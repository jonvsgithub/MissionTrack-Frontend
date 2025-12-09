import React from "react";
import MissionOverview from "../Components/MissionOverview";
import RecentActivities from "../Components/RecentActivities";
import QuickLinks from "../Components/Dashboard/QuickLinks";
import ThisMonthChart from "../chart/ThisMonthChart";
import MissionProgress from "../Components/Dashboard/MissionProgress";
import OngoingMissions from "../Components/Dashboard/OngoingMissions";
import ExpenseOverview from "../Components/Dashboard/ExpenseOverview";
import ExpensesSummary from "../Components/Dashboard/ExpensesSummary";

const twTheme = (light: string, dark: string) => {
    return `${light} dark:${dark}`;
};

const EmployeeHome: React.FC = () => {
    // Get user name from localStorage
    const userName = localStorage.getItem("userName") || "User";
    const firstName = userName.split(" ")[0]; // Get first name only

    return (
        <main className={`min-h-screen p-6 ${twTheme("bg-gray-50", "bg-gray-900")}`}>
            {/* Personalized Header */}
            <div className="mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg shadow-sm">
                    <h1 className={`font-bold text-xl ${twTheme("text-gray-800", "text-white")}`}>
                        Hi {firstName}, Here is your Missions request overview
                    </h1>
                </div>
            </div>

            {/* Mission Overview Cards */}
            <div className="mb-6">
                <MissionOverview />
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <RecentActivities />
                </div>

                {/* Middle Column */}
                <div className="space-y-6">
                    <QuickLinks />
                    <OngoingMissions />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <MissionProgress />
                    <ExpensesSummary />
                </div>
            </div>

            {/* Bottom Section - Charts and Expenses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* This Month Chart */}
                <div>
                    <ThisMonthChart />
                </div>

                {/* Expense Overview */}
                <div>
                    <ExpenseOverview />
                </div>
            </div>
        </main>
    );
};

export default EmployeeHome;
