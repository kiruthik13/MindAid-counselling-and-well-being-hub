/**
 * Mock Data for Development
 * This file contains sample data for all entities in the application
 */

import { SPECIALIZATIONS, LANGUAGES, BOOKING_STATUS, BOOKING_MODE, USER_ROLES } from './constants';

// Mock Users (Clients)
export const mockClients = [
    {
        id: 'client-1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        role: USER_ROLES.CLIENT,
        age: '28',
        gender: 'Male',
        city: 'New York',
        country: 'USA',
        preferredLanguage: 'English',
        timeZone: 'America/New_York',
        primaryGoal: 'Stress Management',
        avatar: 'https://i.pravatar.cc/150?img=12',
        createdAt: new Date('2024-01-15'),
    },
    {
        id: 'client-2',
        email: 'sarah.smith@example.com',
        name: 'Sarah Smith',
        role: USER_ROLES.CLIENT,
        age: '34',
        gender: 'Female',
        city: 'Los Angeles',
        country: 'USA',
        preferredLanguage: 'English',
        timeZone: 'America/Los_Angeles',
        primaryGoal: 'Anxiety Relief',
        avatar: 'https://i.pravatar.cc/150?img=45',
        createdAt: new Date('2024-02-20'),
    },
];

// Mock Counsellors
export const mockCounsellors = [
    {
        id: 'counsellor-1',
        email: 'dr.emily.chen@mindaid.com',
        name: 'Dr. Emily Chen',
        role: USER_ROLES.COUNSELLOR,
        specializations: ['Anxiety', 'Depression', 'Stress Management'],
        yearsOfExperience: 8,
        qualifications: ['Ph.D. in Clinical Psychology', 'Licensed Therapist (LPC)', 'CBT Certified'],
        licenseNumber: 'LPC-12345',
        bio: 'Dr. Emily Chen is a compassionate and experienced clinical psychologist specializing in anxiety, depression, and stress management. With over 8 years of experience, she uses evidence-based approaches including CBT and mindfulness techniques to help clients achieve their mental health goals.',
        languages: ['English', 'Mandarin'],
        consultationFee: 120,
        avatar: 'https://i.pravatar.cc/150?img=47',
        rating: 4.9,
        totalSessions: 450,
        status: 'approved',
        availability: {},
        createdAt: new Date('2023-06-10'),
    },
    {
        id: 'counsellor-2',
        email: 'dr.michael.brown@mindaid.com',
        name: 'Dr. Michael Brown',
        role: USER_ROLES.COUNSELLOR,
        specializations: ['Relationship Issues', 'Couples Therapy', 'Family Therapy'],
        yearsOfExperience: 12,
        qualifications: ['Ph.D. in Marriage and Family Therapy', 'Licensed MFT', 'Gottman Method Certified'],
        licenseNumber: 'MFT-67890',
        bio: 'Dr. Michael Brown is a dedicated marriage and family therapist with 12 years of experience helping couples and families navigate challenges. He specializes in the Gottman Method and creates a safe, non-judgmental space for healing and growth.',
        languages: ['English', 'Spanish'],
        consultationFee: 150,
        avatar: 'https://i.pravatar.cc/150?img=13',
        rating: 4.8,
        totalSessions: 680,
        status: 'approved',
        availability: {},
        createdAt: new Date('2023-03-15'),
    },
    {
        id: 'counsellor-3',
        email: 'dr.sarah.johnson@mindaid.com',
        name: 'Dr. Sarah Johnson',
        role: USER_ROLES.COUNSELLOR,
        specializations: ['Trauma & PTSD', 'Grief & Loss', 'Self-Esteem'],
        yearsOfExperience: 10,
        qualifications: ['Psy.D. in Clinical Psychology', 'EMDR Certified', 'Trauma-Focused CBT'],
        licenseNumber: 'PSY-11223',
        bio: 'Dr. Sarah Johnson specializes in trauma recovery and grief counseling. She uses EMDR and trauma-focused CBT to help clients process difficult experiences and build resilience. Her warm, empathetic approach creates a healing environment.',
        languages: ['English', 'French'],
        consultationFee: 135,
        avatar: 'https://i.pravatar.cc/150?img=48',
        rating: 4.9,
        totalSessions: 520,
        status: 'approved',
        availability: {},
        createdAt: new Date('2023-07-22'),
    },
    {
        id: 'counsellor-4',
        email: 'dr.raj.patel@mindaid.com',
        name: 'Dr. Raj Patel',
        role: USER_ROLES.COUNSELLOR,
        specializations: ['Career Counseling', 'Stress Management', 'Self-Esteem'],
        yearsOfExperience: 6,
        qualifications: ['M.A. in Counseling Psychology', 'Career Development Facilitator', 'Mindfulness-Based Stress Reduction'],
        licenseNumber: 'LPC-44556',
        bio: 'Dr. Raj Patel helps professionals navigate career transitions, workplace stress, and work-life balance. His practical, solution-focused approach combines traditional counseling with mindfulness and positive psychology techniques.',
        languages: ['English', 'Hindi'],
        consultationFee: 100,
        avatar: 'https://i.pravatar.cc/150?img=14',
        rating: 4.7,
        totalSessions: 280,
        status: 'approved',
        availability: {},
        createdAt: new Date('2023-09-05'),
    },
];

