import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Smile } from 'lucide-react';

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
        if (!window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;
        try {
            await updateDoc(doc(db, 'bookings', bookingId), {
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Failed to update status.");
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
            setMoodModal({ isOpen: false, booking: null });
            setMoodForm({ label: 'Good', note: '' });
        } catch (error) {
            console.error("Error updating mood:", error);
            alert("Failed to update mood.");
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
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">All Bookings</h1>
                    <p className="text-slate-500 mt-1">Manage all client bookings.</p>
                </div>

                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                    {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${filter === f
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading bookings...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100">
                        No bookings found for this filter.
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <Card key={booking.id} className="hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full ${getStatusColor(booking.status)} bg-opacity-20`}>
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900">{booking.counsellorName}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <User size={14} />
                                                <span>Client: <strong>{booking.userName}</strong> ({booking.userEmail})</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} />
                                                <span>{booking.slot?.day} at {booking.slot?.from} - {booking.slot?.to}</span>
                                            </div>
                                            <div className="text-xs text-slate-400 mt-2">
                                                Booked on {new Date(booking.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                                            >
                                                <CheckCircle size={16} /> Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                            >
                                                <XCircle size={16} /> Reject
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setMoodModal({ isOpen: true, booking });
                                                    setMoodForm({ label: booking.moodLabel || 'Good', note: booking.moodNote || '' });
                                                }}
                                                className="flex items-center gap-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                                            >
                                                <Smile size={16} /> {booking.moodLabel ? 'Update' : 'Record'} Mood
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                className="flex items-center gap-1 px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                                            >
                                                <XCircle size={16} /> Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Mood Modal */}
            <Modal
                isOpen={moodModal.isOpen}
                onClose={() => setMoodModal({ isOpen: false, booking: null })}
                title="Record Session Mood"
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
