import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// eslint-disable-next-line react/prop-types
const RangeBarChart = ({ data }) => {
  const chartData = data
    .map(({ make, avgRange }) => ({
      make,
      avgRange: Math.round(avgRange),
    }))
    .sort((a, b) => b.avgRange - a.avgRange)
    .slice(0, 10);
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Average Range by Make</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="make" height={50} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgRange" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RangeBarChart;
