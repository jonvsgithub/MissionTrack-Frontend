import React from "react";

interface ExpenseCategory {
    name: string;
    current: number;
    total: number;
}

const ExpenseOverview: React.FC = () => {
    // Sample data - this should come from API in production
    const expenses: ExpenseCategory[] = [
        { name: "Meal", current: 120000, total: 140000 },
        { name: "Accommodation", current: 120000, total: 140000 },
        { name: "Transport", current: 120000, total: 140000 },
        { name: "Others", current: 120000, total: 140000 },
    ];

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString();
    };

    const getPercentage = (current: number, total: number) => {
        return ((current / total) * 100).toFixed(0);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-md">
            <h3 className="font-semibold text-gray-800 mb-4">Mission expense overview</h3>

            <div className="space-y-4">
                {expenses.map((expense, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{expense.name}</span>
                            <span className="text-gray-600">
                                {formatCurrency(expense.current)} / {formatCurrency(expense.total)}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getPercentage(expense.current, expense.total)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseOverview;
