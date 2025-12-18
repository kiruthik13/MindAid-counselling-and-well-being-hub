import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Smile, Filter, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled
    const [moodModal, setMoodModal] = useState({ isOpen: false, booking: null });
    const [moodForm, setMoodForm] = useState({ label: 'Good', note: '' });

    useEffect(() => {
        const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const bookingsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(bookingsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching bookings:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            await updateDoc(doc(db, 'bookings', bookingId), {
                status: newStatus
            });

            if (newStatus === 'confirmed') {
                toast.success('Booking confirmed successfully!');
            } else if (newStatus === 'cancelled') {
                toast('Booking has been cancelled', {
                    icon: '❌',
                    style: {
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            toast.error('Failed to update booking status. Please try again.');
        }
    };

    const handleMoodUpdate = async () => {
        if (!moodModal.booking) return;
        try {
            await updateDoc(doc(db, 'bookings', moodModal.booking.id), {
                moodLabel: moodForm.label,
                moodNote: moodForm.note,
                moodUpdatedAt: new Date().toISOString(),
                status: 'completed'
            });

            toast.success(`Mood "${moodForm.label}" recorded successfully for ${moodModal.booking.userName}!`);

            setMoodModal({ isOpen: false, booking: null });
            setMoodForm({ label: 'Good', note: '' });
        } catch (error) {
            console.error("Error updating mood:", error);
            toast.error('Failed to record mood. Please try again.');
        }
    };

    const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold gradient-text">All Bookings</h1>
                    <p className="text-slate-600 mt-2 text-lg">Manage all client bookings and sessions.</p>
                </div>

                {/* Premium Filter Pills */}
                <div className="flex bg-white rounded-xl p-1.5 shadow-lg border-2 border-slate-100">
                    {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-lg capitalize transition-all duration-300 ${filter === f
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Total</p>
                    <p className="text-2xl font-bold text-indigo-900 mt-1">{bookings.length}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900 mt-1">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Confirmed</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">{bookings.filter(b => b.status === 'confirmed').length}</p>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Cancelled</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{bookings.filter(b => b.status === 'cancelled').length}</p>
                </div>
            </div>

            <div className="grid gap-4 stagger-children">
                {loading ? (
                    <Card variant="glass" className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                        <p className="text-slate-500">Loading bookings...</p>
                    </Card>
                ) : filteredBookings.length === 0 ? (
                    <Card variant="glass" className="text-center py-12">
                        <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <p className="text-slate-500">No bookings found for this filter.</p>
                    </Card>
                ) : (
                    filteredBookings.map((booking) => (
                        <Card key={booking.id} variant="gradient-border" className="hover:shadow-xl transition-all group">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-slate-900 text-lg">{booking.counsellorName}</h3>
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize shadow-md flex items-center gap-1 ${booking.status === 'pending'
                                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                                                    : booking.status === 'confirmed'
                                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                                        : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white'
                                                }`}>
                                                {booking.status === 'confirmed' && <CheckCircle size={12} />}
                                                {booking.status === 'cancelled' && <XCircle size={12} />}
                                                {booking.status === 'pending' && <Clock size={12} />}
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600">
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                                                <User size={14} className="text-indigo-500" />
                                                <span>Client: <strong>{booking.userName}</strong> ({booking.userEmail})</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                                                <Clock size={14} className="text-purple-500" />
                                                <span className="font-medium">{booking.slot?.day} at {booking.slot?.from} - {booking.slot?.to}</span>
                                            </div>
                                            <div className="text-xs text-slate-400 mt-2">
                                                Booked on {new Date(booking.createdAt).toLocaleString()}
                                            </div>
                                            {booking.moodLabel && (
                                                <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-3 py-1.5 rounded-lg w-fit border border-purple-200">
                                                    <Smile size={14} />
                                                    <span className="font-semibold">Mood: {booking.moodLabel}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center flex-wrap">
                                    {/* Mood button - available for all bookings */}
                                    <button
                                        onClick={() => {
                                            setMoodModal({ isOpen: true, booking });
                                            setMoodForm({ label: booking.moodLabel || 'Good', note: booking.moodNote || '' });
                                        }}
                                        className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all text-sm font-semibold border border-purple-200 hover:scale-105"
                                    >
                                        <Smile size={16} /> {booking.moodLabel ? 'Edit' : 'Record'} Mood
                                    </button>

                                    {/* Status-specific actions */}
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm font-semibold shadow-md hover:scale-105"
                                            >
                                                <CheckCircle size={16} /> Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all text-sm font-semibold shadow-md hover:scale-105"
                                            >
                                                <XCircle size={16} /> Reject
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all text-sm font-semibold hover:scale-105"
                                        >
                                            <XCircle size={16} /> Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Enhanced Mood Modal */}
            <Modal
                isOpen={moodModal.isOpen}
                onClose={() => setMoodModal({ isOpen: false, booking: null })}
                title="Record Session Mood"
                gradientHeader={true}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Mood Label</label>
                        <select
                            value={moodForm.label}
                            onChange={(e) => setMoodForm({ ...moodForm, label: e.target.value })}
                            className="block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Low">Low</option>
                            <option value="Very Low">Very Low</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Counsellor Note</label>
                        <textarea
                            value={moodForm.note}
                            onChange={(e) => setMoodForm({ ...moodForm, note: e.target.value })}
                            rows="4"
                            className="block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Optional notes about the session..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() => setMoodModal({ isOpen: false, booking: null })}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleMoodUpdate}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                            Save Mood
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminBookings;
