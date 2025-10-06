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
  id: string;
  missionName: string;
  email: string;
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
      {selectedMission && !showCommentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[600px] max-w-[90%] p-6 relative border border-gray-100">
            <button
              onClick={() => setSelectedMission(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>

            <div className="mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                Mission Details
              </h2>
              <p className="text-sm text-gray-500">
                Review mission request information
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="font-medium text-gray-600 px-4 py-2 w-1/3">
                      Title
                    </td>
                    <td className="text-gray-800 px-4 py-2">
                      {selectedMission.missionName}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-600 px-4 py-2">
                      Email
                    </td>
                    <td className="text-gray-800 px-4 py-2">
                      {selectedMission.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-600 px-4 py-2">
                      Manager
                    </td>
                    <td className="text-gray-800 px-4 py-2">
                      {selectedMission.manager}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-600 px-4 py-2">
                      Job Position
                    </td>
                    <td className="text-gray-800 px-4 py-2">
                      {selectedMission.plan}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-600 px-4 py-2">
                      Status
                    </td>
                    <td className="px-4 py-2">
                      <Badge text={selectedMission.status} />
                    </td>
                  </tr>
                  {selectedMission.description && (
                    <tr>
                      <td className="font-medium text-gray-600 px-4 py-2">
                        Description
                      </td>
                      <td className="text-gray-800 px-4 py-2">
                        {selectedMission.description}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {selectedMission.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleApprove(selectedMission.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedMission)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-gray-500 text-sm self-center">
                  Already Reviewed
                </span>
              )}
              <button
                onClick={() => setSelectedMission(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
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
                className={`px-3 py-1 text-sm rounded-md text-white ${
                  commentText.trim()
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
