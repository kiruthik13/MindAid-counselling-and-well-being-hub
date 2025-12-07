/**
 * Premium Landing Page with Framer Motion
 * Modern hero section with floating cards and staggered animations
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart,
    Shield,
    Clock,
    Users,
    Star,
    ArrowRight,
    CheckCircle,
    Calendar,
    MessageCircle,
    Activity,
    Sparkles,
} from 'lucide-react';
import { MainLayout } from '../layouts';
import { mockCounsellors } from '../utils/mockData';

export const Landing = () => {
    const featuredCounsellors = mockCounsellors.slice(0, 3);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const floatVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="space-y-6"
                        >
                            <motion.div variants={itemVariants}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-medium">
                                    <Sparkles className="w-4 h-4" />
                                    MindAid · Counselling & Wellbeing Hub
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl md:text-6xl font-bold leading-tight"
                            >
                                Your Space for{' '}
                                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                                    Mental Wellness
                                </span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-gray-600 leading-relaxed">
                                Connect with licensed counsellors, track your mood, and access resources for your
                                mental health journey—all in one safe, confidential platform.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                                <Link to="/auth">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold shadow-lg flex items-center gap-2"
                                    >
                                        Get Started <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                                <Link to="/counsellors">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 rounded-full border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
                                    >
                                        Find a Counsellor
                                    </motion.button>
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-8 pt-4 flex-wrap"
                            >
                                <div>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                        500+
                                    </p>
                                    <p className="text-sm text-gray-600">Licensed Counsellors</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                        10k+
                                    </p>
                                    <p className="text-sm text-gray-600">Happy Clients</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                        4.9★
                                    </p>
                                    <p className="text-sm text-gray-600">Average Rating</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right - Floating Cards */}
                        <div className="relative h-[500px] hidden md:block">
                            {/* Upcoming Session Card */}
                            <motion.div
                                variants={floatVariants}
                                animate="animate"
                                className="absolute top-0 right-0 w-72 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200/50"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500" />
                                    <div>
                                        <p className="font-semibold">Dr. Emily Chen</p>
                                        <p className="text-sm text-gray-600">Upcoming Session</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Tomorrow, 2:00 PM</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full py-2 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-medium"
                                >
                                    Join Session
                                </motion.button>
                            </motion.div>

                            {/* Mood Chart Card */}
                            <motion.div
                                variants={floatVariants}
                                animate="animate"
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-20 left-0 w-64 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200/50"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <p className="font-semibold">Mood This Week</p>
                                    <Activity className="w-5 h-5 text-primary-600" />
                                </div>
                                <div className="flex items-end gap-2 h-24">
                                    {[6, 7, 5, 8, 7, 9, 8].map((height, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-gradient-to-t from-primary-600 to-secondary-600 rounded-t"
                                            style={{ height: `${height * 10}%` }}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Trending up! 📈</p>
                            </motion.div>

                            {/* Chat Bubble Card */}
                            <motion.div
                                variants={floatVariants}
                                animate="animate"
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-0 right-20 w-56 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-4 border border-gray-200/50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageCircle className="w-4 h-4 text-primary-600" />
                                    <p className="text-sm font-semibold">New Message</p>
                                </div>
                                <p className="text-sm text-gray-600">
                                    "Great progress this week! Keep practicing those breathing exercises."
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
                            How MindAid Works
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-600">
                            Getting started is easy
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid md:grid-cols-4 gap-8"
                    >
                        {[
                            { num: '1', title: 'Tell us about you', desc: 'Share your goals and preferences' },
                            { num: '2', title: 'Match with counsellors', desc: 'Find the perfect fit for you' },
                            { num: '3', title: 'Book secure sessions', desc: 'Schedule at your convenience' },
                            { num: '4', title: 'Track your wellbeing', desc: 'Monitor your progress' },
                        ].map((step) => (
                            <motion.div
                                key={step.num}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
                            Why Choose MindAid?
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-600">
                            Professional mental health support, on your terms
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            { icon: Shield, title: 'Safe & Confidential', desc: 'Your privacy is our priority' },
                            { icon: Clock, title: 'Flexible Scheduling', desc: 'Book sessions anytime' },
                            { icon: Users, title: 'Expert Counsellors', desc: 'Licensed professionals' },
                            { icon: Heart, title: 'Personalized Care', desc: 'Tailored to your needs' },
                        ].map((benefit) => (
                            <motion.div
                                key={benefit.title}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Counsellors */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
                            Meet Our Counsellors
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-600">
                            Experienced professionals ready to support you
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {featuredCounsellors.map((counsellor) => (
                            <motion.div
                                key={counsellor.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50"
                            >
                                <div className="text-center">
                                    <img
                                        src={counsellor.avatar}
                                        alt={counsellor.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-primary-100"
                                    />
                                    <h3 className="text-xl font-semibold mb-1">{counsellor.name}</h3>
                                    <p className="text-gray-600 mb-3">{counsellor.specializations.join(', ')}</p>
                                    <div className="flex items-center justify-center gap-1 mb-3">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold">{counsellor.rating}</span>
                                    </div>
                                    <Link to={`/counsellors/${counsellor.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full py-2 rounded-full border-2 border-primary-600 text-primary-600 font-medium hover:bg-primary-50 transition-colors"
                                        >
                                            View Profile
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link to="/counsellors">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold shadow-lg flex items-center gap-2 mx-auto"
                            >
                                View All Counsellors <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-12 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of people taking control of their mental health
                        </p>
                        <Link to="/auth">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(255, 255, 255, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-white text-primary-600 font-semibold shadow-lg inline-flex items-center gap-2"
                            >
                                Get Started Today <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
};
