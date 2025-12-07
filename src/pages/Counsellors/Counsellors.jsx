import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { Star, Clock, Globe, DollarSign, Search, Filter } from 'lucide-react';

const Counsellors = () => {
    const { user } = useAuth();
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        specialization: '',
        language: ''
    });

    // Booking Modal State
    const [selectedCounsellor, setSelectedCounsellor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        fetchCounsellors();
    }, []);

    const fetchCounsellors = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'counsellors'));
            const counsellorsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCounsellors(counsellorsData);
        } catch (error) {
            console.error("Error fetching counsellors:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (counsellor) => {
        setSelectedCounsellor(counsellor);
        setSelectedSlot(null);
        setBookingSuccess(false);
        setIsModalOpen(true);
    };

    const handleConfirmBooking = async () => {
        if (!selectedSlot || !selectedCounsellor) return;

        try {
            setBookingLoading(true);
            await addDoc(collection(db, 'bookings'), {
                userId: user.uid,
                userName: user.name, // Storing name for easier admin view
                counsellorId: selectedCounsellor.id,
                counsellorName: selectedCounsellor.name,
                slot: selectedSlot,
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            setBookingSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setBookingSuccess(false);
            }, 2000);
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to book session. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    const filteredCounsellors = counsellors.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            c.specialization.toLowerCase().includes(filters.search.toLowerCase());
        // Add more filters if needed
        return matchesSearch;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Find a Counsellor</h1>
                    <p className="text-slate-500 mt-1">Connect with professional support tailored to you.</p>
                </div>

                {/* Search/Filter Bar */}
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-slate-500">Loading counsellors...</p>
                </div>
            ) : filteredCounsellors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <p className="text-slate-500">No counsellors found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCounsellors.map(counsellor => (
                        <Card key={counsellor.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                        {counsellor.photoUrl ? (
                                            <img src={counsellor.photoUrl} alt={counsellor.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xl">
                                                {counsellor.name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{counsellor.name}</h3>
                                        <p className="text-sm text-indigo-600 font-medium">{counsellor.specialization}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-bold text-yellow-700">{counsellor.rating || 'New'}</span>
                                </div>
                            </div>

                            <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{counsellor.bio}</p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock size={16} />
                                    <span>{counsellor.experienceYears} years experience</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Globe size={16} />
                                    <span>{counsellor.languages?.join(', ')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <DollarSign size={16} />
                                    <span>${counsellor.fee}/session</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => handleBookClick(counsellor)}
                                className="w-full mt-auto"
                            >
                                View Availability
                            </Button>
                        </Card>
                    ))}
                </div>
            )}

            {/* Booking Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={bookingSuccess ? "Booking Confirmed!" : `Book a session with ${selectedCounsellor?.name}`}
            >
                {bookingSuccess ? (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Session Booked!</h3>
                        <p className="text-slate-500 mb-6">Your request has been sent. You can view it in "My Bookings".</p>
                        <Button onClick={() => setIsModalOpen(false)} className="w-full">Close</Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-3">Select a time slot</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {selectedCounsellor?.availability?.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`p-3 rounded-xl border text-sm transition-all ${selectedSlot === slot
                                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium ring-1 ring-indigo-600'
                                                : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'
                                            }`}
                                    >
                                        <div className="font-semibold">{slot.day}</div>
                                        <div>{slot.from} - {slot.to}</div>
                                    </button>
                                ))}
                            </div>
                            {(!selectedCounsellor?.availability || selectedCounsellor.availability.length === 0) && (
                                <p className="text-slate-500 text-sm italic">No slots available currently.</p>
                            )}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Session Fee</span>
                                <span className="font-medium text-slate-900">${selectedCounsellor?.fee}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Platform Fee</span>
                                <span className="font-medium text-slate-900">$2.00</span>
                            </div>
                            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                                <span>Total</span>
                                <span>${(Number(selectedCounsellor?.fee || 0) + 2).toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleConfirmBooking}
                            disabled={!selectedSlot || bookingLoading}
                            isLoading={bookingLoading}
                            className="w-full"
                        >
                            Confirm Booking
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Counsellors;
