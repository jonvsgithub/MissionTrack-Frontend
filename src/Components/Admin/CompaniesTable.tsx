import React from "react";

// Reusable component for the status/plan/payment badges
const Badge = ({ text, type }) => {
  const getColorClasses = (badgeType: string) => {
    switch (badgeType) {
      case "approved":
        return "text-blue-600 bg-transparent border border-blue-600";
      case "rejected":
        return "text-red-600 bg-transparent border border-red-600";
      case "pending":
        return "text-yellow-600 bg-transparent border border-yellow-600";
      case "active":
        return "text-green-600 bg-transparent border border-green-600";
      case "trial":
        return "text-yellow-600 bg-transparent border border-yellow-600";
      case "blocked":
        return "text-red-600 bg-transparent border border-red-600";
      default:
        return "text-gray-600 bg-transparent border border-gray-600";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-medium text-xs whitespace-nowrap ${getColorClasses(
        type
      )}`}
    >
      {text}
    </span>
  );
};

// ✅ Styled Companies Table
const CompaniesTable = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-6 text-sm font-semibold text-gray-600 bg-gray-100 px-6 py-3">
        <div>Company</div>
        <div>Status</div>
        <div>Manager</div>
        <div>Plan</div>
        <div>Created</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Table Rows */}
      {data.length > 0 ? (
        data.map((company: { companyName: string; companyEmail: string; status: unknown; manager: { fullName: string | number  } | null | undefined; state: unknown|string; createdAt: string | number | Date }, index: string ) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-6 items-center text-sm px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition"
          >
            {/* Company Info */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {company.companyName}
              </span>
              <span className="text-xs text-gray-500">
                {company.companyEmail}
              </span>
            </div>

            {/* Status */}
            <div>
              <Badge text={company.status} type={company.status} />
            </div>

            {/* Manager */}
            <div className="text-gray-700">{company.manager?.fullName}</div>

            {/* Plan/State */}
            <div>
              <Badge text={company.state || "N/A"} type={company.state} />
            </div>

            {/* Date */}
            <div className="text-gray-500 text-sm">
              {new Date(company.createdAt).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <button className="p-2 rounded-full hover:bg-gray-200 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 italic py-6">
          No companies found
        </div>

      )}
    </div>
  );
};

export default CompaniesTable;
