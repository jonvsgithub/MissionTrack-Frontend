// components/MissionTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Badge = ({ text }: { text: string }) => {
  const getColorClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "inprogress":
        return "bg-blue-100 text-blue-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <span
      className={`px-2 py-1 inline-block rounded-full font-medium text-xs ${getColorClasses(
        text
      )}`}
    >
      {text}
    </span>
  );
};

type Mission = {
  files: any[]; // change from boolean to array
  issuedTo: any;
  id: string;
  missionName: string;
  email: any;
  status: string;
  plan: string;
  manager: string;
  lastActivity: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

type MissionTableProps = {
  data: Mission[];
};

const MissionTable: React.FC<MissionTableProps> = ({ data }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setMissions(data);
  }, [data]);

  const updateStatus = async (
    missionId: string,
    action: "Approve" | "Reject",
    comment?: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://missiontrack-backend.onrender.com/api/actions/create",
        {
          missionId,
          action,
          comment: comment || `${action}d by manager`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMissions((prev) =>
        prev.map((m) =>
          m.id === missionId ? { ...m, status: action.toLowerCase() } : m
        )
      );
      setSelectedMission(null);
      setShowCommentModal(false);
      setCommentText("");
    } catch (err) {
      console.error("Error updating mission status:", err);
      alert("Failed to update mission status");
    }
  };

  const handleApprove = (missionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this mission?"
    );
    if (confirmed) {
      updateStatus(missionId, "Approve");
    }
  };

  const handleReject = (mission: Mission) => {
    setSelectedMission(mission);
    setShowCommentModal(true);
  };

  const handleDelete = async (missionId: string) => {
    if (!window.confirm("Are you sure you want to delete this mission?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://missiontrack-backend.onrender.com/api/missions/${missionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMissions((prev) => prev.filter((m) => m.id !== missionId));

      // ✅ Success message
      alert("Mission deleted successfully ✅");
    } catch (error) {
      console.error("Error deleting mission:", error);
      alert("Failed to delete mission. Please try again.");
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
      <div className="grid grid-cols-7 gap-4 text-sm font-semibold text-gray-600 bg-gray-50 p-4">
        <div>Mission Title</div>
        <div>Status</div>
        <div>Job Position</div>
        <div>Manager</div>
        <div>Last Activity</div>
        <div>Actions</div>
      </div>

      {missions.length > 0 ? (
        missions.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-7 gap-4 items-center text-sm border-b border-gray-200 p-4 last:border-b-0"
          >
            <div className="font-semibold text-gray-800">{m.missionName}</div>
            <div>
              <Badge text={m.status} />
            </div>
            <div className="text-gray-700">{m.plan}</div>
            <div className="text-gray-700">{m.manager}</div>
            <div className="text-gray-700">{m.lastActivity}</div>
            <div className="flex gap-10 justify-center">
              <button
                onClick={() => setSelectedMission(m)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 italic py-6">
          No missions found
        </div>
      )}

 {/* Mission Details Modal */}
{selectedMission && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
      {/* Close Button */}
      <button
        onClick={() => setSelectedMission(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-primaryColor-50 to-blue-400 -m-6 mb-6 p-6 rounded-t-2xl text-center text-white">
        <h2 className="text-2xl font-bold">Mission Details</h2>
        <p className="text-sm opacity-90">Review full mission request information</p>
      </div>

      {/* Mission Info */}
      <div className="grid grid-cols-2 gap-6 text-sm mb-4">
        <div>
          <p className="font-semibold text-gray-600">Mission Title</p>
          <p className="text-gray-800">{selectedMission.missionName || <span className="italic text-gray-400">N/A</span>}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Employee Email</p>
          <p className="text-gray-800">{selectedMission.issuedTo?.email || <span className="italic text-gray-400">Not available</span>}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Manager</p>
          <p className="text-gray-800">{selectedMission.manager || <span className="italic text-gray-400">N/A</span>}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Job Position</p>
          <p className="text-gray-800">{selectedMission.plan || <span className="italic text-gray-400">N/A</span>}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Start Date</p>
          <p className="text-gray-800">{selectedMission.startDate || <span className="italic text-gray-400">N/A</span>}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">End Date</p>
          <p className="text-gray-800">{selectedMission.endDate || <span className="italic text-gray-400">N/A</span>}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Status</p>
          <Badge text={selectedMission.status} />
        </div>

        <div>
          <p className="font-semibold text-gray-600">Last Activity</p>
          <p className="text-gray-800">{selectedMission.lastActivity || <span className="italic text-gray-400">N/A</span>}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="font-semibold text-gray-600">Description</p>
        <p className="text-gray-800 whitespace-pre-line">{selectedMission.description || <span className="italic text-gray-400">No description provided</span>}</p>
      </div>

      {/* Attachments */}
      {Array.isArray(selectedMission.files) && selectedMission.files.length > 0 ? (
        <div className="mb-6">
          <p className="font-semibold text-gray-600 mb-2">Attachments</p>
          <ul className="space-y-2">
            {selectedMission.files.map((file: any, index: number) => {
              const fileUrl = typeof file === "string" ? file : file.fileUrl;
              const fileName = typeof file === "string" ? file.split("/").pop() : file.fileName;
              return (
                <li key={index} className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2 hover:bg-gray-100 transition">
                  <span className="text-gray-700 truncate">{fileName}</span>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-primaryColor-50 font-medium hover:underline">
                    View
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-gray-400 italic mb-6">No attachments available</p>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleApprove(selectedMission.id)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(selectedMission)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Reject
        </button>
        <button
          onClick={() => setSelectedMission(null)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



      {/* Rejection Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Add Rejection Comment
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              rows={4}
              placeholder="Please provide a reason for rejection..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={!commentText.trim()}
                onClick={() =>
                  updateStatus(selectedMission!.id, "Reject", commentText)
                }
                className={`px-3 py-1 text-sm rounded-md text-white ${commentText.trim()
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-red-300 cursor-not-allowed"
                  }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionTable;