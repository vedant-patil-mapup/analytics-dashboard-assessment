import { Cell, Pie, ResponsiveContainer, Tooltip, PieChart } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

// eslint-disable-next-line react/prop-types
const EVTypesPieChart = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">EV Types Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EVTypesPieChart;
