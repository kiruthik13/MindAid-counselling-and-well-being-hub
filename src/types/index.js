/**
 * Type Definitions for MindAid Platform
 * These types define the data models used throughout the application
 */

/**
 * @typedef {'client' | 'counsellor' | 'admin'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {UserRole} role
 * @property {string} [age]
 * @property {string} [gender]
 * @property {string} [city]
 * @property {string} [country]
 * @property {string} [preferredLanguage]
 * @property {string} [timeZone]
 * @property {string} [primaryGoal]
 * @property {string} [phone]
 * @property {string} [avatar]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Counsellor
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string[]} specializations
 * @property {number} yearsOfExperience
 * @property {string[]} qualifications
 * @property {string} licenseNumber
 * @property {string} bio
 * @property {string[]} languages
 * @property {number} consultationFee
 * @property {string} avatar
 * @property {number} rating
 * @property {number} totalSessions
 * @property {string} status - 'approved' | 'pending' | 'suspended'
 * @property {Object} availability
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} clientId
 * @property {string} counsellorId
 * @property {Date} dateTime
 * @property {string} mode - 'online' | 'in-person'
 * @property {string} status - 'confirmed' | 'pending' | 'completed' | 'cancelled'
 * @property {string} [notes]
 * @property {string} [sessionLink]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} ChatThread
 * @property {string} id
 * @property {string} clientId
 * @property {string} counsellorId
 * @property {Date} lastMessageAt
 * @property {boolean} unreadByClient
 * @property {boolean} unreadByCounsellor
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} threadId
 * @property {string} senderId
 * @property {string} senderRole
 * @property {string} content
 * @property {Date} timestamp
 * @property {boolean} read
 */

/**
 * @typedef {Object} MoodLog
 * @property {string} id
 * @property {string} userId
 * @property {Date} date
 * @property {number} moodScore - 1-10
 * @property {string[]} emotions
 * @property {string} [notes]
 */

/**
 * @typedef {Object} JournalEntry
 * @property {string} id
 * @property {string} userId
 * @property {string} title
 * @property {string} content
 * @property {string[]} [tags]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {string[]} steps
 * @property {number} estimatedMinutes
 * @property {string} [imageUrl]
 */

/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} title
 * @property {string} type - 'article' | 'video' | 'pdf' | 'link'
 * @property {string} category
 * @property {string} description
 * @property {string} url
 * @property {string} [thumbnailUrl]
 * @property {Date} publishedAt
 */

export { };
