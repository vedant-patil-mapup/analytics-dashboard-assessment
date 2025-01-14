import {
  LayoutGrid,
  Calendar,
  Battery,
  MapPin,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/mapup-logo.png";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-center gap-2 mb-8">
        <img src={logo} alt="EV Analytics Logo" className="h-8" />
      </div>

      <nav className="space-y-2">
        {[
          { icon: LayoutGrid, label: "Dashboard", active: true },
          { icon: Calendar, label: "Yearly Trends" },
          { icon: Battery, label: "Range Analysis" },
          { icon: MapPin, label: "Location Data" },
        ].map((item, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-left
              ${
                item.active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.active && <ChevronRight className="h-4 w-4 ml-auto" />}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
