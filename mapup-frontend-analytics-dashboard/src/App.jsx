import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
