import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import { Users, Calendar, BookOpen, Clock, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCounsellors: 0,
        totalBookings: 0,
        pendingBookings: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch counts (not efficient for large scale, but fine for MVP)
            const usersSnap = await getDocs(collection(db, 'users'));
            const counsellorsSnap = await getDocs(collection(db, 'counsellors'));
            const bookingsSnap = await getDocs(collection(db, 'bookings'));

            const pendingBookingsCount = bookingsSnap.docs.filter(doc => doc.data().status === 'pending').length;

            setStats({
                totalUsers: usersSnap.size,
                totalCounsellors: counsellorsSnap.size,
                totalBookings: bookingsSnap.size,
                pendingBookings: pendingBookingsCount
            });

            // Fetch recent bookings
            const recentBookingsQuery = query(
                collection(db, 'bookings'),
                orderBy('createdAt', 'desc'),
                limit(5)
            );
            const recentBookingsSnap = await getDocs(recentBookingsQuery);
            setRecentBookings(recentBookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        } catch (error) {
            console.error("Error fetching admin dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
        <Card className="border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{loading ? '-' : value}</h3>
                    {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
                </div>
                <div className={`p-3 rounded-full opacity-10`} style={{ backgroundColor: color }}>
                    <Icon size={24} style={{ color: color }} />
                </div>
            </div>
        </Card>
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-500 mt-1">Overview of platform activity and performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="#6366f1" // Indigo
                />
                <StatCard
                    title="Counsellors"
                    value={stats.totalCounsellors}
                    icon={Users}
                    color="#ec4899" // Pink
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    icon={Calendar}
                    color="#8b5cf6" // Purple
                />
                <StatCard
                    title="Pending Requests"
                    value={stats.pendingBookings}
                    icon={Clock}
                    color="#f59e0b" // Amber
                    subtext="Requires attention"
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Recent Bookings">
                    {loading ? (
                        <div className="py-8 text-center text-slate-500">Loading...</div>
                    ) : recentBookings.length === 0 ? (
                        <div className="py-8 text-center text-slate-500">No recent bookings found.</div>
                    ) : (
                        <div className="space-y-4">
                            {recentBookings.map(booking => (
                                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                            {booking.userName?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{booking.userName}</p>
                                            <p className="text-xs text-slate-500">with {booking.counsellorName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {booking.status}
                                        </span>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                <Card title="Platform Health">
                    <div className="flex items-center justify-center h-64 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <div className="text-center">
                            <TrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Analytics Chart Placeholder</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
