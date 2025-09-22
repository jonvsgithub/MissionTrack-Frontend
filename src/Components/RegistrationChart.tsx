import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// ✅ Define the type for each data point
interface DataPoint {
  name: string;
  registrations: number;
}

const data: DataPoint[] = [
  { name: 'Jan', registrations: 4 },
  { name: 'Feb', registrations: 10 },
  { name: 'March', registrations: 16 },
  { name: 'April', registrations: 19 },
  { name: 'May', registrations: 22 },
  { name: 'Jun', registrations: 24 },
];

const RegistrationChart: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Companies Registration Over Time
      </h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              padding={{ left: 15, right: 15 }}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
              domain={[0, 24]}
              ticks={[2, 8, 16, 24]}
            />
            <Line
              type="linear"
              dataKey="registrations"
              stroke="#2563EB"
              dot={{ stroke: '#2563EB', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegistrationChart;
