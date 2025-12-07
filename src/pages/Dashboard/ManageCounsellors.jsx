import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const ManageCounsellors = () => {
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const initialFormState = {
        name: '',
        specialization: '',
        experienceYears: '',
        fee: '',
        bio: '',
        languages: '', // comma separated for input
        availability: [] // array of {day, from, to}
    };
    const [formData, setFormData] = useState(initialFormState);

    // Slot state for adding new slots
    const [newSlot, setNewSlot] = useState({ day: 'Monday', from: '09:00', to: '10:00' });

    useEffect(() => {
        fetchCounsellors();
    }, []);

    const fetchCounsellors = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'counsellors'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCounsellors(data);
        } catch (error) {
            console.error("Error fetching counsellors:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (counsellor = null) => {
        if (counsellor) {
            setEditingId(counsellor.id);
            setFormData({
                ...counsellor,
                languages: Array.isArray(counsellor.languages) ? counsellor.languages.join(', ') : counsellor.languages
            });
        } else {
            setEditingId(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSave = {
            ...formData,
            languages: formData.languages.split(',').map(l => l.trim()).filter(l => l),
            experienceYears: Number(formData.experienceYears),
            fee: Number(formData.fee),
            rating: formData.rating || 5.0 // Default rating
        };

        try {
            if (editingId) {
                await updateDoc(doc(db, 'counsellors', editingId), dataToSave);
            } else {
                await addDoc(collection(db, 'counsellors'), {
                    ...dataToSave,
                    photoUrl: '' // Placeholder
                });
            }
            setIsModalOpen(false);
            fetchCounsellors();
        } catch (error) {
            console.error("Error saving counsellor:", error);
            alert("Failed to save.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this counsellor?")) return;
        try {
            await deleteDoc(doc(db, 'counsellors', id));
            fetchCounsellors();
        } catch (error) {
            console.error("Error deleting counsellor:", error);
        }
    };

    const addSlot = () => {
        setFormData({
            ...formData,
            availability: [...(formData.availability || []), newSlot]
        });
    };

    const removeSlot = (index) => {
        const newSlots = [...formData.availability];
        newSlots.splice(index, 1);
        setFormData({ ...formData, availability: newSlots });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Manage Counsellors</h1>
                <Button onClick={() => handleOpenModal()}>
                    <Plus size={20} className="mr-2" />
                    Add Counsellor
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Specialization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fee</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {counsellors.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">{c.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-500">{c.specialization}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-500">${c.fee}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleOpenModal(c)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {counsellors.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                                        No counsellors found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Counsellor" : "Add New Counsellor"}
                maxWidth="max-w-2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Specialization"
                            value={formData.specialization}
                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                            required
                            placeholder="e.g. Anxiety, Depression"
                        />
                        <Input
                            label="Experience (Years)"
                            type="number"
                            value={formData.experienceYears}
                            onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                            required
                        />
                        <Input
                            label="Fee per Session ($)"
                            type="number"
                            value={formData.fee}
                            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Languages (comma separated)"
                        value={formData.languages}
                        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                        placeholder="English, Spanish, French"
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                        <textarea
                            className="block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="3"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Availability Slots */}
                    <div className="bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-sm font-medium text-slate-700 mb-3">Availability Slots</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.availability?.map((slot, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-sm shadow-sm">
                                    <span className="font-medium text-indigo-600">{slot.day}</span>
                                    <span className="text-slate-500">{slot.from}-{slot.to}</span>
                                    <button type="button" onClick={() => removeSlot(index)} className="text-slate-400 hover:text-red-500">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 items-end">
                            <div className="w-32">
                                <label className="text-xs text-slate-500 mb-1 block">Day</label>
                                <select
                                    className="w-full rounded-lg border-slate-200 text-sm py-2"
                                    value={newSlot.day}
                                    onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-24">
                                <label className="text-xs text-slate-500 mb-1 block">From</label>
                                <input
                                    type="time"
                                    className="w-full rounded-lg border-slate-200 text-sm py-2"
                                    value={newSlot.from}
                                    onChange={(e) => setNewSlot({ ...newSlot, from: e.target.value })}
                                />
                            </div>
                            <div className="w-24">
                                <label className="text-xs text-slate-500 mb-1 block">To</label>
                                <input
                                    type="time"
                                    className="w-full rounded-lg border-slate-200 text-sm py-2"
                                    value={newSlot.to}
                                    onChange={(e) => setNewSlot({ ...newSlot, to: e.target.value })}
                                />
                            </div>
                            <Button type="button" variant="secondary" onClick={addSlot} className="py-2 px-3">Add</Button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={loading}>Save Counsellor</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageCounsellors;
