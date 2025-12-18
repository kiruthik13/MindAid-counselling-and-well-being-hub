import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Calendar, Clock, User, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const Bookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past, cancelled

    useEffect(() => {
        fetchBookings();
    }, [user]);

    const fetchBookings = async () => {
        if (!user) return;
        try {
            const q = query(
                collection(db, 'bookings'),
                where('userId', '==', user.uid)
                // Note: Composite index might be needed for orderBy with where clause in Firebase
                // For now, sorting client-side to avoid index requirement errors during dev
            );
            const querySnapshot = await getDocs(q);
            const bookingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort by date (newest first)
            bookingsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setBookings(bookingsData);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this session?")) return;

        try {
            await updateDoc(doc(db, 'bookings', bookingId), {
                status: 'cancelled'
            });
            // Update local state
            setBookings(bookings.map(b =>
                b.id === bookingId ? { ...b, status: 'cancelled' } : b
            ));
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Failed to cancel booking.");
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === 'cancelled') return booking.status === 'cancelled';

        // Simple logic for upcoming vs past based on status for now, 
        // ideally should compare dates but 'slot' structure is simple object {day, from, to}
        // so we rely on status or createdAt.
        // Let's assume 'completed' is past, 'pending'/'confirmed' is upcoming.

        if (activeTab === 'past') return booking.status === 'completed';
        return booking.status === 'pending' || booking.status === 'confirmed';
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            case 'completed': return 'bg-slate-100 text-slate-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            <div>
                <h1 className="text-4xl font-bold gradient-text">My Bookings</h1>
                <p className="text-slate-600 mt-2 text-lg">Manage your sessions and view history.</p>
            </div>

            {/* Premium Tabs */}
            <div className="flex border-b-2 border-slate-200 relative">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-8 py-4 font-semibold text-sm transition-all relative ${activeTab === 'upcoming'
                        ? 'text-indigo-600'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Upcoming
                    {activeTab === 'upcoming' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-8 py-4 font-semibold text-sm transition-all relative ${activeTab === 'past'
                        ? 'text-indigo-600'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Past
                    {activeTab === 'past' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`px-8 py-4 font-semibold text-sm transition-all relative ${activeTab === 'cancelled'
                        ? 'text-indigo-600'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Cancelled
                    {activeTab === 'cancelled' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    )}
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            ) : filteredBookings.length === 0 ? (
                <Card variant="glass" className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-slate-500">No {activeTab} bookings found.</p>
                </Card>
            ) : (
                <div className="space-y-4 stagger-children">
                    {filteredBookings.map(booking => (
                        <Card key={booking.id} variant="gradient-border" className="flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                            <div className="flex items-start gap-4">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hidden md:block group-hover:scale-110 transition-transform">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-slate-900 text-lg">{booking.counsellorName}</h3>
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-bold capitalize flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                                            {booking.status === 'confirmed' && <CheckCircle2 size={12} />}
                                            {booking.status === 'cancelled' && <XCircle size={12} />}
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                                            <Clock size={14} className="text-indigo-500" />
                                            <span className="font-medium">{booking.slot?.day}, {booking.slot?.from} - {booking.slot?.to}</span>
                                        </div>
                                        {/* <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>Online Session</span>
                    </div> */}
                                    </div>
                                </div>
                            </div>

                            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 focus:ring-red-500"
                                        onClick={() => handleCancelBooking(booking.id)}
                                    >
                                        Cancel
                                    </Button>
                                    {/* <Button>Join Session</Button> */}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;
