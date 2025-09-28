
import React, { useState } from "react";

interface Employee {
  id: string;
  fullName: string;
  role: string;
  department: string | null;
  status: string;
  initials?: string;
}

interface EditEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onEmployeeUpdated: (emp: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  employee,
  onClose,
  onEmployeeUpdated,
}) => {
  const [formData, setFormData] = useState({
    fullName: employee.fullName,
    role: employee.role,
    department: employee.department || "",
    status: employee.status,
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).token
    : "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(
      `https://missiontrack-backend.onrender.com/api/users/${employee.id}`,
      {
        method: "PATCH", // ✅ use PATCH instead of PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          department: formData.department,
          role: formData.role,
        }), // ✅ match backend schema
      }
    );

    const data = await res.json();
    if (res.ok) {
      const updatedEmp: Employee = {
        ...employee,
        ...formData,
        initials: formData.fullName
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      };
      onEmployeeUpdated(updatedEmp);
      onClose();
    } else {
      console.error(data.message || "Failed to update employee");
    }
  } catch (err) {
    console.error("Error updating employee:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
