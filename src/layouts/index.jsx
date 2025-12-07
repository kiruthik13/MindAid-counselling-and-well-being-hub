/**
 * Premium Layout Components with Framer Motion
 * Enhanced layouts with animated backgrounds and glassmorphism
 */

import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

// Floating background circles for premium effect
const FloatingCircles = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
            animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"
        />
        <motion.div
            animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"
        />
        <motion.div
            animate={{
                x: [0, -50, 0],
                y: [0, -50, 0],
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl"
        />
    </div>
);

// Main Layout - for public pages with animated background
export const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative">
            <FloatingCircles />
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 pt-16 relative z-10"
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
};

// Auth Layout - for authentication pages with centered card
export const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 relative overflow-hidden">
            <FloatingCircles />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

// Dashboard Layout - for authenticated user dashboards
export const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/20 relative">
            <FloatingCircles />
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 pt-16 relative z-10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
            </motion.main>
        </div>
    );
};
