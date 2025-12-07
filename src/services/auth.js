/**
 * Firebase Authentication Service Placeholder
 * Replace these functions with actual Firebase Auth calls when ready
 */

import { mockCurrentUser, mockClients, mockCounsellors, mockAdmin } from '../utils/mockData';
import { USER_ROLES } from '../utils/constants';

/**
 * Simulates a delay for async operations
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock login function
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} User object
 */
export const login = async (email, password) => {
    await delay(1000); // Simulate network delay

    // Find user in mock data
    const allUsers = [...mockClients, ...mockCounsellors, mockAdmin];
    const user = allUsers.find(u => u.email === email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // In real implementation, Firebase Auth will handle password verification
    return user;
};

/**
 * Mock signup function
 * @param {Object} userData 
 * @returns {Promise<Object>} New user object
 */
export const signup = async (userData) => {
    await delay(1000);

    // Check if email already exists
    const allUsers = [...mockClients, ...mockCounsellors, mockAdmin];
    const existingUser = allUsers.find(u => u.email === userData.email);

    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Create new user object
    const newUser = {
        id: `${userData.role}-${Date.now()}`,
        ...userData,
        createdAt: new Date(),
    };

    // In real implementation:
    // 1. Create user with Firebase Auth
    // 2. Store additional user data in Firestore

    return newUser;
};

/**
 * Mock logout function
 * @returns {Promise<void>}
 */
export const logout = async () => {
    await delay(500);
    // In real implementation: await signOut(auth);
};

/**
 * Mock password reset function
 * @param {string} email 
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
    await delay(1000);

    // In real implementation: await sendPasswordResetEmail(auth, email);
    console.log(`Password reset email sent to ${email}`);
};

/**
 * Mock function to get current user
 * @returns {Promise<Object|null>}
 */
export const getCurrentUser = async () => {
    await delay(500);

    // In real implementation:
    // 1. Get current user from Firebase Auth
    // 2. Fetch additional user data from Firestore

    return mockCurrentUser;
};

/**
 * Mock function to update user profile
 * @param {string} userId 
 * @param {Object} updates 
 * @returns {Promise<Object>}
 */
export const updateUserProfile = async (userId, updates) => {
    await delay(1000);

    // In real implementation:
    // 1. Update user data in Firestore
    // 2. If updating email/password, use Firebase Auth methods

    return { ...mockCurrentUser, ...updates };
};

// Firebase Auth integration points:
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
//          signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
// const auth = getAuth();
