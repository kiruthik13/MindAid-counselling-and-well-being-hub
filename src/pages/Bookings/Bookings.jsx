import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';

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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
                <p className="text-slate-500 mt-1">Manage your sessions and view history.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'upcoming'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'past'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Past
                </button>
                <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'cancelled'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Cancelled
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-slate-500">No {activeTab} bookings found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredBookings.map(booking => (
                        <Card key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 hidden md:block">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-slate-900">{booking.counsellorName}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{booking.slot?.day}, {booking.slot?.from} - {booking.slot?.to}</span>
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
