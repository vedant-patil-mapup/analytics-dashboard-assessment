import React from "react";
import { Gauge, Activity, BellRing, LogIn, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import userimg from '../../assets/images/evs.jpg'

const Sidebar = () => {
    return (
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-5">
            <Link to="/" className="font-bold text-gray-800 text-3xl">
                 EV Logo
            </Link>
            <div className="mt-6 flex flex-1 flex-col justify-between">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-900">analytics</label>
                        <Link to="/" className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-orange-100 hover:text-gray-700">
                            <Gauge className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link to="/" className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-orange-100 hover:text-gray-700">
                            <Activity className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Activity</span>
                        </Link>
                    </div>
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-900">content</label>
                        <Link to="/" className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-orange-100 hover:text-gray-700">
                            <Settings className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Setting</span>
                        </Link>
                        <Link to="/" className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-orange-100 hover:text-gray-700">
                            <BellRing className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Notifications</span>
                        </Link>
                         {/*<Link to="/" className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-orange-100 hover:text-gray-700">
                            <Paperclip className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Checklists</span>
                        </Link> */}
                    </div>
                </nav>
                <div className="mt-6">
                    <div className="rounded-lg bg-gray-100 p-3 ">
                        <h2 className="text-sm font-medium text-gray-800">New feature availabel!</h2>
                        <p className="mt-1 text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi velit.</p>
                        <img
                            className="mt-2 h-32 w-full rounded-lg object-cover"
                            src={userimg}
                            alt="Feature"
                        />
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-x-2">
                            <img className="h-7 w-7 rounded-full object-cover" src={userimg} alt="avatar" />
                            <span className="text-sm font-medium text-gray-700">Dan Abromov</span>
                        </Link>
                        <Link to="/login" className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900">
                            <LogIn className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
