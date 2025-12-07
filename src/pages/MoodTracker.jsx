/**
 * Premium Mood Tracker Page
 * Interactive mood logging and visualization
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Frown, Meh, Heart, Calendar, Plus, ChevronRight } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { Card, Button } from '../components/common';
import { useAuth } from '../hooks';
import { useMoodLogs } from '../hooks/useData';
import { MOOD_OPTIONS, EMOTIONS } from '../utils/constants';
import { format } from 'date-fns';

export const MoodTracker = () => {
    const { user } = useAuth();
    const { moodLogs, addMoodLog } = useMoodLogs(user?.id);
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const [note, setNote] = useState('');
    const [showLogForm, setShowLogForm] = useState(false);

    const handleSave = async () => {
        if (!selectedMood) return;
        await addMoodLog({
            userId: user.id,
            date: new Date().toISOString(),
            moodScore: selectedMood,
            emotions: selectedEmotions,
            note,
        });
        setShowLogForm(false);
        setSelectedMood(null);
        setSelectedEmotions([]);
        setNote('');
    };

    const toggleEmotion = (emotion) => {
        if (selectedEmotions.includes(emotion)) {
            setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion));
        } else {
            setSelectedEmotions([...selectedEmotions, emotion]);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            Mood Tracker
                        </h1>
                        <p className="text-gray-600 text-lg">Track your emotional wellbeing over time</p>
                    </div>
                    <Button onClick={() => setShowLogForm(!showLogForm)} className="shadow-lg hover:shadow-xl">
                        <Plus className="w-4 h-4 mr-2" /> Log Mood
                    </Button>
                </div>

                <AnimatePresence>
                    {showLogForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <Card className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 border-indigo-200/50 shadow-xl">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            How are you feeling today?
                                        </label>
                                        <div className="flex justify-between gap-2">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                                                <motion.button
                                                    key={score}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setSelectedMood(score)}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${selectedMood === score
                                                            ? 'bg-primary-600 text-white shadow-lg'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400'
                                                        }`}
                                                >
                                                    {score}
                                                </motion.button>
                                            ))}
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                                            <span>Very Low</span>
                                            <span>Neutral</span>
                                            <span>Excellent</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            What emotions are you experiencing?
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {EMOTIONS.map((emotion) => (
                                                <motion.button
                                                    key={emotion}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleEmotion(emotion)}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedEmotions.includes(emotion)
                                                            ? 'bg-secondary-100 text-secondary-700 border border-secondary-200'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {emotion}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Add a note (optional)
                                        </label>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                            rows="3"
                                            placeholder="What's on your mind?"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button variant="ghost" onClick={() => setShowLogForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave} disabled={!selectedMood}>
                                            Save Entry
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mood Trend Chart Placeholder */}
                <Card className="shadow-xl border-gray-200/50">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900">Mood Trend (Last 14 Days)</h3>
                    <div className="h-48 flex items-end gap-2 px-4">
                        {moodLogs.slice(0, 14).map((log, i) => (
                            <motion.div
                                key={log.id}
                                initial={{ height: 0 }}
                                animate={{ height: `${log.moodScore * 10}%` }}
                                transition={{ delay: i * 0.05 }}
                                className="flex-1 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t-md relative group min-w-[20px]"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {format(new Date(log.date), 'MMM d')}: {log.moodScore}/10
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-xs text-gray-400">
                        <span>14 days ago</span>
                        <span>Today</span>
                    </div>
                </Card>

                {/* Recent Entries */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Entries</h3>
                    {moodLogs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 flex gap-6 hover:shadow-xl transition-all"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${log.moodScore >= 7
                                        ? 'bg-green-100 text-green-600'
                                        : log.moodScore >= 4
                                            ? 'bg-yellow-100 text-yellow-600'
                                            : 'bg-red-100 text-red-600'
                                    }`}
                            >
                                {log.moodScore}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="font-semibold text-gray-900">
                                        {format(new Date(log.date), 'EEEE, MMMM d, yyyy')}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {format(new Date(log.date), 'h:mm a')}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {log.emotions.map((emotion) => (
                                        <span
                                            key={emotion}
                                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md"
                                        >
                                            {emotion}
                                        </span>
                                    ))}
                                </div>
                                {log.note && <p className="text-sm text-gray-600 italic">"{log.note}"</p>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};
