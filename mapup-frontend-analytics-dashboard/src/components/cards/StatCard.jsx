// eslint-disable-next-line react/prop-types
const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-50">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1">
              ↑ {trend}% from last year
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
