import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ✅ Define the shape of your data
interface TrendData {
  name: string;
  trends: number;
}

const data: TrendData[] = [
  { name: "Jan", trends: 4 },
  { name: "Feb", trends: 10 },
  { name: "March", trends: 16 },
  { name: "April", trends: 19 },
  { name: "May", trends: 22 },
  { name: "Jun", trends: 24 },
];

const MissionTrends: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Mission Trends
      </h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              padding={{ left: 15, right: 15 }}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                border: "1px solid #E5E7EB",
              }}
              labelStyle={{ color: "#374151", fontWeight: "500" }}
              cursor={{ stroke: "#2563EB", strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="trends"
              stroke="#2563EB"
              dot={{ stroke: "#2563EB", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MissionTrends;
