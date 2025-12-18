import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { Plus, Edit2, Trash2, Eye, EyeOff, Database } from 'lucide-react';
import { seedResources } from '../../data/seedResources';

const ManageResources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const initialFormState = {
        title: '',
        description: '',
        category: '',
        type: 'article', // article, video, pdf, link
        url: '',
        isVisible: true
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'resources'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResources(data);
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (resource = null) => {
        if (resource) {
            setEditingId(resource.id);
            setFormData(resource);
        } else {
            setEditingId(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                await updateDoc(doc(db, 'resources', editingId), formData);
            } else {
                await addDoc(collection(db, 'resources'), formData);
            }
            setIsModalOpen(false);
            fetchResources();
        } catch (error) {
            console.error("Error saving resource:", error);
            alert("Failed to save.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resource?")) return;
        try {
            await deleteDoc(doc(db, 'resources', id));
            fetchResources();
        } catch (error) {
            console.error("Error deleting resource:", error);
        }
    };

    const handleSeed = async () => {
        if (!window.confirm("This will add 10 sample resources to the database. Continue?")) return;
        setLoading(true);
        try {
            for (const resource of seedResources) {
                await addDoc(collection(db, 'resources'), {
                    ...resource,
                    createdAt: new Date().toISOString()
                });
            }
            alert("Resources added successfully!");
            fetchResources();
        } catch (error) {
            console.error("Error seeding resources:", error);
            alert("Failed to seed resources.");
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = async (resource) => {
        try {
            await updateDoc(doc(db, 'resources', resource.id), {
                isVisible: !resource.isVisible
            });
            // Optimistic update
            setResources(resources.map(r =>
                r.id === resource.id ? { ...r, isVisible: !r.isVisible } : r
            ));
        } catch (error) {
            console.error("Error updating visibility:", error);
        }
    };

    return (
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold gradient-text-warm">Manage Resources</h1>
                    <p className="text-slate-600 mt-2 text-lg">Curate mental health resources for clients</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleSeed} variant="secondary" className="shadow-md hover:shadow-lg">
                        <Database size={20} className="mr-2" />
                        Seed Data
                    </Button>
                    <Button onClick={() => handleOpenModal()} variant="gradient" className="shadow-lg hover:shadow-xl">
                        <Plus size={20} className="mr-2" />
                        Add Resource
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-purple-900 uppercase tracking-wider">Visible</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-purple-900 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {resources.map((r) => (
                                <tr key={r.id} className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-pink-50/30 transition-all duration-200 group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-slate-900">{r.title}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-xs">{r.url}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 uppercase shadow-sm">
                                            {r.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-600 font-medium">{r.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => toggleVisibility(r)}
                                            className={`p-2 rounded-lg transition-all hover:scale-110 ${r.isVisible
                                                    ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                                                    : 'text-slate-400 bg-slate-50 hover:bg-slate-100'
                                                }`}
                                        >
                                            {r.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(r)}
                                                className="p-2 text-indigo-600 hover:text-white bg-indigo-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-lg transition-all hover:scale-110 shadow-sm"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(r.id)}
                                                className="p-2 text-red-600 hover:text-white bg-red-50 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 rounded-lg transition-all hover:scale-110 shadow-sm"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {resources.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                                        <p>No resources found.</p>
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
                title={editingId ? "Edit Resource" : "Add New Resource"}
                gradientHeader={true}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                        <textarea
                            className="block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                            <select
                                className="block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="article">Article</option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                                <option value="link">Link</option>
                            </select>
                        </div>
                        <Input
                            label="Category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            placeholder="e.g. Meditation"
                        />
                    </div>

                    <Input
                        label="URL"
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        required
                        placeholder="https://..."
                    />

                    <div className="flex items-center">
                        <input
                            id="isVisible"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                            checked={formData.isVisible}
                            onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                        />
                        <label htmlFor="isVisible" className="ml-2 block text-sm text-slate-900">
                            Visible to clients
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={loading}>Save Resource</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageResources;
