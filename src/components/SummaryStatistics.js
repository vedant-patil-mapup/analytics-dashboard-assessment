import { FaCar, FaBatteryFull, FaPlug } from 'react-icons/fa';

const SummaryStatistics = ({ totalEVs, byType }) => {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-xl font-semibold">Summary Statistics</h2>
      <div className="flex justify-around mb-4">
        <div className="flex items-center">
          <FaCar className="text-2xl mr-2" />
          <p className="text-lg">
            Total EVs: <span className="font-bold">{totalEVs}</span>
          </p>
        </div>
        <div className="flex items-center">
          <FaBatteryFull className="text-2xl mr-2" />
          <p className="text-lg">
            BEVs: <span className="font-bold">{byType['Battery Electric Vehicle (BEV)'] || 0}</span>
          </p>
        </div>
        <div className="flex items-center">
          <FaPlug className="text-2xl mr-2" />
          <p className="text-lg">
            PHEVs: <span className="font-bold">{byType['Plug-in Hybrid Electric Vehicle (PHEV)'] || 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatistics;
