/**
 * Data Hooks for MindAid Platform
 * These hooks provide data fetching and mutation operations
 */

import { useState, useEffect } from 'react';
import * as db from '../services/db';

// ==================== COUNSELLORS ====================

export const useCounsellors = (filters = {}) => {
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounsellors = async () => {
            try {
                setLoading(true);
                const data = await db.getCounsellors(filters);
                setCounsellors(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCounsellors();
    }, [JSON.stringify(filters)]);

    return { counsellors, loading, error };
};

export const useCounsellor = (id) => {
    const [counsellor, setCounsellor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounsellor = async () => {
            try {
                setLoading(true);
                const data = await db.getCounsellorById(id);
                setCounsellor(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCounsellor();
        }
    }, [id]);

    return { counsellor, loading, error };
};

// ==================== BOOKINGS ====================

export const useBookings = (userId, role = 'client') => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await db.getBookings(userId, role);
            setBookings(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchBookings();
        }
    }, [userId, role]);

    const createBooking = async (bookingData) => {
        try {
            const newBooking = await db.createBooking(bookingData);
            setBookings(prev => [...prev, newBooking]);
            return newBooking;
        } catch (err) {
            throw err;
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            const updated = await db.cancelBooking(bookingId);
            setBookings(prev =>
                prev.map(b => (b.id === bookingId ? updated : b))
            );
            return updated;
        } catch (err) {
            throw err;
        }
    };

    return { bookings, loading, error, createBooking, cancelBooking, refetch: fetchBookings };
};

// ==================== CHAT ====================

export const useChat = (userId, role = 'client') => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                setLoading(true);
                const data = await db.getChatThreads(userId, role);
                setThreads(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchThreads();
        }
    }, [userId, role]);

    return { threads, loading, error };
};

export const useMessages = (threadId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await db.getMessages(threadId);
            setMessages(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (threadId) {
            fetchMessages();
        }
    }, [threadId]);

    const sendMessage = async (content, senderId, senderRole) => {
        try {
            const newMessage = await db.sendMessage({
                threadId,
                senderId,
                senderRole,
                content,
            });
            setMessages(prev => [...prev, newMessage]);
            return newMessage;
        } catch (err) {
            throw err;
        }
    };

    return { messages, loading, error, sendMessage, refetch: fetchMessages };
};

// ==================== MOOD TRACKER ====================

export const useMoodLogs = (userId) => {
    const [moodLogs, setMoodLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMoodLogs = async () => {
        try {
            setLoading(true);
            const data = await db.getMoodLogs(userId);
            setMoodLogs(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchMoodLogs();
        }
    }, [userId]);

    const logMood = async (moodData) => {
        try {
            const newLog = await db.createMoodLog({ ...moodData, userId });
            setMoodLogs(prev => [newLog, ...prev]);
            return newLog;
        } catch (err) {
            throw err;
        }
    };

    return { moodLogs, loading, error, logMood, refetch: fetchMoodLogs };
};

// ==================== JOURNAL ====================

export const useJournal = (userId) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const data = await db.getJournalEntries(userId);
            setEntries(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchEntries();
        }
    }, [userId]);

    const createEntry = async (entryData) => {
        try {
            const newEntry = await db.createJournalEntry({ ...entryData, userId });
            setEntries(prev => [newEntry, ...prev]);
            return newEntry;
        } catch (err) {
            throw err;
        }
    };

    const updateEntry = async (entryId, updates) => {
        try {
            const updated = await db.updateJournalEntry(entryId, updates);
            setEntries(prev =>
                prev.map(e => (e.id === entryId ? updated : e))
            );
            return updated;
        } catch (err) {
            throw err;
        }
    };

    const deleteEntry = async (entryId) => {
        try {
            await db.deleteJournalEntry(entryId);
            setEntries(prev => prev.filter(e => e.id !== entryId));
        } catch (err) {
            throw err;
        }
    };

    return { entries, loading, error, createEntry, updateEntry, deleteEntry, refetch: fetchEntries };
};

// ==================== EXERCISES ====================

export const useExercises = (category = null) => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                setLoading(true);
                const data = await db.getExercises(category);
                setExercises(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [category]);

    return { exercises, loading, error };
};

// ==================== RESOURCES ====================

export const useResources = (filters = {}) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const data = await db.getResources(filters);
                setResources(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [JSON.stringify(filters)]);

    return { resources, loading, error };
};
