/**
 * Application Constants
 */

export const USER_ROLES = {
    CLIENT: 'client',
    COUNSELLOR: 'counsellor',
    ADMIN: 'admin',
};

export const SPECIALIZATIONS = [
    'Anxiety',
    'Depression',
    'Stress Management',
    'Relationship Issues',
    'Career Counseling',
    'Trauma & PTSD',
    'Grief & Loss',
    'Self-Esteem',
    'Addiction',
    'Family Therapy',
    'Child Psychology',
    'Couples Therapy',
];

export const LANGUAGES = [
    'English',
    'Spanish',
    'French',
    'German',
    'Hindi',
    'Mandarin',
    'Arabic',
    'Portuguese',
];

export const MOOD_OPTIONS = [
    { value: 1, label: 'Very Bad', emoji: '😢', color: '#EF4444' },
    { value: 2, label: 'Bad', emoji: '😟', color: '#F97316' },
    { value: 3, label: 'Poor', emoji: '😕', color: '#FB923C' },
    { value: 4, label: 'Below Average', emoji: '😐', color: '#FCD34D' },
    { value: 5, label: 'Neutral', emoji: '😶', color: '#FDE047' },
    { value: 6, label: 'Okay', emoji: '🙂', color: '#BEF264' },
    { value: 7, label: 'Good', emoji: '😊', color: '#86EFAC' },
    { value: 8, label: 'Great', emoji: '😄', color: '#6EE7B7' },
    { value: 9, label: 'Excellent', emoji: '😁', color: '#34D399' },
    { value: 10, label: 'Amazing', emoji: '🤩', color: '#10B981' },
];

export const EMOTIONS = [
    'Happy',
    'Sad',
    'Anxious',
    'Angry',
    'Calm',
    'Excited',
    'Frustrated',
    'Grateful',
    'Lonely',
    'Confident',
    'Overwhelmed',
    'Peaceful',
];

export const PRIMARY_GOALS = [
    'Stress Management',
    'Anxiety Relief',
    'Depression Support',
    'Relationship Improvement',
    'Career Guidance',
    'Self-Improvement',
    'Trauma Recovery',
    'Grief Support',
];

export const BOOKING_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};

export const BOOKING_MODE = {
    ONLINE: 'online',
    IN_PERSON: 'in-person',
};

export const RESOURCE_TYPES = {
    ARTICLE: 'article',
    VIDEO: 'video',
    PDF: 'pdf',
    LINK: 'link',
};

export const EXERCISE_CATEGORIES = [
    'Breathing',
    'Grounding',
    'Mindfulness',
    'Journaling',
    'Meditation',
    'Physical Activity',
    'Relaxation',
];

export const RESOURCE_CATEGORIES = [
    'Anxiety',
    'Depression',
    'Stress',
    'Sleep',
    'Relationships',
    'Self-Care',
    'Mindfulness',
    'Nutrition',
    'Exercise',
];

export const COUNSELLOR_STATUS = {
    APPROVED: 'approved',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
};

export const ROUTES = {
    HOME: '/',
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
    COUNSELLORS: '/counsellors',
    COUNSELLOR_PROFILE: '/counsellors/:id',
    BOOKINGS: '/bookings',
    CHAT: '/chat',
    MOOD_TRACKER: '/mood-tracker',
    EXERCISES: '/exercises',
    RESOURCES: '/resources',
    JOURNAL: '/journal',
    PROFILE: '/profile',
    ADMIN: '/admin',
    HELP: '/help',
    PRIVACY: '/legal/privacy',
    TERMS: '/legal/terms',
};
