import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    LogOut,
    Menu,
    X,
    Calendar,
    Sparkles
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/auth/login");
    };

    const navItems = [
        { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/counsellors", label: "Counsellors", icon: Users },
        { path: "/admin/resources", label: "Resources", icon: BookOpen },
    ];

    const isActive = (path) => {
        if (path === "/admin" && location.pathname === "/admin") return true;
        if (path !== "/admin" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white fixed h-full z-30 shadow-2xl">
                {/* Logo Section with Gradient */}
                <div className="h-16 flex items-center px-6 border-b border-white/10 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg shadow-indigo-500/50 animate-pulse">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">MindAid</span>
                        <p className="text-xs text-indigo-300 font-medium">Admin Portal</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive(item.path)
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/50 scale-105"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white hover:scale-102"
                                }`}
                        >
                            {isActive(item.path) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse"></div>
                            )}
                            <item.icon
                                size={20}
                                className={`relative z-10 transition-transform duration-300 ${isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-indigo-400 group-hover:scale-110"
                                    }`}
                            />
                            <span className="font-medium relative z-10">{item.label}</span>
                            {isActive(item.path) && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            )}
                        </Link>
                    ))}
                </div>

                {/* User Profile Section - Glassmorphic */}
                <div className="p-4 border-t border-white/10 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-3 hover:bg-white/10 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50 ring-2 ring-white/20">
                            {user?.name?.[0] || "A"}
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || "Admin"}</p>
                            <p className="text-xs text-indigo-300 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white z-40 h-16 flex items-center justify-between px-4 shadow-xl">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <span className="font-bold text-lg bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">MindAid</span>
                        <p className="text-xs text-indigo-300">Admin</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`md:hidden fixed top-16 left-0 w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white h-[calc(100vh-4rem)] z-50 transform transition-transform duration-300 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive(item.path)
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors mt-4 border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
