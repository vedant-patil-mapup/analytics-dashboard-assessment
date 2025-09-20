import logo from "../../assets/mapup-logo.png";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <img src={logo} alt="Logo" className="h-8" />
        </div>
        <div className="flex flex-1 justify-center">
          <h2 className="text-xl font-bold">EV Population Dashboard</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
