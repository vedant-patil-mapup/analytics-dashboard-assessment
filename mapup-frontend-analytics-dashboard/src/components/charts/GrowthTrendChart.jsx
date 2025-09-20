import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = {
  primary: "#2563eb",
};

// eslint-disable-next-line react/prop-types
const GrowthTrendChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">EV Adoption Timeline</h3>
      <p className="text-sm text-gray-600 mb-4">
        Growth trend of EV adoption over the years
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS.primary}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthTrendChart;
