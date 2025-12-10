import React from "react";
import {
    FaArrowLeft,
    FaFilePdf,
    FaCheck,
    FaRegQuestionCircle,
    FaFileDownload,
    FaCloudDownloadAlt,
} from "react-icons/fa";
import { BsClock, BsCalendar2Event } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

interface ReportDetailsViewProps {
    onBack: () => void;
    report: any; // We'll type this properly or use 'any' for the mock data integration
}

const ReportDetailsView: React.FC<ReportDetailsViewProps> = ({
    onBack,
    report,
}) => {
    // Mock Data for the view (since these details aren't in the main list API yet)
    const activities = [
        {
            date: "June 15, 2025",
            time: "08:00",
            title: "Feedback session",
            description: "",
        },
        {
            date: "June 14, 2025",
            time: "14:00",
            title: "Feedback session",
            description: "",
        },
        {
            date: "June 13, 2025",
            time: "14:00",
            title: "Data collection and survey distribution",
            description: "",
        },
        {
            date: "June 12, 2025",
            time: "12:00",
            title: "Purchased Research Materials and software licenses",
            description: "",
        },
        {
            date: "June 12, 2025",
            time: "14:00",
            title: "Project kickoff meeting with stakeholder",
            description: "",
        },
    ];

    const documents = [
        { name: "Market Research Report.pdf", date: "Uploaded Jan 18, 2024", size: "2.4MB" },
        { name: "Market Research Report.pdf", date: "Uploaded Jan 18, 2024", size: "2.4MB" },
        { name: "Market Research Report.pdf", date: "Uploaded Jan 18, 2024", size: "2.4MB" },
    ];

    // Budget Data
    const budgetData = {
        meal: { used: 120000, total: 140000 },
        accommodation: { used: 120000, total: 140000 },
        transport: { used: 120000, total: 140000 },
        others: { used: 120000, total: 140000 },
        total: 800000,
        spent: 530000,
        remaining: 270000,
        percentage: 75,
    };

    const BudgetBar = ({ label, used, total }: { label: string; used: number; total: number }) => {
        const percent = Math.min((used / total) * 100, 100);
        return (
            <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>{label}</span>
                    <span>{used.toLocaleString()} / {total.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percent}%` }}></div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-[#E6EAF5] min-h-screen">
            {/* Header Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 bg-white"
                    >
                        <FaArrowLeft size={14} />
                        Back to Reports
                    </button>
                </div>

                <div className="flex-1 ml-4">
                    <h1 className="text-xl font-bold text-gray-900">{report?.title || "Market Research- Q4 Analysis"}</h1>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-700">Mission Title</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BsCalendar2Event />
                            <span>{report?.dateRange || "Jan 12, 2025 - Jan 12, 2025"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IoLocationOutline />
                            <span>{report?.location || "Location"}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="px-4 py-1.5 bg-orange-400 text-white font-semibold rounded-md text-sm">
                        {report?.status || "Ongoing"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                {/* Left Column: Daily Activity Log */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-slate-800 animate-spin-slow" /> {/* Placeholder icon for "Activity" */}
                        Daily Activity Log
                    </h2>

                    <div className="space-y-4">
                        {activities.map((activity, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center hover:bg-slate-50 transition-colors">
                                <div className="min-w-[140px] text-sm font-semibold text-gray-700">
                                    {activity.date}, <span className="text-gray-500">{activity.time}</span>
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {activity.title}
                                    {activity.description && <p className="text-xs text-gray-400 mt-1">{activity.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <button className="text-green-600 font-semibold text-sm underline hover:text-green-700">View More</button>
                    </div>
                </div>

                {/* Right Column: Progress & Budget */}
                <div className="flex flex-col gap-6">

                    {/* Mission Progress */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-gray-800">Mission Progress</h3>
                            <span className="text-xs text-gray-500">12 June, 2025 - 12 July, 2025</span>
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-bold text-orange-500">49%</span>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-[#107C41]" style={{ width: "49%" }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Budget Overview */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6">Budget overview</h3>

                        <BudgetBar label="Meal" used={budgetData.meal.used} total={budgetData.meal.total} />
                        <BudgetBar label="Accomodation" used={budgetData.accommodation.used} total={budgetData.accommodation.total} />
                        <BudgetBar label="Transport" used={budgetData.transport.used} total={budgetData.transport.total} />
                        <BudgetBar label="Others" used={budgetData.others.used} total={budgetData.others.total} />

                        <div className="flex items-center gap-8 mt-6">
                            {/* CSS Donut Chart */}
                            <div className="relative w-24 h-24 rounded-full"
                                style={{
                                    background: `conic-gradient(#FDBA74 0% ${budgetData.percentage}%, #E5E7EB ${budgetData.percentage}% 100%)`
                                }}>
                                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                    <span className="font-bold text-gray-800 text-lg">{budgetData.percentage}%</span>
                                </div>
                            </div>

                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between w-48 font-medium">
                                    <span className="text-gray-500">Total Budget</span>
                                    <span className="text-gray-900">{budgetData.total.toLocaleString()} Rwf</span>
                                </div>
                                <div className="flex justify-between w-48 font-medium">
                                    <span className="text-gray-500">Spent</span>
                                    <span className="text-green-600">{budgetData.spent.toLocaleString()} Rwf</span>
                                </div>
                                <div className="flex justify-between w-48 font-medium">
                                    <span className="text-gray-500">Remaining</span>
                                    <span className="text-blue-500">{budgetData.remaining.toLocaleString()} Rwf</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row - Docs & Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                {/* Supporting Docs */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">Supporting Documents</h3>
                    <div className="space-y-4">
                        {documents.map((doc, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FaFilePdf className="text-gray-500 text-xl" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{doc.size} - {doc.date}</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-[4px] text-gray-600 text-xs font-medium hover:bg-gray-50">
                                    <FaFileDownload />
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employee Notes */}
                <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-4">Employee Notes/Remarks</h3>
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600 leading-relaxed font-normal">
                        Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus, volutpat lacinia arcu nibh vel ante. Proin dapibus dui eget justo tincidunt eleifend. Mauris porta elementum est. Nullam euismod quis libero sed convallis. Vestibulum fringilla felis nec turpis aliquam auctor a a lectus. Etiam porttitor at eros vitae posuere. Suspendisse nec mollis dolor, vel cursus leo. Integer vitae sem vitae leo pretium porta. In consequat magna purus, iaculis rhoncus velit imperdiet sit amet.
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pb-10">
                <button className="flex items-center gap-2 px-6 py-2.5 border border-red-300 text-red-500 rounded-md font-medium hover:bg-red-50 bg-white shadow-sm">
                    <FaRegQuestionCircle />
                    Request Clarification
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 shadow-sm">
                    <FaCheck />
                    Approve
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-green-600 text-green-600 rounded-md font-medium hover:bg-green-50 bg-white shadow-sm">
                    <FaCloudDownloadAlt />
                    Export PDF
                </button>
            </div>
        </div>
    );
};

export default ReportDetailsView;
