/**
 * Premium Journal Page
 * Personal journal with parchment style and entry management
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Calendar } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { Button } from '../components/common';
import { useAuth } from '../hooks';
import { useJournal } from '../hooks/useData';
import { format } from 'date-fns';

export const Journal = () => {
    const { user } = useAuth();
    const { entries, addEntry, updateEntry, deleteEntry } = useJournal(user?.id);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: '', content: '', tags: '' });

    const handleNewEntry = () => {
        setSelectedEntry(null);
        setEditForm({ title: '', content: '', tags: '' });
        setIsEditing(true);
    };

    const handleEdit = (entry) => {
        setSelectedEntry(entry);
        setEditForm({
            title: entry.title,
            content: entry.content,
            tags: entry.tags.join(', '),
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        const entryData = {
            userId: user.id,
            title: editForm.title,
            content: editForm.content,
            tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
            date: new Date().toISOString(),
        };

        if (selectedEntry) {
            await updateEntry(selectedEntry.id, entryData);
        } else {
            await addEntry(entryData);
        }
        setIsEditing(false);
        setSelectedEntry(null); // Or select the new/updated entry
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            await deleteEntry(id);
            if (selectedEntry?.id === id) {
                setSelectedEntry(null);
                setIsEditing(false);
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-140px)] flex gap-6">
                {/* Sidebar - Entry List */}
                <div className="w-80 flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h2 className="font-bold text-gray-900">My Journal</h2>
                        <button
                            onClick={handleNewEntry}
                            className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {entries.length > 0 ? (
                            entries.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    layout
                                    onClick={() => {
                                        setSelectedEntry(entry);
                                        setIsEditing(false);
                                    }}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedEntry?.id === entry.id
                                            ? 'bg-primary-50 border-primary-200 shadow-sm'
                                            : 'bg-white border-gray-100 hover:border-primary-100 hover:bg-gray-50'
                                        }`}
                                >
                                    <h3 className="font-semibold text-gray-900 truncate mb-1">{entry.title}</h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        {format(new Date(entry.date), 'MMM d, yyyy')}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                No entries yet. Start writing!
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content - Editor/View */}
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden flex flex-col relative">
                    {isEditing ? (
                        <div className="flex-1 flex flex-col p-8 bg-[#fdfbf7]">
                            <div className="flex justify-between items-center mb-6">
                                <input
                                    type="text"
                                    placeholder="Entry Title"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder-gray-400 w-full"
                                />
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
                                        <Save className="w-4 h-4 mr-2" /> Save
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                placeholder="Start writing..."
                                value={editForm.content}
                                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                className="flex-1 w-full bg-transparent border-none focus:ring-0 resize-none text-lg leading-relaxed text-gray-800 placeholder-gray-300 font-serif"
                            />

                            <div className="mt-4 pt-4 border-t border-gray-200/50">
                                <input
                                    type="text"
                                    placeholder="Tags (comma separated)"
                                    value={editForm.tags}
                                    onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-600 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    ) : selectedEntry ? (
                        <div className="flex-1 flex flex-col p-8 bg-[#fdfbf7] overflow-y-auto">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedEntry.title}</h1>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        {format(new Date(selectedEntry.date), 'EEEE, MMMM d, yyyy • h:mm a')}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(selectedEntry)}
                                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedEntry.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {selectedEntry.content}
                            </div>

                            {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-wrap gap-2">
                                    {selectedEntry.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Edit2 className="w-10 h-10 text-gray-300" />
                            </div>
                            <p className="text-lg font-medium">Select an entry or create a new one</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};
