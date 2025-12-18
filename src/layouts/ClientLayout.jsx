import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut, User, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const ClientLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/auth/login");
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    const navLinks = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/counsellors", label: "Counsellors" },
        { path: "/bookings", label: "My Bookings" },
        { path: "/resources", label: "Resources" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/30 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
            {/* Animated Background Mesh */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Premium Navbar */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-indigo-500/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Premium Logo */}
                        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/dashboard")}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50 group-hover:shadow-xl group-hover:shadow-indigo-500/60 group-hover:scale-110 transition-all duration-300">
                                <Sparkles size={20} className="animate-pulse" />
                            </div>
                            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:scale-105 transition-transform">
                                MindAid
                            </span>
                        </div>

                        {/* Desktop Navigation with Gradient Indicators */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-4 py-2 group"
                                >
                                    <span className={`font-semibold transition-colors ${isActive(link.path)
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                                            : 'text-slate-600 group-hover:text-indigo-600'
                                        }`}>
                                        {link.label}
                                    </span>
                                    {isActive(link.path) && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                                    )}
                                    {!isActive(link.path) && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Premium User Profile & Logout */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/20 transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                                    {user?.name?.[0] || "U"}
                                </div>
                                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    {user?.name || "User"}
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-300 hover:scale-110 group"
                                title="Logout"
                            >
                                <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Premium Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50">
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive(link.path)
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                            : 'text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-slate-100 my-2 pt-2">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                                >
                                    <User size={18} className="inline mr-2" />
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-4 py-3 rounded-xl text-base font-semibold text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={18} className="inline mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content with Premium Spacing */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;
