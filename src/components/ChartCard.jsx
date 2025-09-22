export const ChartCard = ({ title, children }) => (
    <div className="bg-[#1f1f1f] rounded-xl shadow-lg p-6 m-5">
      <h2 className="text-xl font-bold text-[#9976f3] mb-8">{title}</h2>
      <div className="h-80 text-white/50 ">
        {children}
      </div>
    </div>
  );