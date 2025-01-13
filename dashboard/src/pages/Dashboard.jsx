import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import LineChartPage from "./LineChartPage";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto">
      <div>
        <button
          onClick={toggleDrawer}
          className={`fixed top-4 left-4 z-50 ${
            isOpen && "hidden"
          } p-2 bg-gray-100 rounded-full shadow-lg focus:outline-none md:hidden`}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div
          className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 shadow-2xl transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 md:hidden`}
        >
          <button
            onClick={toggleDrawer}
            className="absolute top-0 right-2 p-2 bg-gray-200 rounded-full shadow-md focus:outline-none"
          >
            <X className="w-3 h-3 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-center mt-6 text-gray-700">
            EV Dashboard
          </h1>
          <ul className="flex flex-col gap-8 mt-10 p-4 border-t border-gray-300">
            <li>
              <Link
                to="/pie-chart"
                onClick={toggleDrawer}
                className="block text-lg text-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                Auto Manufacturer
              </Link>
            </li>
            <li>
              <Link
                to="/table"
                onClick={toggleDrawer}
                className="block text-lg text-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                EVs Make
              </Link>
            </li>
            <li>
              <Link
                to="/bar-chart"
                onClick={toggleDrawer}
                className="block text-lg text-center text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                EVs Chart
              </Link>
            </li>
          </ul>
        </div>
        <nav className="hidden md:block bg-gray-100 p-6 w-64 h-screen sticky top-0 shadow-2xl border-r border-gray-300">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
            EV Dashboard
          </h1>
          <ul className="flex flex-col gap-8 border-t border-gray-500 py-5">
            {[
              {
                to: "/pie-chart",
                label: "Auto Manufacturer",
                hover: "hover:text-orange-700 hover:shadow-lg hover:scale-105",
              },
              {
                to: "/table",
                label: "EVs Make",
                hover: "hover:text-blue-700 hover:shadow-lg hover:scale-105",
              },
              {
                to: "/bar-chart",
                label: "EVs Chart",
                hover: "hover:text-green-700 hover:shadow-lg hover:scale-105",
              },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`block text-lg text-center text-gray-600 transition-transform transform duration-300 p-2 hover:border hover:border-blue-400 ${item.hover}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

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
