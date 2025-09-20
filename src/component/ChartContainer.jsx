/* eslint-disable react/prop-types */
export const ChartContainer = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-6">{title}</h2>
      <div className="h-80">
        {children}
      </div>
    </div>
  );