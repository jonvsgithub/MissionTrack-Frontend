import React from "react";
import Header from "../Components/HeaderDash";
import AdminSidebar from "../Components/AdminSidebar";
import AdminStats from "../Components/AdminStats";

// ✅ Utility for light/dark theming
const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const AdminDashboard: React.FC = () => {
  // ✅ Example company data (replace with API/state)
  const filteredCompany = [
    {
      company: "Tech Solutions Ltd",
      status: "Active",
      plan: "Premium",
      contactPerson: "John Doe",
      payment: "Paid",
      activity: "2025-09-15",
    },
    {
      company: "SmartBiz Inc",
      status: "Pending",
      plan: "Basic",
      contactPerson: "Jane Smith",
      payment: "Unpaid",
      activity: "2025-09-10",
    },
  ];

  // ✅ Handlers (replace with your logic)
  const startEdit = (index: number) => {
    console.log("Edit company at index:", index);
  };

  const deleteTask = (index: number) => {
    console.log("Delete company at index:", index);
  };

  return (
    <>
      <Header />
      <div
        className={`flex gap-70 mt-20 ${twTheme(
          "bg-[#E6EAF5]",
          "bg-gray-900"
        )}`}
      >
        <AdminSidebar />
        <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
          <AdminStats />

          {/* Add Company Button */}
          <button className="bg-primaryColor-700 w-60 mb-5 text-lg text-center rounded-2xl text-white">
            <div className="flex items-center justify-center">
              <span className="text-4xl mr-2">+</span>
              <span>Add Company</span>
            </div>
          </button>

          {/* Company Table */}
          <table className="min-w-full table-auto border rounded-md">
            <thead className="text-white bg-primaryColor-500">
              <tr>
                <th className="px-4 py-2 text-left">Company Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Plan</th>
                <th className="px-4 py-2 text-left">Contact Person</th>
                <th className="px-4 py-2 text-left">Payment</th>
                <th className="px-4 py-2 text-left">Last Activity</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompany.map((company, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 font-bold">{company.company}</td>
                  <td className="px-4 py-2">{company.status}</td>
                  <td className="px-4 py-2">{company.plan}</td>
                  <td className="px-4 py-2">{company.contactPerson}</td>
                  <td className="px-4 py-2">{company.payment}</td>
                  <td className="px-4 py-2">{company.activity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => startEdit(index)}
                      className="text-primaryColor-500 pr-3 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
