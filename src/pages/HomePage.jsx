import { motion } from "framer-motion";
import { ChevronRight, Star, Check, TrendingUp, MessageSquare, Lock } from "lucide-react";
import { MainLayout } from '../layouts';

const stats = [
    { label: "Licensed Counsellors", value: "500+", icon: "👨‍⚕️" },
    { label: "Happy Clients", value: "10k+", icon: "😊" },
    { label: "Success Rate", value: "98%", icon: "✓" },
];

const steps = [
    {
        title: "Comprehensive Assessment",
        body: "Share your challenges, therapy goals, and preferences in our confidential intake process. We learn what matters most to you.",
        icon: "📋",
    },
    {
        title: "Expert Matching",
        body: "Our AI-powered algorithm connects you with specialized counsellors matching your needs, availability, and therapeutic approach.",
        icon: "🔗",
    },
    {
        title: "Secure Sessions",
        body: "HIPAA-compliant video, phone, or chat sessions. End-to-end encrypted, 100% confidential, available 24/7.",
        icon: "🔐",
    },
    {
        title: "Progress Tracking",
        body: "Real-time mood analytics, journal insights, and progress reports. Monitor your emotional wellbeing journey.",
        icon: "📊",
    },
];

const counsellors = [
    {
        name: "Dr. Ananya Rao",
        credential: "MD, Clinical Psychology",
        tag: "Anxiety • OCD • Depression",
        rating: "4.9",
        sessions: "2400+",
        verified: true,
    },
    {
        name: "Rahul Mehta",
        credential: "MA, Licensed Counsellor",
        tag: "Work Stress • Burnout • Leadership",
        rating: "4.8",
        sessions: "1850+",
        verified: true,
    },
    {
        name: "Dr. Leena Iyer",
        credential: "PhD, Relationship Therapy",
        tag: "Relationships • Family • Life Transitions",
        rating: "5.0",
        sessions: "3100+",
        verified: true,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const HomePage = () => {
    return (
        <MainLayout>
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Subtle gradient overlays */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="pointer-events-none absolute -left-48 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-200/20 blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="pointer-events-none absolute -bottom-32 -right-40 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-200/30 to-pink-200/20 blur-3xl"
            />

            <div className="relative mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 md:px-6 lg:px-8 md:py-20 lg:py-24">
                {/* ============ HERO SECTION ============ */}
                <section className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="space-y-8 lg:space-y-10"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm shadow-indigo-200/50"
                        >
                            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
                            Welcome to MindAid
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
                        >
                            Your Journey to
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                            >
                                Mental Wellness
                            </motion.span>
                        </motion.h1>

                        {/* Supporting Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="max-w-xl text-lg md:text-xl leading-relaxed text-gray-600"
                        >
                            Connect with licensed counsellors, track your emotional wellbeing, and access personalized resources in one calm, confidential space. Your mental health deserves care.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 pt-2"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/60 transition-shadow duration-200"
                            >
                                Get Started Today
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="inline-flex items-center justify-center rounded-full border-2 border-indigo-200 bg-white px-8 py-4 text-base font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 shadow-sm shadow-indigo-100/50"
                            >
                                Find a Counsellor
                            </motion.button>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-8 pt-8 border-t border-indigo-100"
                        >
                            {stats.map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                                    className="flex flex-col"
                                >
                                    <span className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {item.value}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium mt-1">
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: App Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400/20 via-blue-400/20 to-purple-400/20 blur-2xl" />

                            {/* Card stack */}
                            <div className="relative w-full max-w-sm space-y-4">
                                {/* Session Card */}
                                <motion.div
                                    whileHover={{ y: -8, rotate: -2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="rounded-2xl border-2 border-white bg-white/90 backdrop-blur-md p-5 shadow-xl shadow-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Upcoming Session</p>
                                            <p className="text-lg font-bold text-gray-900 mt-1">Today · 2:30 PM</p>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                            Confirmed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Dr. Ananya Rao</p>
                                            <p className="text-xs text-gray-500">Clinical Psychologist</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Mood Tracker Card */}
                                <motion.div
                                    whileHover={{ y: -8, rotate: 1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="rounded-2xl border-2 border-white bg-white/90 backdrop-blur-md p-5 shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300"
                                >
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Mood This Week</p>
                                    <p className="text-sm font-semibold text-gray-900 mb-4">Gently Improving</p>
                                    <div className="flex items-end justify-between gap-1.5 h-16">
                                        {[4, 7, 10, 8, 11, 9, 12].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: h * 4 }}
                                                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                                                className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-300 to-indigo-400 shadow-sm"
                                            />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Chat Preview Card */}
                                <motion.div
                                    whileHover={{ y: -8, rotate: -1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="rounded-2xl border-2 border-white bg-white/90 backdrop-blur-md p-5 shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:shadow-purple-300/50 transition-all duration-300"
                                >
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Supportive Chat</p>
                                    <div className="space-y-3">
                                        <div className="flex justify-start">
                                            <div className="max-w-xs rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2.5 text-sm text-gray-700">
                                                How are you feeling today?
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="max-w-xs rounded-2xl rounded-tr-none bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2.5 text-sm text-white">
                                                Much better, thank you 💙
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ============ HOW IT WORKS ============ */}
                <section className="space-y-12 md:space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            How MindAid Works
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600">
                            A simple, four-step journey to better mental health, guided by professionals who care.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                variants={itemVariants}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group relative rounded-2xl border-2 border-indigo-100 bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-indigo-100/50 hover:shadow-xl hover:shadow-indigo-200/60 hover:border-indigo-300 transition-all duration-300"
                            >
                                {/* Step Number Circle */}
                                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-indigo-300/50 group-hover:scale-110 transition-transform duration-300">
                                    {index + 1}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">
                                    {step.title}
                                </h3>
                                <p className="text-base leading-relaxed text-gray-600">
                                    {step.body}
                                </p>

                                {/* Decorative line for all except last */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute -right-8 top-1/2 w-16 h-0.5 bg-gradient-to-r from-indigo-300 to-transparent -translate-y-1/2 group-hover:from-indigo-500 transition-colors duration-300" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ============ FEATURED COUNSELLORS ============ */}
                <section className="space-y-12 md:space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Meet Our Counsellors
                        </h2>
                        <p className="max-w-2xl text-lg text-gray-600">
                            Handpicked licensed professionals ready to support your journey with expertise and compassion.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                    >
                        {counsellors.map((counsellor) => (
                            <motion.div
                                key={counsellor.name}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group rounded-2xl border-2 border-indigo-100 bg-white/90 backdrop-blur-sm p-8 shadow-lg shadow-indigo-100/50 hover:shadow-xl hover:shadow-indigo-200/60 hover:border-indigo-300 transition-all duration-300"
                            >
                                {/* Avatar & Info */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex-shrink-0 shadow-lg">
                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center">
                                            <span className="text-xs text-white">✓</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 truncate">
                                            {counsellor.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {counsellor.tag}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-indigo-100">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-lg ${i < Math.floor(parseFloat(counsellor.rating)) ? 'text-yellow-400' : i - 0.5 === Math.floor(parseFloat(counsellor.rating)) ? 'text-yellow-400' : 'text-gray-200'}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">{counsellor.rating}</span>
                                    <span className="text-xs text-gray-500 ml-auto">50+ sessions</span>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/50 hover:shadow-lg hover:shadow-indigo-300/60 transition-all duration-200"
                                >
                                    View Profile
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ============ FINAL CTA ============ */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8 }}
                    className="relative mt-8"
                >
                    <div className="relative overflow-hidden rounded-3xl border-2 border-gradient-to-r from-indigo-200 via-blue-200 to-purple-200 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 p-8 md:p-12 shadow-2xl shadow-indigo-300/50">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Ready to Prioritize Your Mental Health?
                                </h3>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Join thousands of people already transforming their lives with personalized counselling, mood tracking, and a community that cares. Your first step starts here.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-600 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-200 order-first md:order-none"
                                >
                                    Create Free Account
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="rounded-full border-2 border-white bg-white/10 backdrop-blur-md px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-all duration-200"
                                >
                                    Browse Counsellors
                                </motion.button>
                            </div>
                        </div>

                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 h-32 w-32 bg-white/10 rounded-full blur-2xl -ml-16 -mb-16" />
                    </div>
                </motion.section>
            </div>
        </div>
        </MainLayout>
    );
};