// Mock Bookings
export const mockBookings = [
    {
        id: 'booking-1',
        clientId: 'client-1',
        counsellorId: 'counsellor-1',
        dateTime: new Date('2024-12-10T14:00:00'),
        mode: BOOKING_MODE.ONLINE,
        status: BOOKING_STATUS.CONFIRMED,
        notes: 'First session - anxiety management',
        sessionLink: 'https://meet.mindaid.com/session-1',
        createdAt: new Date('2024-12-01'),
    },
    {
        id: 'booking-2',
        clientId: 'client-1',
        counsellorId: 'counsellor-1',
        dateTime: new Date('2024-11-28T14:00:00'),
        mode: BOOKING_MODE.ONLINE,
        status: BOOKING_STATUS.COMPLETED,
        notes: 'Follow-up session',
        createdAt: new Date('2024-11-20'),
    },
    {
        id: 'booking-3',
        clientId: 'client-1',
        counsellorId: 'counsellor-4',
        dateTime: new Date('2024-12-15T10:00:00'),
        mode: BOOKING_MODE.ONLINE,
        status: BOOKING_STATUS.PENDING,
        notes: 'Career guidance session',
        createdAt: new Date('2024-12-03'),
    },
];

// Mock Chat Threads
export const mockChatThreads = [
    {
        id: 'thread-1',
        clientId: 'client-1',
        counsellorId: 'counsellor-1',
        lastMessageAt: new Date('2024-12-05T16:30:00'),
        unreadByClient: false,
        unreadByCounsellor: false,
    },
];

// Mock Messages
export const mockMessages = [
    {
        id: 'msg-1',
        threadId: 'thread-1',
        senderId: 'client-1',
        senderRole: USER_ROLES.CLIENT,
        content: 'Hi Dr. Chen, I wanted to follow up on the breathing exercises we discussed.',
        timestamp: new Date('2024-12-05T15:00:00'),
        read: true,
    },
    {
        id: 'msg-2',
        threadId: 'thread-1',
        senderId: 'counsellor-1',
        senderRole: USER_ROLES.COUNSELLOR,
        content: 'Hello John! I\'m glad you\'re practicing the exercises. How have they been working for you?',
        timestamp: new Date('2024-12-05T15:15:00'),
        read: true,
    },
    {
        id: 'msg-3',
        threadId: 'thread-1',
        senderId: 'client-1',
        senderRole: USER_ROLES.CLIENT,
        content: 'They\'ve been really helpful! I\'ve been doing them every morning and it helps me start the day calmer.',
        timestamp: new Date('2024-12-05T16:30:00'),
        read: true,
    },
];

// Mock Mood Logs
export const mockMoodLogs = [
    {
        id: 'mood-1',
        userId: 'client-1',
        date: new Date('2024-12-06'),
        moodScore: 7,
        emotions: ['Calm', 'Grateful', 'Confident'],
        notes: 'Had a productive day at work. Feeling good about the progress I\'m making.',
    },
    {
        id: 'mood-2',
        userId: 'client-1',
        date: new Date('2024-12-05'),
        moodScore: 6,
        emotions: ['Okay', 'Peaceful'],
        notes: 'Practiced breathing exercises in the morning. Helped with anxiety.',
    },
    {
        id: 'mood-3',
        userId: 'client-1',
        date: new Date('2024-12-04'),
        moodScore: 5,
        emotions: ['Anxious', 'Overwhelmed'],
        notes: 'Stressful day with multiple deadlines.',
    },
    {
        id: 'mood-4',
        userId: 'client-1',
        date: new Date('2024-12-03'),
        moodScore: 8,
        emotions: ['Happy', 'Excited', 'Grateful'],
        notes: 'Great therapy session today. Feeling hopeful.',
    },
    {
        id: 'mood-5',
        userId: 'client-1',
        date: new Date('2024-12-02'),
        moodScore: 6,
        emotions: ['Calm', 'Content'],
        notes: 'Quiet weekend. Spent time reading and relaxing.',
    },
];

