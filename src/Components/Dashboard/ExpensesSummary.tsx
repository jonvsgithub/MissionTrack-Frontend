import React from "react";

const ExpensesSummary: React.FC = () => {
    // Sample data - should come from APIs
    const totalBudget = 800000;
    const totalUsed = 600000;
    const percentageUsed = ((totalUsed / totalBudget) * 100).toFixed(0);

    const formatCurrency = (amount: number) => {
        return `${(amount / 1000).toFixed(0)}k`;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 w-[280px]">
            <h3 className="font-semibold text-gray-800 mb-4">Expenses</h3>

            <div className="flex flex-col items-center">
                {/* Donut Chart */}
                <div className="relative w-40 h-40 mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="12"
                            strokeDasharray={`${(parseInt(percentageUsed) / 100) * 251.2} 251.2`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{percentageUsed}%</span>
                        <span className="text-xs text-gray-500">Used</span>
                    </div>
                </div>

                {/* Budget Info */}
                <div className="text-center space-y-1 mb-3">
                    <div className="text-sm">
                        <span className="text-gray-600">Total Budget: </span>
                        <span className="font-semibold text-gray-800">{formatCurrency(totalBudget)}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-gray-600">Total Used: </span>
                        <span className="font-semibold text-orange-500">{formatCurrency(totalUsed)}</span>
                    </div>
                </div>

                {/* Check Expenses Link */}
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium underline">
                    Check Expense
                </button>
            </div>
        </div>
    );
};

export default ExpensesSummary;
