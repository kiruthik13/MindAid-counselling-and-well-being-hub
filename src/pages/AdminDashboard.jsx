/**
 * Premium Admin Dashboard
 * Overview of platform statistics and management
 */

import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { Card } from '../components/common';

export const AdminDashboard = () => {
    const stats = [
        { label: 'Total Users', value: '12,345', change: '+12%', icon: Users, color: 'bg-blue-500' },
        { label: 'Active Sessions', value: '432', change: '+5%', icon: Activity, color: 'bg-green-500' },
        { label: 'Total Revenue', value: '$45,678', change: '+8%', icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Bookings Today', value: '156', change: '+15%', icon: Calendar, color: 'bg-orange-500' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Admin Overview
                    </h1>
                    <p className="text-gray-600 text-lg">Monitor platform activity and statistics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-gray-200/50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm">
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-green-500 font-medium">{stat.change}</span>
                                    <span className="text-gray-400 ml-2">vs last month</span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Activity Table Placeholder */}
                <Card>
                    <h3 className="text-lg font-bold mb-6">Recent Platform Activity</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="pb-3 font-semibold text-gray-500 text-sm">User</th>
                                    <th className="pb-3 font-semibold text-gray-500 text-sm">Action</th>
                                    <th className="pb-3 font-semibold text-gray-500 text-sm">Date</th>
                                    <th className="pb-3 font-semibold text-gray-500 text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0">
                                        <td className="py-4 font-medium text-gray-900">User #{1000 + i}</td>
                                        <td className="py-4 text-gray-600">Booked a session</td>
                                        <td className="py-4 text-gray-500">2 mins ago</td>
                                        <td className="py-4">
                                            <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};