// Mock Journal Entries
export const mockJournalEntries = [
    {
        id: 'journal-1',
        userId: 'client-1',
        title: 'Reflections on My Progress',
        content: 'I\'ve been in therapy for three months now, and I can see real changes. The anxiety that used to paralyze me in the mornings has lessened significantly. I\'m learning to recognize my thought patterns and challenge them. Dr. Chen\'s guidance has been invaluable.',
        tags: ['progress', 'anxiety', 'gratitude'],
        createdAt: new Date('2024-12-05'),
        updatedAt: new Date('2024-12-05'),
    },
    {
        id: 'journal-2',
        userId: 'client-1',
        title: 'Difficult Day at Work',
        content: 'Today was challenging. Multiple deadlines and a difficult conversation with my manager. I noticed myself falling into old patterns of catastrophic thinking. But I caught myself and used the grounding technique Dr. Chen taught me. It helped.',
        tags: ['work', 'stress', 'coping'],
        createdAt: new Date('2024-12-04'),
        updatedAt: new Date('2024-12-04'),
    },
];

// Mock Exercises
export const mockExercises = [
    {
        id: 'exercise-1',
        title: '4-7-8 Breathing Technique',
        category: 'Breathing',
        description: 'A simple breathing exercise to reduce anxiety and promote relaxation.',
        steps: [
            'Sit comfortably with your back straight',
            'Place the tip of your tongue against the ridge behind your upper front teeth',
            'Exhale completely through your mouth, making a whoosh sound',
            'Close your mouth and inhale quietly through your nose for 4 counts',
            'Hold your breath for 7 counts',
            'Exhale completely through your mouth for 8 counts',
            'Repeat the cycle 3-4 times',
        ],
        estimatedMinutes: 5,
    },
    {
        id: 'exercise-2',
        title: '5-4-3-2-1 Grounding Technique',
        category: 'Grounding',
        description: 'A sensory awareness exercise to help you stay present and calm anxiety.',
        steps: [
            'Acknowledge 5 things you can see around you',
            'Acknowledge 4 things you can touch',
            'Acknowledge 3 things you can hear',
            'Acknowledge 2 things you can smell',
            'Acknowledge 1 thing you can taste',
        ],
        estimatedMinutes: 3,
    },
    {
        id: 'exercise-3',
        title: 'Body Scan Meditation',
        category: 'Mindfulness',
        description: 'A mindfulness practice to increase body awareness and release tension.',
        steps: [
            'Lie down or sit comfortably',
            'Close your eyes and take a few deep breaths',
            'Start at your toes and notice any sensations',
            'Slowly move your attention up through your feet, legs, torso, arms, and head',
            'Notice any areas of tension without judgment',
            'Breathe into areas of tension and imagine them releasing',
            'Complete the scan by taking a few deep breaths',
        ],
        estimatedMinutes: 15,
    },
    {
        id: 'exercise-4',
        title: 'Gratitude Journaling',
        category: 'Journaling',
        description: 'A daily practice to cultivate positivity and appreciation.',
        steps: [
            'Find a quiet moment in your day',
            'Write down 3 things you\'re grateful for today',
            'Be specific about why you\'re grateful for each thing',
            'Notice how you feel as you write',
            'Reflect on the positive aspects of your life',
        ],
        estimatedMinutes: 10,
    },
];

// Mock Resources
export const mockResources = [
    {
        id: 'resource-1',
        title: 'Understanding Anxiety: A Comprehensive Guide',
        type: 'article',
        category: 'Anxiety',
        description: 'Learn about the different types of anxiety, their symptoms, and evidence-based treatment approaches.',
        url: '#',
        publishedAt: new Date('2024-11-15'),
    },
    {
        id: 'resource-2',
        title: 'Mindfulness for Beginners',
        type: 'video',
        category: 'Mindfulness',
        description: 'A 10-minute introduction to mindfulness meditation and its benefits for mental health.',
        url: '#',
        publishedAt: new Date('2024-11-20'),
    },
    {
        id: 'resource-3',
        title: 'Sleep Hygiene: Tips for Better Rest',
        type: 'article',
        category: 'Sleep',
        description: 'Practical strategies to improve your sleep quality and establish healthy sleep habits.',
        url: '#',
        publishedAt: new Date('2024-11-25'),
    },
    {
        id: 'resource-4',
        title: 'Managing Stress in the Workplace',
        type: 'pdf',
        category: 'Stress',
        description: 'A downloadable guide with techniques for handling work-related stress and preventing burnout.',
        url: '#',
        publishedAt: new Date('2024-11-28'),
    },
    {
        id: 'resource-5',
        title: 'Building Healthy Relationships',
        type: 'article',
        category: 'Relationships',
        description: 'Explore the foundations of healthy relationships and communication skills.',
        url: '#',
        publishedAt: new Date('2024-12-01'),
    },
];

// Default mock user for authentication
export const mockCurrentUser = mockClients[0];

// Admin user
export const mockAdmin = {
    id: 'admin-1',
    email: 'admin@mindaid.com',
    name: 'Admin User',
    role: USER_ROLES.ADMIN,
    avatar: 'https://i.pravatar.cc/150?img=60',
    createdAt: new Date('2023-01-01'),
};
