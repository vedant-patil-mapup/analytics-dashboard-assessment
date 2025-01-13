import { Link } from "react-router-dom";
import LineChartPage from "./LineChartPage";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto">
      <nav className="bg-gray-100 p-6 w-full md:w-1/4 md:h-screen md:sticky top-0 z-50 shadow-2xl border-r border-gray-300 rounded-r-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
          EV Dashboard
        </h1>
        <ul className="flex flex-col flex-grow py-4 justify-center gap-6 md:gap-10 border-t border-gray-800 ">
          <li className="relative group">
            <Link
              to="/pie-chart"
              className="block text-lg md:text-2xl text-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center p-2 bg-blue-100 rounded-full mx-auto group-hover:scale-110 transform transition-all duration-300 overflow-hidden">
                <span className="text-xs md:text-lg font-semibold text-center leading-tight px-2">
                  Auto Manufacturer
                </span>
              </div>
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/table"
              className="block text-lg md:text-2xl text-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center p-2 bg-blue-100 rounded-full mx-auto group-hover:scale-110 transform transition-all duration-300 overflow-hidden">
                <span className="text-xs md:text-lg font-semibold text-center leading-tight px-2">
                  EVs Make
                </span>
              </div>
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/bar-chart"
              className="block text-lg md:text-2xl text-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center p-2 bg-green-100 rounded-full mx-auto group-hover:scale-110 transform transition-all duration-300">
                <span className="text-xs md:text-lg font-semibold">
                  EVs Chart
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex flex-col p-6 w-full">
        <h1 className="text-3xl font-bold text-center p-3">
          Electric Vehicle Insights
        </h1>
        <LineChartPage />
      </main>
    </div>
  );
};

export default Dashboard;
