import React, { useState } from "react";
import { FaCalendar, FaMapMarkerAlt, FaFileAlt, FaCheck, FaBriefcase, FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export interface DetailsMission {
    id: string;
    name: string;
    role: string;
    initials: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
    documents?: string[];
    status: "pending" | "approved" | "rejected";
}

interface MissionDetailsModalProps {
    mission: DetailsMission;
    onClose: () => void;
    onApprove: (id: string, feedback?: string) => void;
    onReject: (id: string, feedback?: string) => void;
}

const MissionDetailsModal: React.FC<MissionDetailsModalProps> = ({
    mission,
    onClose,
    onApprove,
    onReject,
}) => {
    const [feedback, setFeedback] = useState("");

    const statusStyles = {
        pending: "text-orange-500 border-orange-300 bg-orange-50",
        approved: "text-green-600 border-green-300 bg-green-50",
        rejected: "text-red-500 border-red-300 bg-red-50",
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] flex flex-col relative overflow-hidden">

                {/* Modal Header / Requester Info */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                            {mission.initials}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{mission.name}</h2>
                            <p className="text-gray-500">{mission.role}</p>
                        </div>
                    </div>

                    {/* Close Button X */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Section Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">Mission Request Details</h3>
                        <span
                            className={`px-4 py-1 rounded-md text-sm font-medium border ${statusStyles[mission.status] || "text-gray-500 border-gray-300 bg-gray-50"
                                }`}
                        >
                            {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                        </span>
                    </div>


                    {/* Mission Information */}
                    <div className="border border-gray-200 rounded-xl p-5">
                        <h4 className="font-semibold text-gray-800 mb-4 text-base">Mission Information</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaBriefcase className="text-gray-500" />
                                <span className="font-medium">{mission.title}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaMapMarkerAlt className="text-gray-500" />
                                <span>{mission.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaCalendar className="text-gray-500" />
                                <span>{mission.startDate} - {mission.endDate}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <h5 className="font-semibold text-gray-800 mb-2">Description</h5>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed border border-slate-100">
                                {mission.description || "No description provided."}
                            </div>
                        </div>
                    </div>

                    {/* Supporting Documents */}
                    <div className="border border-gray-200 rounded-xl p-5">
                        <h4 className="font-semibold text-gray-800 mb-4 text-base">Supporting Documents</h4>
                        <div className="space-y-2">
                            {mission.documents && mission.documents.length > 0 ? (
                                mission.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <FaFileAlt className="text-gray-400" />
                                        <span className="text-sm text-gray-700 underline cursor-pointer">{doc}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 italic">No documents attached.</p>
                            )}
                        </div>
                    </div>

                    {/* Manager Feedback */}
                    {mission.status === "pending" && (
                        <div className="border border-gray-200 rounded-xl p-5">
                            <h4 className="font-semibold text-gray-800 mb-3 text-base">Manager Feedback</h4>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Add Your comment before approval or rejection"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
                            />
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>

                    {mission.status === "pending" && (
                        <>
                            <button
                                onClick={() => onReject(mission.id, feedback)}
                                className="px-6 py-2 rounded-md border border-red-200 text-red-500 bg-red-50 font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                            >
                                <RxCross2 />
                                Rejected
                            </button>
                            <button
                                onClick={() => onApprove(mission.id, feedback)}
                                className="px-6 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <FaCheck />
                                Approve
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MissionDetailsModal;
