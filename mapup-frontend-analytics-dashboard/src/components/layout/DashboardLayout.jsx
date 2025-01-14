import {
  LayoutGrid,
  Car,
  Calendar,
  Battery,
  MapPin,
  ChevronRight,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Car className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-bold">EV Analytics</h1>
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

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="lg:hidden">
          <Menu className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">EV Population Dashboard</h2>
        </div>
      </div>
    </header>
  );
};

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
