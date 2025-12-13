import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaCheck, FaBriefcase, FaMapMarkerAlt, FaCalendar, FaFileAlt } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";

type NotificationStatus = "approved" | "pending" | "rejected" | "funding_in_progress" | "new_request";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  status: NotificationStatus;
  missionDetails?: {
    requester: {
      name: string;
      position: string;
      initials: string;
    };
    missionTitle: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    documents: string[];
    managerFeedback?: string;
  };
}

const NotificationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Mock notifications data, before intergration
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Mission approved",
      message: "Your mission to United Kingdom has been approved .Congratulations!",
      time: "One day ago",
      status: "approved",
      missionDetails: {
        requester: {
          name: "Jonathan Ndayizeye",
          position: "Chief Technology Officer",
          initials: "CTO",
        },
        missionTitle: "AI Summit",
        location: "UK",
        startDate: "Jan 12,2026",
        endDate: "Jan 22,2025",
        description:
          "Visit key clients to discuss new project opportunities and strengthen business relationships. Will meet with 5 Major clients over 4 days",
        documents: ["Flight ticket.pdf", "Clients meetings schedules.xls"],
        managerFeedback: "Great initiative! Approved for immediate action.",
      },
    },
    {
      id: "2",
      title: "Umurava Initiative Summit - Approved, Funding in Progress",
      message: "Mission to senegal is waiting your approval. Please review the details.",
      time: "1 days ago",
      status: "funding_in_progress",
      missionDetails: {
        requester: {
          name: "Jonathan Ndayizeye",
          position: "chief Technology Officer",
          initials: "CTO",
        },
        missionTitle: "Mission Title",
        location: "Location",
        startDate: "Jan 12,2025",
        endDate: "Jan 12,2025",
        description:
          "Visit key clients to discuss new project opportunities and strengthen business relationships. Will meet with 5 Major clients over 4 days",
        documents: ["Flight ticket.pdf", "Clients meetings schedules.xls"],
      },
    },
    {
      id: "3",
      title: "Mission Rejected",
      message: "Mission to venus has been  successful completed .Well done team!",
      time: "4 days ago",
      status: "rejected",
      missionDetails: {
        requester: {
          name: "Sarah Johnson",
          position: "Marketing Manager",
          initials: "SJ",
        },
        missionTitle: "Mission Title",
        location: "Location",
        startDate: "Jan 12,2025",
        endDate: "Jan 12,2025",
        description:
          "Visit key clients to discuss new project opportunities and strengthen business relationships. Will meet with 5 Major clients over 4 days",
        documents: ["Flight ticket.pdf", "Clients meetings schedules.xls"],
        managerFeedback: "Budget constraints prevent approval at this time.",
      },
    },
    {
      id: "4",
      title: "New mission request",
      message: "New mission request from alex johnson operation'desert storm'",
      time: "2 hours ago",
      status: "new_request",
      missionDetails: {
        requester: {
          name: "Sarah Johnson",
          position: "Marketing Manager",
          initials: "SJ",
        },
        missionTitle: "Mission Title",
        location: "Location",
        startDate: "Jan 12,2025",
        endDate: "Jan 12,2025",
        description:
          "Visit key clients to discuss new project opportunities and strengthen business relationships. Will meet with 5 Major clients over 4 days",
        documents: ["Flight ticket.pdf", "Clients meetings schedules.xls"],
      },
    },
  ];

  const getNotificationIcon = (status: NotificationStatus) => {
    switch (status) {
      case "approved":
        return <FaCheck className="text-green-500" size={20} />;
      case "funding_in_progress":
        return <MdOutlinePendingActions className="text-orange-500" size={20} />;
      case "rejected":
        return <RiFileCloseLine className="text-red-500" size={20} />;
      case "new_request":
        return <BsFileEarmarkText className="text-blue-500" size={20} />;
      default:
        return <FaCheck className="text-gray-500" size={20} />;
    }
  };

  const getBorderColor = (status: NotificationStatus) => {
    switch (status) {
      case "approved":
        return "border-l-green-500";
      case "funding_in_progress":
        return "border-l-orange-500";
      case "rejected":
        return "border-l-red-500";
      case "new_request":
        return "border-l-blue-500";
      default:
        return "border-l-gray-300";
    }
  };

  const getStatusBadge = (status: NotificationStatus) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium">
            Approved
          </span>
        );
      case "funding_in_progress":
        return (
          <span className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium">
            Funding in Progress
          </span>
        );
      case "rejected":
        return (
          <span className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-lg text-sm font-medium">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg shadow-sm mb-6">
          <h1 className="font-bold text-2xl text-center text-gray-800">
            Notifications
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Company Filter */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[200px]"
          >
            <option>All companies</option>
            <option>Company A</option>
            <option>Company B</option>
            <option>Company C</option>
            <option>Company D</option>
          </select>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => setSelectedNotification(notification)}
              className={`bg-white rounded-lg shadow-sm p-5 flex items-start gap-4 border-l-4 ${getBorderColor(
                notification.status
              )} hover:shadow-md transition-shadow cursor-pointer relative`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.status)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>

              {/* Unread Indicator */}
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Details Modal */}
        {selectedNotification && selectedNotification.missionDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-800">
                  Mission Request Details
                </h2>
                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedNotification.status)}
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Requester Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {selectedNotification.missionDetails.requester.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {selectedNotification.missionDetails.requester.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {selectedNotification.missionDetails.requester.position}
                    </p>
                  </div>
                </div>

                {/* Mission Information */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                    Mission Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaBriefcase className="text-gray-400" />
                      <span>{selectedNotification.missionDetails.missionTitle}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{selectedNotification.missionDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaCalendar className="text-gray-400" />
                      <span>
                        {selectedNotification.missionDetails.startDate} -{" "}
                        {selectedNotification.missionDetails.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      {selectedNotification.missionDetails.description}
                    </p>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                    Supporting Documents
                  </h3>
                  <div className="space-y-2">
                    {selectedNotification.missionDetails.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                      >
                        <FaFileAlt className="text-gray-400" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manager Feedback (if exists) */}
                {selectedNotification.missionDetails.managerFeedback && (
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                      Manager Feedback
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedNotification.missionDetails.managerFeedback}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
