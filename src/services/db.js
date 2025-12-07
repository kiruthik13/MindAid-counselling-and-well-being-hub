/**
 * Firebase Firestore Database Service Placeholder
 * Replace these functions with actual Firestore calls when ready
 */

import {
    mockCounsellors,
    mockBookings,
    mockChatThreads,
    mockMessages,
    mockMoodLogs,
    mockJournalEntries,
    mockExercises,
    mockResources,
} from '../utils/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== COUNSELLORS ====================

export const getCounsellors = async (filters = {}) => {
    await delay(800);

    let counsellors = [...mockCounsellors];

    // Apply filters
    if (filters.specialization) {
        counsellors = counsellors.filter(c =>
            c.specializations.includes(filters.specialization)
        );
    }

    if (filters.language) {
        counsellors = counsellors.filter(c =>
            c.languages.includes(filters.language)
        );
    }

    if (filters.maxFee) {
        counsellors = counsellors.filter(c =>
            c.consultationFee <= filters.maxFee
        );
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        counsellors = counsellors.filter(c =>
            c.name.toLowerCase().includes(searchLower) ||
            c.bio.toLowerCase().includes(searchLower)
        );
    }

    return counsellors;
};

export const getCounsellorById = async (id) => {
    await delay(500);
    const counsellor = mockCounsellors.find(c => c.id === id);
    if (!counsellor) throw new Error('Counsellor not found');
    return counsellor;
};

// ==================== BOOKINGS ====================

export const getBookings = async (userId, role = 'client') => {
    await delay(600);

    if (role === 'client') {
        return mockBookings.filter(b => b.clientId === userId);
    } else if (role === 'counsellor') {
        return mockBookings.filter(b => b.counsellorId === userId);
    }

    return [];
};

export const createBooking = async (bookingData) => {
    await delay(1000);

    const newBooking = {
        id: `booking-${Date.now()}`,
        ...bookingData,
        createdAt: new Date(),
    };

    // In real implementation: add to Firestore
    return newBooking;
};

export const updateBooking = async (bookingId, updates) => {
    await delay(800);

    const booking = mockBookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    return { ...booking, ...updates };
};

export const cancelBooking = async (bookingId) => {
    await delay(800);
    return updateBooking(bookingId, { status: 'cancelled' });
};

// ==================== CHAT ====================

export const getChatThreads = async (userId, role = 'client') => {
    await delay(600);

    if (role === 'client') {
        return mockChatThreads.filter(t => t.clientId === userId);
    } else if (role === 'counsellor') {
        return mockChatThreads.filter(t => t.counsellorId === userId);
    }

    return [];
};

export const getMessages = async (threadId) => {
    await delay(500);
    return mockMessages.filter(m => m.threadId === threadId);
};

export const sendMessage = async (messageData) => {
    await delay(600);

    const newMessage = {
        id: `msg-${Date.now()}`,
        ...messageData,
        timestamp: new Date(),
        read: false,
    };

    return newMessage;
};

// ==================== MOOD TRACKER ====================

export const getMoodLogs = async (userId, limit = 30) => {
    await delay(500);
    return mockMoodLogs
        .filter(m => m.userId === userId)
        .slice(0, limit)
        .sort((a, b) => b.date - a.date);
};

export const createMoodLog = async (moodData) => {
    await delay(600);

    const newMoodLog = {
        id: `mood-${Date.now()}`,
        ...moodData,
    };

    return newMoodLog;
};

// ==================== JOURNAL ====================

export const getJournalEntries = async (userId) => {
    await delay(500);
    return mockJournalEntries
        .filter(j => j.userId === userId)
        .sort((a, b) => b.createdAt - a.createdAt);
};

export const createJournalEntry = async (entryData) => {
    await delay(700);

    const newEntry = {
        id: `journal-${Date.now()}`,
        ...entryData,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return newEntry;
};

export const updateJournalEntry = async (entryId, updates) => {
    await delay(700);

    const entry = mockJournalEntries.find(j => j.id === entryId);
    if (!entry) throw new Error('Journal entry not found');

    return {
        ...entry,
        ...updates,
        updatedAt: new Date(),
    };
};

export const deleteJournalEntry = async (entryId) => {
    await delay(600);
    // In real implementation: delete from Firestore
    return { success: true };
};

// ==================== EXERCISES ====================

export const getExercises = async (category = null) => {
    await delay(500);

    if (category) {
        return mockExercises.filter(e => e.category === category);
    }

    return mockExercises;
};

export const getExerciseById = async (id) => {
    await delay(400);
    const exercise = mockExercises.find(e => e.id === id);
    if (!exercise) throw new Error('Exercise not found');
    return exercise;
};

// ==================== RESOURCES ====================

export const getResources = async (filters = {}) => {
    await delay(600);

    let resources = [...mockResources];

    if (filters.category) {
        resources = resources.filter(r => r.category === filters.category);
    }

    if (filters.type) {
        resources = resources.filter(r => r.type === filters.type);
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        resources = resources.filter(r =>
            r.title.toLowerCase().includes(searchLower) ||
            r.description.toLowerCase().includes(searchLower)
        );
    }

    return resources.sort((a, b) => b.publishedAt - a.publishedAt);
};

// Firebase Firestore integration points:
// import { getFirestore, collection, doc, getDoc, getDocs, addDoc,
//          updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
// const db = getFirestore();
