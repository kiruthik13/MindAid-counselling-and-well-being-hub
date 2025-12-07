/**
 * Premium Bookings Page
 * Tabbed interface for upcoming, past, and cancelled sessions
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, MoreVertical, X, Check } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { Card, Button, EmptyState } from '../components/common';
import { useAuth } from '../hooks';
import { useBookings } from '../hooks/useData';
import { mockCounsellors } from '../utils/mockData';
import { format } from 'date-fns';

export const Bookings = () => {
    const { user } = useAuth();
    const { bookings } = useBookings(user?.id);
    const [activeTab, setActiveTab] = useState('upcoming');

    const filterBookings = (status) => {
        if (status === 'upcoming') {
            return bookings.filter(
                (b) => b.status === 'confirmed' && new Date(b.dateTime) > new Date()
            );
        }
        if (status === 'past') {
            return bookings.filter(
                (b) => b.status === 'completed' || (b.status === 'confirmed' && new Date(b.dateTime) <= new Date())
            );
        }
        return bookings.filter((b) => b.status === 'cancelled');
    };

    const currentBookings = filterBookings(activeTab);

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            My Sessions
                        </h1>
                        <p className="text-gray-600 text-lg">Manage your upcoming and past counselling sessions</p>
                    </div>
                    <Button className="shadow-lg hover:shadow-xl">
                        <Calendar className="w-4 h-4 mr-2" /> Book New Session
                    </Button>
                </div>

                {/* Tabs */}
                <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl inline-flex mb-10 border border-gray-200/50 shadow-lg">
                    {['upcoming', 'past', 'cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {currentBookings.length > 0 ? (
                            currentBookings.map((booking) => {
                                const counsellor = mockCounsellors.find((c) => c.id === booking.counsellorId);
                                return (
                                    <motion.div
                                        key={booking.id}
                                        layout
                                        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-indigo-300 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            {/* Date Box */}
                                            <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary-50 rounded-2xl text-primary-700">
                                                <span className="text-xs font-bold uppercase">
                                                    {format(new Date(booking.dateTime), 'MMM')}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {format(new Date(booking.dateTime), 'd')}
                                                </span>
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 text-center md:text-left">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                    Session with {counsellor?.name}
                                                </h3>
                                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{format(new Date(booking.dateTime), 'h:mm a')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {booking.mode === 'video' ? (
                                                            <Video className="w-4 h-4" />
                                                        ) : (
                                                            <MapPin className="w-4 h-4" />
                                                        )}
                                                        <span className="capitalize">{booking.mode} Call</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3 w-full md:w-auto">
                                                {activeTab === 'upcoming' && (
                                                    <>
                                                        <Button variant="outline" className="flex-1 md:flex-none">
                                                            Reschedule
                                                        </Button>
                                                        <Button className="flex-1 md:flex-none shadow-lg shadow-primary-500/20">
                                                            Join
                                                        </Button>
                                                    </>
                                                )}
                                                {activeTab === 'past' && (
                                                    <Button variant="outline" className="flex-1 md:flex-none">
                                                        View Notes
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <EmptyState
                                icon={Calendar}
                                title={`No ${activeTab} sessions`}
                                description={
                                    activeTab === 'upcoming'
                                        ? "You don't have any upcoming sessions scheduled."
                                        : `You don't have any ${activeTab} sessions.`
                                }
                                action={
                                    activeTab === 'upcoming' && (
                                        <Button onClick={() => window.location.href = '/counsellors'}>
                                            Find a Counsellor
                                        </Button>
                                    )
                                }
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
};
