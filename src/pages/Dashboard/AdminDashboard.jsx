import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import { Users, Calendar, BookOpen, Clock, TrendingUp, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCounsellors: 0,
        totalBookings: 0,
        pendingBookings: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Real-time listeners
        const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
            setStats(prev => ({ ...prev, totalUsers: snap.size }));
        });

        const unsubCounsellors = onSnapshot(collection(db, 'counsellors'), (snap) => {
            setStats(prev => ({ ...prev, totalCounsellors: snap.size }));
        });

        const unsubBookings = onSnapshot(collection(db, 'bookings'), (snap) => {
            const pending = snap.docs.filter(doc => doc.data().status === 'pending').length;
            setStats(prev => ({
                ...prev,
                totalBookings: snap.size,
                pendingBookings: pending
            }));
        });

        // Recent bookings listener
        const recentQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'), limit(5));
        const unsubRecent = onSnapshot(recentQuery, (snap) => {
            setRecentBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        // Analytics data listener - last 7 days booking trends
        const unsubAnalytics = onSnapshot(collection(db, 'bookings'), (snap) => {
            // Get last 7 days
            const last7Days = [];
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                last7Days.push({
                    date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                    bookings: 0
                });
            }

            // Count bookings per day
            snap.docs.forEach(doc => {
                const booking = doc.data();
                if (booking.createdAt) {
                    const bookingDate = new Date(booking.createdAt);
                    const bookingTimestamp = new Date(
                        bookingDate.getFullYear(),
                        bookingDate.getMonth(),
                        bookingDate.getDate()
                    ).getTime();

                    const dayIndex = last7Days.findIndex(day => day.timestamp === bookingTimestamp);
                    if (dayIndex !== -1) {
                        last7Days[dayIndex].bookings++;
                    }
                }
            });

            setAnalyticsData(last7Days);
        });

        return () => {
            unsubUsers();
            unsubCounsellors();
            unsubBookings();
            unsubRecent();
            unsubAnalytics();
        };
    }, []);

    const StatCard = ({ title, value, icon: Icon, gradient, subtext, onClick }) => (
        <div
            onClick={onClick}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}>
                {/* Glassmorphic overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">{title}</p>
                        <h3 className="text-4xl font-bold text-white mt-2 mb-1">
                            {loading ? (
                                <span className="animate-pulse">-</span>
                            ) : (
                                <span className="tabular-nums">{value}</span>
                            )}
                        </h3>
                        {subtext && <p className="text-xs text-white/70 mt-1 font-medium">{subtext}</p>}
                    </div>
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <Icon size={28} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            {/* Premium Header with Gradient */}
            <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                        <Activity size={24} className="animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text-ocean">
                        Admin Dashboard
                    </h1>
                </div>
                <p className="text-slate-600 text-lg flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" />
                    Real-time overview of platform activity
                </p>
                <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
            </div>

            {/* Stats Grid with Premium Cards - Staggered Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    gradient="from-indigo-600 via-indigo-500 to-purple-600"
                    onClick={() => navigate('/admin/users')}
                />
                <StatCard
                    title="Counsellors"
                    value={stats.totalCounsellors}
                    icon={Users}
                    gradient="from-pink-600 via-pink-500 to-rose-600"
                    onClick={() => navigate('/admin/counsellors')}
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    icon={Calendar}
                    gradient="from-purple-600 via-purple-500 to-indigo-600"
                    onClick={() => navigate('/admin/bookings')}
                />
                <StatCard
                    title="Pending Requests"
                    value={stats.pendingBookings}
                    icon={Clock}
                    gradient="from-amber-600 via-orange-500 to-red-600"
                    subtext="Requires attention"
                    onClick={() => navigate('/admin/bookings')}
                />
            </div>

            {/* Recent Activity with Premium Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-[scale-in_0.4s_ease-out]">
                    <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold gradient-text">Recent Bookings</h3>
                                <p className="text-sm text-slate-600 mt-0.5">Latest booking requests</p>
                            </div>
                            <button
                                onClick={() => navigate('/admin/bookings')}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all hover:scale-105"
                            >
                                View All →
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="py-8 text-center text-slate-500">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                                <p className="text-sm">Loading...</p>
                            </div>
                        ) : recentBookings.length === 0 ? (
                            <div className="py-8 text-center text-slate-500">No recent bookings found.</div>
                        ) : (
                            <div className="space-y-3">
                                {recentBookings.map(booking => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group border border-transparent hover:border-indigo-200 cursor-pointer"
                                        onClick={() => navigate('/admin/bookings')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                                {booking.userName?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">{booking.userName}</p>
                                                <p className="text-xs text-slate-500">with {booking.counsellorName}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block text-xs px-3 py-1.5 rounded-full font-semibold capitalize shadow-sm ${booking.status === 'pending'
                                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-yellow-200'
                                                    : booking.status === 'confirmed'
                                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-200'
                                                        : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-slate-200'
                                                }`}>
                                                {booking.status}
                                            </span>
                                            <p className="text-xs text-slate-400 mt-1.5">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Platform Health Analytics Chart */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-[scale-in_0.4s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50">
                        <div>
                            <h3 className="text-lg font-bold gradient-text-warm">Platform Health</h3>
                            <p className="text-sm text-slate-600 mt-0.5">Booking trends over the last 7 days</p>
                        </div>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="flex items-center justify-center h-64 text-slate-400">
                                <div className="text-center">
                                    <TrendingUp size={32} className="mx-auto mb-2 opacity-50 animate-pulse" />
                                    <p>Loading analytics...</p>
                                </div>
                            </div>
                        ) : analyticsData.length === 0 ? (
                            <div className="flex items-center justify-center h-64 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <div className="text-center">
                                    <TrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                                    <p>No data available</p>
                                </div>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={analyticsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#64748b"
                                        style={{ fontSize: '12px', fontWeight: '500' }}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        style={{ fontSize: '12px', fontWeight: '500' }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                            padding: '12px'
                                        }}
                                        labelFormatter={(value, payload) => {
                                            if (payload && payload[0]) {
                                                return payload[0].payload.fullDate;
                                            }
                                            return value;
                                        }}
                                        formatter={(value) => [value, 'Bookings']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="bookings"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fill="url(#colorBookings)"
                                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
