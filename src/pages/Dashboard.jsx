/**
 * Premium Client Dashboard with Framer Motion
 * Grid layout with interactive widgets and staggered animations
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    MessageCircle,
    Heart,
    BookOpen,
    Activity,
    Video,
    ArrowRight,
    Sun,
    TrendingUp,
    Plus,
} from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { useAuth } from '../hooks';
import { useBookings, useMoodLogs } from '../hooks/useData';
import { mockCounsellors } from '../utils/mockData';
import { format } from 'date-fns';

export const Dashboard = () => {
    const { user } = useAuth();
    const { bookings } = useBookings(user?.id);
    const { moodLogs } = useMoodLogs(user?.id);

    // Get next upcoming session
    const upcomingBookings = bookings
        .filter((b) => b.status === 'confirmed' && new Date(b.dateTime) > new Date())
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    const nextSession = upcomingBookings[0];

    // Get recent mood average
    const recentMoods = moodLogs.slice(0, 7);
    const avgMood =
        recentMoods.length > 0
            ? (recentMoods.reduce((sum, log) => sum + log.moodScore, 0) / recentMoods.length).toFixed(1)
            : 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const quickActions = [
        { icon: Calendar, label: 'Book Session', to: '/counsellors', color: 'bg-blue-100 text-blue-600' },
        { icon: Heart, label: 'Log Mood', to: '/mood-tracker', color: 'bg-pink-100 text-pink-600' },
        { icon: BookOpen, label: 'Journal', to: '/journal', color: 'bg-purple-100 text-purple-600' },
        { icon: Activity, label: 'Exercises', to: '/exercises', color: 'bg-green-100 text-green-600' },
    ];

    return (
        <DashboardLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Welcome Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Good morning, {user?.name?.split(' ')[0]} <span className="inline-block animate-wave">👋</span>
                        </h1>
                        <p className="text-gray-600 text-lg">Ready to focus on your wellbeing today?</p>
                    </div>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-gray-200/50"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-md">
                            <Sun className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Streak</p>
                            <p className="text-xl font-bold text-gray-900">5 Days 🔥</p>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column (Left 2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Next Session Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -4, scale: 1.01 }}
                            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-[2px] text-white shadow-2xl"
                        >
                            <div className="bg-white/10 backdrop-blur-xl rounded-[22px] p-8 h-full border border-white/20">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <Video className="w-5 h-5" /> Next Session
                                    </h2>
                                    {nextSession && (
                                        <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                                            Confirmed
                                        </span>
                                    )}
                                </div>

                                {nextSession ? (
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <img
                                            src={mockCounsellors.find((c) => c.id === nextSession.counsellorId)?.avatar}
                                            alt="Counsellor"
                                            className="w-20 h-20 rounded-full border-4 border-white/30"
                                        />
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-2xl font-bold">
                                                {mockCounsellors.find((c) => c.id === nextSession.counsellorId)?.name}
                                            </h3>
                                            <p className="opacity-90 mt-1">
                                                {format(new Date(nextSession.dateTime), 'EEEE, MMMM d, yyyy • h:mm a')}
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-primary-600 font-bold shadow-lg"
                                        >
                                            Join Session
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-lg mb-4 opacity-90">No upcoming sessions scheduled.</p>
                                        <Link to="/counsellors">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 rounded-xl bg-white text-primary-600 font-bold shadow-lg"
                                            >
                                                Book a Session
                                            </motion.button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Quick Actions Grid */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {quickActions.map((action) => (
                                <Link key={action.to} to={action.to}>
                                    <motion.div
                                        whileHover={{ y: -6, scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 flex flex-col items-center justify-center gap-4 h-full hover:shadow-xl hover:border-indigo-300 transition-all group"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                                            <action.icon className="w-7 h-7" />
                                        </div>
                                        <span className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{action.label}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>

                        {/* Recent Activity / Stats */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Mood Snapshot */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-pink-500" /> Mood Snapshot
                                    </h3>
                                    <Link to="/mood-tracker" className="text-sm text-primary-600 hover:underline">
                                        View History
                                    </Link>
                                </div>

                                <div className="flex items-end gap-2 h-32 mb-4">
                                    {recentMoods.length > 0 ? (
                                        recentMoods.slice(0, 7).map((log, i) => (
                                            <motion.div
                                                key={log.id}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${log.moodScore * 10}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                                className="flex-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg relative group"
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {log.moodScore}/10
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                            No mood data yet
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>7 days ago</span>
                                    <span>Today</span>
                                </div>
                            </motion.div>

                            {/* Recent Chats */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-blue-500" /> Recent Chats
                                    </h3>
                                    <Link to="/chat" className="text-sm text-primary-600 hover:underline">
                                        View All
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                            <div className="relative">
                                                <img
                                                    src={mockCounsellors[i]?.avatar}
                                                    alt="Avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-gray-900 truncate">
                                                    {mockCounsellors[i]?.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    How are you feeling today?
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400">2h</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Sidebar Column (Right 1/3) */}
                    <div className="space-y-8">
                        {/* Daily Quote / Inspiration */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-3xl border border-indigo-200/50 shadow-lg relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                    <SparklesIcon className="w-6 h-6 text-indigo-600" /> Daily Inspiration
                                </h3>
                                <blockquote className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                                    "The only journey is the one within."
                                </blockquote>
                                <p className="text-sm text-gray-600 font-semibold">- Rainer Maria Rilke</p>
                            </div>
                        </motion.div>

                        {/* Quick Exercises */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
                        >
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-500" /> Quick Exercises
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'Breathing', time: '2 min', color: 'bg-blue-50 text-blue-600' },
                                    { title: 'Grounding', time: '5 min', color: 'bg-green-50 text-green-600' },
                                    { title: 'Reflection', time: '10 min', color: 'bg-orange-50 text-orange-600' },
                                ].map((ex, i) => (
                                    <Link key={i} to="/exercises">
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${ex.color} flex items-center justify-center text-xs font-bold`}>
                                                    {ex.title[0]}
                                                </div>
                                                <span className="font-medium text-gray-700">{ex.title}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">{ex.time}</span>
                                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-600 transition-colors" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

// Helper Icon
const SparklesIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);
