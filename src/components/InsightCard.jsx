export const InsightCard = ({ title, value, subtext, icon: Icon , style}) => (
    <div style={style} className=" bg-gr rounded-xl shadow-md p-6 hover:translate-y-[-10px] hover:shadow-lg transition-transform  duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-xl font-bold text-white mt-1">{value}</p>
          <p className="text-sm text-white/60 mt-1">{subtext}</p>
        </div>
        <div className="bg-plight p-3 rounded-lg">
          <Icon className="w-6 h-6 text-pdark" />
        </div>
      </div>
    </div>
  );
  export default InsightCard;