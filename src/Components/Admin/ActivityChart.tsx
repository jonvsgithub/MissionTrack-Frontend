import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// ✅ Define the shape of your data
interface UsageData {
  name: string;
  Logins: number;
  Submissions: number;
}

const data: UsageData[] = [
  { name: 'Week 1', Logins: 550, Submissions: 350 },
  { name: 'Week 2', Logins: 510, Submissions: 250 },
  { name: 'Week 3', Logins: 540, Submissions: 450 },
];

const ActivityChart: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Usage Activity (Last 3 weeks)
      </h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
            barGap={10}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280]' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
              domain={[0, 600]}
              ticks={[100, 200, 300, 400, 500]}
            />
            <Tooltip formatter={(value: number) => `${value} users`} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="Logins" fill="#2563EB" barSize={30} label={{ position: 'top', fill: '#111827' }} />
            <Bar dataKey="Submissions" fill="#10B981" barSize={30} label={{ position: 'top', fill: '#111827' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
