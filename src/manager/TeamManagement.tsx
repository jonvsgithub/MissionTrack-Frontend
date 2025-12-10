import React, { useState, useEffect } from "react";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "./ManagerSideBar";
import { VscEye } from "react-icons/vsc";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";

interface Employee {
  id: string;
  fullName: string;
  role: string;
  department: string | null;
  status: string;
  initials?: string;
  is_active: boolean;
}

const TeamManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState<null | Employee>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Members");

  // State for tracking which dropdown is open (by employee ID)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).token
    : "";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(
          "https://missiontrack-backend.onrender.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          const mappedEmployees = data.data.map((emp: any) => ({
            id: emp.id,
            fullName: emp.fullName,
            role: emp.role,
            department: emp.department || "Operators", // Defaulting as per mockup if null
            status: emp.is_active ? "Active" : "Inactive",
            is_active: emp.is_active,
            initials: emp.fullName
              ? emp.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
              : "NA",
          }));
          setEmployees(mappedEmployees);
        } else {
          console.error(data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEmployees();
  }, [token]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId && !(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const res = await fetch(
        `https://missiontrack-backend.onrender.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        console.error("Failed to delete employee");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleUpdate = (updated: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      (emp.department &&
        emp.department.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "All Members" || emp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-[#E6EAF5] overflow-hidden">
      <ManagerSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="bg-gradient-to-r from-blue-300 to-teal-200 text-lg text-black font-bold px-4 py-3 rounded-lg shadow-sm">
              Employee Management
            </h1>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white p-2 rounded-lg shadow-sm mb-6 flex items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="w-48">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-700"
              >
                <option>All Members</option>
                <option>Active</option>
                <option>On Mission</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Add Employee Button */}
          <div className="mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <span className="text-xl leading-none">+</span>
              Add Employee
            </button>
          </div>

          {/* Employee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentEmployees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center relative border border-gray-100"
              >
                {/* Initials/Avatar */}
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold mb-4 shadow-sm">
                  {emp.initials}
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-800 mb-1">{emp.fullName}</h3>
                <p className="text-sm font-medium text-slate-500 mb-1">{emp.role}</p>
                <p className="text-xs text-slate-400 mb-4">{emp.department}</p>

                {/* Status Badge */}
                <div className="mb-6">
                  {emp.status === "Active" ? (
                    <span className="px-6 py-1 bg-green-600 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      Active
                    </span>
                  ) : emp.status === "On Mission" ? (
                    <span className="px-6 py-1 bg-blue-600 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      On Mission
                    </span>
                  ) : (
                    <span className="px-6 py-1 bg-gray-500 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      {emp.status}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full mt-auto">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-md transition-colors text-sm font-medium"
                  >
                    <VscEye size={18} />
                    View
                  </button>

                  <div className="relative dropdown-container">
                    <button
                      onClick={(e) => toggleDropdown(emp.id, e)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <FiMoreHorizontal size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdownId === emp.id && (
                      <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                        <button
                          onClick={() => {
                            setEditModal(emp);
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(emp.id);
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 mb-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </main>

        {showModal && (
          <AddEmployeeModal
            onClose={() => setShowModal(false)}
            onEmployeeAdded={(emp) =>
              setEmployees((prev) => [
                ...prev,
                {
                  ...emp,
                  initials: emp.fullName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join(""),
                  is_active: emp.status === "Active"
                },
              ])
            }
          />
        )}

        {editModal && (
          <EditEmployeeModal
            employee={editModal}
            onClose={() => setEditModal(null)}
            onEmployeeUpdated={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default TeamManagement;