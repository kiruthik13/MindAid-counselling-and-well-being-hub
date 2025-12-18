import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import { LastMoodCard } from '../../components/dashboard/LastMoodCard';
import { Calendar, BookOpen, Users, Sparkles, TrendingUp, Heart } from 'lucide-react';

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
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            {/* Premium Welcome Banner with Animated Gradient */}
            <div className="relative overflow-hidden rounded-3xl gradient-bg-animated p-8 md:p-12 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        <span className="text-sm font-medium uppercase tracking-wider opacity-90">Welcome Back</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-[fade-in-up_0.6s_ease-out]">
                        Hello, {user?.name?.split(' ')[0] || 'Friend'}! 👋
                    </h1>
                    <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
                        Your mental well-being journey is important. We're here to support you every step of the way.
                    </p>
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl floating"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl floating" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl floating" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Premium Stats Cards with Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
                <Card variant="glass" className="border-l-4 border-l-indigo-500 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transform transition-transform hover:scale-110 hover:rotate-3">
                            <Calendar size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 font-medium mb-1">Upcoming Sessions</p>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {loading ? '-' : stats.upcomingSessions}
                            </h3>
                        </div>
                    </div>
                </Card>

                <LastMoodCard />

                <Card variant="glass" className="border-l-4 border-l-pink-500 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg transform transition-transform hover:scale-110 hover:rotate-3">
                            <BookOpen size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 font-medium mb-1">Available Resources</p>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                {loading ? '-' : stats.savedResources}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Premium Quick Actions */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold gradient-text">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
                    <Link to="/counsellors" className="group">
                        <Card hover={true} className="h-full border-2 border-transparent hover:border-indigo-200 transition-all duration-300 shimmer">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Users size={36} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                    Browse Counsellors
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Find the perfect professional to talk to based on your needs.
                                </p>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/resources" className="group">
                        <Card hover={true} className="h-full border-2 border-transparent hover:border-purple-200 transition-all duration-300 shimmer">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <BookOpen size={36} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                                    View Resources
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Explore articles, videos, and guides for your well-being.
                                </p>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/bookings" className="group">
                        <Card hover={true} className="h-full border-2 border-transparent hover:border-pink-200 transition-all duration-300 shimmer">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Calendar size={36} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    My Bookings
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Manage your upcoming sessions and view past history.
                                </p>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Motivational Banner */}
            <Card variant="glass" className="relative overflow-hidden">
                <div className="flex items-center gap-4 p-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        <Heart size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Take care of your mental health</h3>
                        <p className="text-sm text-slate-600">
                            Remember: It's okay to not be okay. Seeking help is a sign of strength.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ClientDashboard;

