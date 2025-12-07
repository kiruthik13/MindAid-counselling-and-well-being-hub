import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import { LastMoodCard } from '../../components/dashboard/LastMoodCard';
import { Calendar, BookOpen, Users } from 'lucide-react';

const ClientDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        upcomingSessions: 0,
        savedResources: 0,
        moodCheckIn: 'Good' // Placeholder
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;

            try {
                // Fetch upcoming bookings
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('userId', '==', user.uid),
                    where('status', 'in', ['pending', 'confirmed'])
                );
                const bookingsSnapshot = await getDocs(bookingsQuery);

                // Fetch saved resources (assuming we have a way to save them, or just count visible ones for now as placeholder)
                // For now, let's just count total visible resources as "available"
                const resourcesQuery = query(
                    collection(db, 'resources'),
                    where('isVisible', '==', true)
                );
                const resourcesSnapshot = await getDocs(resourcesQuery);

                setStats({
                    upcomingSessions: bookingsSnapshot.size,
                    savedResources: resourcesSnapshot.size,
                    moodCheckIn: 'Good'
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Friend'}!</h1>
                    <p className="text-indigo-100 text-lg max-w-2xl">
                        Your mental well-being journey is important. We're here to support you every step of the way.
                    </p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-indigo-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Upcoming Sessions</p>
                            <h3 className="text-2xl font-bold text-slate-900">{loading ? '-' : stats.upcomingSessions}</h3>
                        </div>
                    </div>
                </Card>


                <LastMoodCard />


                <Card className="border-l-4 border-l-pink-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-pink-50 text-pink-600">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Available Resources</p>
                            <h3 className="text-2xl font-bold text-slate-900">{loading ? '-' : stats.savedResources}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/counsellors" className="group">
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-indigo-100">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Browse Counsellors</h3>
                                <p className="text-slate-500 text-sm">Find the perfect professional to talk to based on your needs.</p>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/resources" className="group">
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-100">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <BookOpen size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">View Resources</h3>
                                <p className="text-slate-500 text-sm">Explore articles, videos, and guides for your well-being.</p>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/bookings" className="group">
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-pink-100">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">My Bookings</h3>
                                <p className="text-slate-500 text-sm">Manage your upcoming sessions and view past history.</p>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
