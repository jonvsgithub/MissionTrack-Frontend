import React, { useState } from "react";
import { FiCalendar, FiEye, FiEdit } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";

interface Report {
    id: string;
    date: string;
    title: string;
    tasks: string[];
    status: "submitted" | "draft";
    moreTasksCount?: number;
}

interface ReportsListProps {
    onNewReport: () => void;
}

const ReportsList: React.FC<ReportsListProps> = ({ onNewReport }) => {
    // Mock data - replace with real API data
    const [reports] = useState<Report[]>([
        {
            id: "1",
            date: "2024-01-15",
            title: "Completed Quarterly Budget analysis",
            tasks: ["Budget analysis", "Presentation Preparation"],
            status: "submitted",
            moreTasksCount: 1,
        },
        {
            id: "2",
            date: "2024-01-15",
            title: "Client meeting and project planning",
            tasks: ["Budget analysis", "Presentation Preparation"],
            status: "submitted",
            moreTasksCount: 1,
        },
        {
            id: "3",
            date: "2024-01-15",
            title: "Completed Quarterly Budget analysis",
            tasks: ["Budget analysis", "Presentation Preparation"],
            status: "draft",
            moreTasksCount: 1,
        },
        {
            id: "4",
            date: "2024-01-15",
            title: "Completed Quarterly Budget analysis",
            tasks: ["Budget analysis", "Presentation Preparation"],
            status: "submitted",
            moreTasksCount: 1,
        },
        {
            id: "5",
            date: "2024-01-15",
            title: "Client meeting and project planning",
            tasks: ["Budget analysis", "Presentation Preparation"],
            status: "submitted",
            moreTasksCount: 1,
        },
        {
            id: "6",
            date: "2024-01-15",
            title: "Completed Quarterly Budget analysis",
            tasks: ["Budget analysis", "Presentation Preparation"],
            status: "draft",
            moreTasksCount: 1,
        },
    ]);

    const handleView = (reportId: string) => {
        console.log("View report:", reportId);
        // TODO: Navigate to view page or open modal
    };

    const handleEdit = (reportId: string) => {
        console.log("Edit report:", reportId);
        // TODO: Navigate to edit page
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg shadow-sm mb-6">
                    <h1 className="font-bold text-2xl text-center text-gray-800">
                        Daily Mission Report Form
                    </h1>
                </div>

                {/* New Report Button */}
                <div className="mb-6">
                    <button
                        onClick={onNewReport}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-sm"
                    >
                        <BiPlus size={20} />
                        New Report
                    </button>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                        >
                            {/* Date and Status */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <FiCalendar className="text-gray-500" />
                                    <span className="text-sm font-medium">{report.date}</span>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${report.status === "submitted"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-orange-100 text-orange-700"
                                        }`}
                                >
                                    {report.status === "submitted" ? "✓" : "✎"}
                                    {report.status === "submitted" ? "Submitted" : "Draft"}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-semibold text-gray-800 mb-3">
                                {report.title}
                            </h3>

                            {/* Tasks */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Tasks:</p>
                                <ul className="space-y-1">
                                    {report.tasks.map((task, index) => (
                                        <li key={index} className="text-sm text-gray-700 flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                    {report.moreTasksCount && report.moreTasksCount > 0 && (
                                        <li className="text-sm text-gray-500 italic">
                                            +{report.moreTasksCount} more task
                                            {report.moreTasksCount > 1 ? "s" : ""}
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => handleView(report.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    <FiEye size={16} />
                                    View
                                </button>
                                <button
                                    onClick={() => handleEdit(report.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    <FiEdit size={16} />
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {reports.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No reports yet</p>
                        <button
                            onClick={onNewReport}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                        >
                            Create Your First Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsList;
